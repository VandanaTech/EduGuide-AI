import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, ChevronDown, Check, Sparkles, X } from 'lucide-react';

export interface DropdownGroup {
  category: string;
  items: string[];
}

export interface SearchableDropdownProps {
  label?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  options: (string | DropdownGroup)[] | readonly string[];
  placeholder?: string;
  badge?: string;
  className?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  icon,
  value,
  onChange,
  options,
  placeholder = 'Search or select option...',
  badge,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [coords, setCoords] = useState<{ top: number; left: number; width: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    width: 0,
    placeAbove: false,
  });

  const updateCoords = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < 300 && rect.top > 280;

    setCoords({
      top: placeAbove ? rect.top : rect.bottom,
      left: rect.left,
      width: Math.max(rect.width, 240),
      placeAbove,
    });
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);
    }
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [isOpen]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Check if click was inside popover
        const popoverEl = document.getElementById('searchable-dropdown-popover');
        if (popoverEl && popoverEl.contains(event.target as Node)) {
          return;
        }
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isGrouped = (opts?: readonly any[]): opts is DropdownGroup[] => {
    return Boolean(
      opts &&
        opts.length > 0 &&
        typeof opts[0] === 'object' &&
        opts[0] !== null &&
        'category' in opts[0]
    );
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery('');
  };

  const renderGroupedOptions = (groups: DropdownGroup[]) => {
    const filtered = (groups || [])
      .map((g) => ({
        ...g,
        items: (g?.items || []).filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((g) => g.items && g.items.length > 0);

    if (filtered.length === 0) {
      return (
        <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
          No matching options found for "{searchQuery}"
        </div>
      );
    }

    return filtered.map((group, idx) => (
      <div key={idx} className="p-1">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900/30 mb-1">
          {group.category}
        </div>
        <div className="space-y-0.5">
          {(group.items || []).map((item) => {
            const isSelected = item === value;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-purple-100 dark:bg-purple-600/30 text-purple-900 dark:text-white font-bold border border-purple-300 dark:border-purple-500/40 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <span>{item}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    ));
  };

  const renderSimpleOptions = (items: readonly string[]) => {
    const filtered = (items || []).filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      return (
        <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
          No matching options found for "{searchQuery}"
        </div>
      );
    }

    return (
      <div className="p-1 space-y-0.5">
        {filtered.map((item) => {
          const isSelected = item === value;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                isSelected
                  ? 'bg-purple-100 dark:bg-purple-600/30 text-purple-900 dark:text-white font-bold border border-purple-300 dark:border-purple-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <span>{item}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300 shrink-0" />}
            </button>
          );
        })}
      </div>
    );
  };

  const popoverMenu = isOpen ? (
    <div
      id="searchable-dropdown-popover"
      style={{
        position: 'fixed',
        left: `${coords.left}px`,
        width: `${coords.width}px`,
        zIndex: 999999,
        ...(coords.placeAbove
          ? { bottom: `${window.innerHeight - coords.top + 6}px` }
          : { top: `${coords.top + 6}px` }),
      }}
      className="bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-purple-500/40 rounded-2xl shadow-2xl shadow-slate-300/60 dark:shadow-purple-950/90 backdrop-blur-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200"
    >
      {/* Search Input Bar */}
      <div className="p-2.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/90 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400 shrink-0 ml-1" />
        <input
          type="text"
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search options..."
          className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none py-1 font-medium"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Options List Box (Scrolls if > 8 items) */}
      <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
        {isGrouped(options)
          ? renderGroupedOptions(options)
          : renderSimpleOptions(options as readonly string[])}
      </div>
    </div>
  ) : null;

  return (
    <div className={`relative space-y-1 ${className}`} ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            {icon}
            <span>{label}</span>
          </label>
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 font-semibold">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Control Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!isOpen) updateCoords();
          setIsOpen(!isOpen);
        }}
        className="w-full text-left glass-input px-3.5 py-2.5 rounded-2xl text-xs font-medium flex items-center justify-between gap-2 border border-slate-300 dark:border-slate-700/80 hover:border-purple-500/50 transition-all bg-white dark:bg-[#0f1524]/90 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      >
        <span className="truncate text-slate-900 dark:text-white font-semibold">
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-purple-500 dark:text-purple-400' : ''
          }`}
        />
      </button>

      {/* Render popover into document body */}
      {typeof document !== 'undefined' && popoverMenu && ReactDOM.createPortal(popoverMenu, document.body)}
    </div>
  );
};

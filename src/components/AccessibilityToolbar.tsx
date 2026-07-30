import React, { useState } from 'react';
import { AccessibilitySettings } from '../types';
import { Type, Eye, Keyboard, Volume2, ShieldCheck, Check } from 'lucide-react';

interface AccessibilityToolbarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);

  const fontScaleLabels: Record<AccessibilitySettings['fontSizeScale'], string> = {
    sm: 'Small (90%)',
    normal: 'Normal (100%)',
    lg: 'Large (110%)',
    xl: 'Extra Large (125%)',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {/* Expanded Accessibility Menu */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="Accessibility Settings Panel"
          className="p-4 rounded-2xl glass-card border-slate-200 dark:border-purple-500/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl space-y-4 w-72 text-xs text-slate-800 dark:text-slate-200 border animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
              <Eye className="w-4 h-4 text-purple-600 dark:text-cyan-400" /> Accessibility Options
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility options"
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Font Size Scaling */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Font Size Scale
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['sm', 'normal', 'lg', 'xl'] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => onUpdateSettings({ fontSizeScale: scale })}
                  aria-pressed={settings.fontSizeScale === scale}
                  className={`px-2.5 py-1.5 rounded-xl border font-bold text-[11px] transition-all flex items-center justify-between ${
                    settings.fontSizeScale === scale
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{scale.toUpperCase()}</span>
                  {settings.fontSizeScale === scale && <Check className="w-3 h-3 text-cyan-300" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Current: {fontScaleLabels[settings.fontSizeScale]}</p>
          </div>

          {/* High Contrast Mode */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-900 dark:text-white block">High Contrast Mode</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Maximum visibility borders & text</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              aria-pressed={settings.highContrast}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                settings.highContrast ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Keyboard Navigation Shortcuts Toggle */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
            >
              <Keyboard className="w-3.5 h-3.5" /> Keyboard Navigation Shortcuts
            </button>
          </div>

          {showKeyboardGuide && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
              <p><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-purple-700 dark:text-cyan-300 font-mono">Tab</kbd>: Move focus forward</p>
              <p><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-purple-700 dark:text-cyan-300 font-mono">Shift + Tab</kbd>: Move focus backward</p>
              <p><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-purple-700 dark:text-cyan-300 font-mono">Enter / Space</kbd>: Activate control</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Accessibility Toolbar"
        title="Accessibility Settings (Font Size, Contrast, Keyboard Navigation)"
        className={`p-3 rounded-2xl shadow-xl flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? 'bg-purple-600 dark:bg-cyan-500 text-white dark:text-slate-950 border-purple-400 dark:border-cyan-300 scale-105'
            : 'bg-white dark:bg-slate-900/90 text-purple-700 dark:text-purple-300 border-slate-200 dark:border-purple-500/40 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:text-purple-900 dark:hover:text-white hover:scale-105'
        }`}
      >
        <Eye className="w-5 h-5" />
      </button>
    </div>
  );
};

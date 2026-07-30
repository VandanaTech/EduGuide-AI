import React, { useState } from 'react';
import { PageTab, UserProfile } from '../types';
import {
  GraduationCap,
  LayoutDashboard,
  Bot,
  FileQuestion,
  Compass,
  CalendarCheck,
  BookOpen,
  Home,
  Info,
  Menu,
  X,
  Sparkles,
  Award,
  Sun,
  Moon,
  User,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'tutor', label: 'AI Tutor', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'AI Quiz', icon: <FileQuestion className="w-3.5 h-3.5" /> },
    { id: 'roadmap', label: 'Career Roadmap', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'planner', label: 'Study Planner', icon: <CalendarCheck className="w-3.5 h-3.5" /> },
    { id: 'resources', label: 'Learning Resources', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  const handleSelect = (tab: PageTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#090d16]/95 border-b border-slate-200 dark:border-purple-900/30 transition-all duration-300 shadow-md shadow-slate-200/50 dark:shadow-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Compact Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() => handleSelect('home')}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
              <Sparkles className="w-2.5 h-2.5 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  EduGuide <span className="gradient-text font-black">AI</span>
                </span>
                <span className="hidden xl:inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Award className="w-2.5 h-2.5" /> SDG 4
                </span>
              </div>
            </div>
          </div>

          {/* Centered Desktop Navigation Bar */}
          <nav className="hidden xl:flex items-center justify-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-purple-500/20 shadow-inner">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleSelect(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-300' : 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Compact Nav for Large Screens (Tablet/Laptop view before XL) */}
          <nav className="hidden lg:flex xl:hidden items-center justify-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200 dark:border-purple-500/20">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  title={item.label}
                  className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right-Aligned Action Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-500/40 transition-all shadow-sm"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>

            {/* Auth Profile / Sign In Trigger */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-purple-500/30 hover:border-purple-400/60 transition-all text-xs text-slate-800 dark:text-white shadow-sm"
            >
              {currentUser ? (
                <>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-purple-500 dark:border-cyan-400"
                  />
                  <div className="text-left hidden md:block">
                    <p className="font-bold text-slate-900 dark:text-white leading-none text-[11px]">{currentUser.name}</p>
                  </div>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-xs">Sign In</span>
                </>
              )}
            </button>

            {/* Ask AI CTA */}
            <button
              id="header-start-learning-btn"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  if (window.botpress && typeof window.botpress.open === 'function') {
                    window.botpress.open();
                  } else if (window.botpress && typeof window.botpress.toggle === 'function') {
                    window.botpress.toggle();
                  } else if (window.botpressWebChat) {
                    window.botpressWebChat.sendEvent({ type: 'show' });
                  }
                }
                handleSelect('tutor');
              }}
              className="gradient-button text-xs font-bold text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4" /> Ask AI
            </button>

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0d1322] border-b border-slate-200 dark:border-purple-900/40 px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/40 text-xs font-semibold text-purple-900 dark:text-white"
            >
              <UserCheck className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
              <span>{currentUser ? currentUser.name : 'Sign In / Account'}</span>
            </button>

            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              UN SDG 4 Aligned
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-purple-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-300' : 'text-purple-600 dark:text-purple-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              id="mobile-ask-ai-cta"
              onClick={() => handleSelect('tutor')}
              className="w-full gradient-button text-xs font-semibold text-white py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" /> Start AI Learning Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


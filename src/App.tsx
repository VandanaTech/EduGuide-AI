import React, { useState, useEffect } from 'react';
import { PageTab, UserProfile, AccessibilitySettings } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AiTutorPage } from './components/pages/AiTutorPage';
import { AiQuizPage } from './components/pages/AiQuizPage';
import { CareerRoadmapPage } from './components/pages/CareerRoadmapPage';
import { StudyPlannerPage } from './components/pages/StudyPlannerPage';
import { LearningResourcesPage } from './components/pages/LearningResourcesPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { AboutPage } from './components/pages/AboutPage';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('eduai_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    return true; // Default to dark theme
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('eduai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('eduai_theme', 'light');
    }
  }, [isDarkMode]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Global Accessibility Settings
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSizeScale: 'normal',
    highContrast: false,
    screenReaderMode: false,
    keyboardFocusVisible: true,
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Computer Science Scholar',
    isGuest: false,
    institution: 'MIT / Stanford Computer Science',
    currentYear: '3rd Year (Junior)',
    branch: 'Computer Science & Engineering',
    careerGoal: 'Full-Stack Software Engineer & AI Architect',
  });

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleUpdateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...newSettings }));
  };

  // Font size scale class mapper
  const fontSizeClass = {
    sm: 'text-[90%]',
    normal: 'text-[100%]',
    lg: 'text-[110%]',
    xl: 'text-[125%]',
  }[accessibility.fontSizeScale];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${fontSizeClass} ${
      accessibility.highContrast
        ? 'bg-black text-white contrast-200 border-2 border-white'
        : isDarkMode
        ? 'bg-[#09090F] text-slate-100 selection:bg-purple-600 selection:text-white'
        : 'bg-slate-50 text-slate-900 selection:bg-purple-500 selection:text-white'
    }`}>
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Area */}
      <main className="flex-1 pt-6 sm:pt-8">
        {currentTab === 'home' && <HomePage onNavigate={handleTabChange} />}
        {currentTab === 'tutor' && <AiTutorPage />}
        {currentTab === 'quiz' && <AiQuizPage />}
        {currentTab === 'roadmap' && <CareerRoadmapPage />}
        {currentTab === 'planner' && <StudyPlannerPage />}
        {currentTab === 'resources' && <LearningResourcesPage />}
        {currentTab === 'dashboard' && (
          <DashboardPage onNavigate={handleTabChange} currentUser={currentUser} />
        )}
        {currentTab === 'about' && (
          <AboutPage onNavigate={handleTabChange} onOpenContact={() => setIsContactModalOpen(true)} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Floating Accessibility Toolbar */}
      <AccessibilityToolbar
        settings={accessibility}
        onUpdateSettings={handleUpdateAccessibility}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        currentUser={currentUser}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

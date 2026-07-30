import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  X,
  User,
  Mail,
  Lock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  KeyRound,
  UserCheck,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentUser: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'guest'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('MIT / Stanford University');
  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  if (!isOpen) return null;

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'guest') {
      onLoginSuccess({
        name: 'Guest Scholar',
        email: 'guest@eduguide.ai',
        avatar: selectedAvatar,
        role: 'Guest Student',
        isGuest: true,
        institution: 'Open Global Learner',
      });
    } else {
      onLoginSuccess({
        name: name.trim() || (activeTab === 'login' ? 'Alex Chen' : 'New Scholar'),
        email: email.trim() || 'alex.chen@university.edu',
        avatar: selectedAvatar,
        role: 'Computer Science Scholar',
        isGuest: false,
        institution: institution.trim() || 'University Computer Science Dept.',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl border-slate-200 dark:border-purple-500/30 shadow-2xl bg-white/95 dark:bg-[#0d121f]/95 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {activeTab === 'login' && 'Welcome Back to EduGuide'}
            {activeTab === 'signup' && 'Create Your Student Account'}
            {activeTab === 'guest' && 'Continue as Guest Learner'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Empowering UN SDG Goal 4: Quality Education for Everyone
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-purple-600 text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-purple-600 text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab('guest')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'guest'
                ? 'bg-purple-600 text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Guest Mode
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab !== 'guest' && (
            <>
              {activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> University Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@university.edu"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
                />
              </div>
            </>
          )}

          {activeTab === 'guest' && (
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Open Guest Access Mode
              </div>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                You can explore all AI Tutor features, adaptive quizzes, career roadmaps, and study schedules instantly without registering.
              </p>
            </div>
          )}

          {/* Avatar Selector */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">Choose Student Avatar</span>
            <div className="flex items-center gap-3">
              {avatars.map((avatarUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(avatarUrl)}
                  className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    selectedAvatar === avatarUrl
                      ? 'border-purple-600 dark:border-cyan-400 ring-2 ring-purple-500/40 dark:ring-cyan-500/40 scale-110'
                      : 'border-slate-300 dark:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={avatarUrl} alt="Avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full gradient-button py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all"
          >
            <span>
              {activeTab === 'login' && 'Sign In to Dashboard'}
              {activeTab === 'signup' && 'Create Account & Start Learning'}
              {activeTab === 'guest' && 'Enter Workspace as Guest'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
          UI preview mode. No sensitive credentials are sent or stored remotely.
        </p>

      </div>
    </div>
  );
};

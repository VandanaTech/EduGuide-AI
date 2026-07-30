import React from 'react';
import { PageTab } from '../types';
import { GraduationCap, Heart, Globe, Sparkles, BookOpenCheck, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="bg-slate-100 dark:bg-[#060911] border-t border-slate-200 dark:border-purple-900/30 text-slate-600 dark:text-slate-400 py-12 mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & SDG 4 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                EduGuide <span className="gradient-text font-black">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Democratizing personalized education globally in support of United Nations Sustainable Development Goal 4 (SDG 4: Quality Education). Providing adaptive AI tutoring, career roadmap planning, interactive quizzes, and structured study management.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                <Globe className="w-3.5 h-3.5" /> UN SDG Goal 4: Quality Education
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> AI Mentorship
              </span>
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Key Features
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('tutor')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Personalized AI Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Adaptive AI Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Semester Career Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Automated Study Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Curated Resource Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Dashboard & Info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Student Hub & Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left"
                >
                  Learning Progress Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-left text-cyan-700 dark:text-cyan-400 font-medium flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact SDG 4 Support Team
                </button>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
                    title="LinkedIn Community"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} EduGuide AI. Empowering Quality Education for Everyone.</p>
          <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for UN SDG Goal 4
          </p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Bot,
  Compass,
  CalendarCheck,
  Languages,
  Layers,
  Target,
  Users,
  CheckCircle2,
  ExternalLink,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { PageTab } from '../../types';

interface AboutPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in-50 duration-300">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 border border-slate-200 dark:border-purple-500/30 bg-gradient-to-br from-purple-100 via-white to-indigo-100 dark:from-[#12182b] dark:via-[#0e1324] dark:to-[#15102a] shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> UN SDG 4: Quality Education Initiative
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Empowering Engineering Students with <span className="gradient-text">Personalized AI Mentorship</span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            EduGuide AI is an intelligent SaaS learning platform tailored specifically for Computer Science and Engineering scholars across 40+ subjects, 14 Indian languages, and personalized learning paths.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('tutor')}
              className="gradient-button px-6 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <Bot className="w-4 h-4" /> Start AI Session
            </button>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Core Platform Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why EduGuide AI?</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered to bridge educational inequality by making world-class AI tutoring, subject quizzes, and placement roadmaps accessible to every student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-purple-500/20 space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Multilingual AI Tutor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Explains complex algorithms, math, and concepts in 14 Indian regional languages (Hindi, Tamil, Marathi, Telugu, etc.) tailored to your background and career goals.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-purple-500/20 space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Adaptive Subject Quizzes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Dynamically evaluates understanding across Easy, Medium, and Hard interview-grade question banks tailored to your exact branch and core subject.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-purple-500/20 space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Semester Roadmaps</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Milestone-driven career roadmaps for Software Engineering, AI & Machine Learning, Cyber Security, DevOps, Full Stack Development, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Supported Engineering Branches & Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Branches */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Supported Engineering Branches
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Computer Science Engineering
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Information Technology
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> AI & Machine Learning
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Electronics & Communication
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Electrical Engineering
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Mechanical Engineering
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Civil & Chemical
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Biotechnology
            </li>
          </ul>
        </div>

        {/* Languages */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Multilingual AI Support
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Break language barriers in technical education. EduGuide AI tutor speaks:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {[
              'English',
              'Hindi (हिन्दी)',
              'Marathi (मराठी)',
              'Gujarati (ગુજરાતી)',
              'Punjabi (ਪੰਜਾਬੀ)',
              'Bengali (বাংলা)',
              'Tamil (தமிழ்)',
              'Telugu (తెలుగు)',
              'Kannada (ಕನ್ನಡ)',
              'Malayalam (മലയാളം)',
              'Odia (ଓଡ଼ିଆ)',
              'Assamese (অসমীয়া)',
              'Urdu (اردو)',
              'Sanskrit (संस्कृत)',
            ].map((lang) => (
              <span
                key={lang}
                className="px-2.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-200"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-100 via-white to-indigo-100 dark:from-purple-950/60 dark:via-slate-900 dark:to-indigo-950/60 border border-slate-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" /> Built for Students, Driven by Impact
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            EduGuide AI is committed to free, equitable, and high-impact STEM education.
          </p>
        </div>
        <button
          onClick={() => onNavigate('tutor')}
          className="gradient-button px-5 py-2.5 rounded-xl text-xs font-bold text-white whitespace-nowrap"
        >
          Explore AI Features
        </button>
      </div>

    </div>
  );
};

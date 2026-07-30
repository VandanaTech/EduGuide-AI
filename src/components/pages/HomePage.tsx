import React from 'react';
import { PageTab } from '../../types';
import {
  Sparkles,
  Bot,
  FileQuestion,
  Compass,
  CalendarCheck,
  BookOpen,
  LayoutDashboard,
  Award,
  ArrowRight,
  Globe,
  BookOpenCheck,
  Users,
  Target,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      tab: 'tutor' as PageTab,
      title: 'Personalized AI Tutor',
      description: 'Adapt explanations to your learning level, style (visual, code-first, ELI5), language, and background knowledge.',
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      badge: 'Interactive',
    },
    {
      tab: 'quiz' as PageTab,
      title: 'Adaptive AI Quiz Generator',
      description: 'Generate instant multiple-choice practice tests tailored by subject, difficulty, and question count with instant rationale.',
      icon: <FileQuestion className="w-6 h-6 text-blue-400" />,
      badge: 'Assessment',
    },
    {
      tab: 'roadmap' as PageTab,
      title: 'Semester Career Roadmap',
      description: 'Get a clear, semester-by-semester skill blueprint, key objectives, recommended projects, and status tracking.',
      icon: <Compass className="w-6 h-6 text-indigo-400" />,
      badge: 'Career Growth',
    },
    {
      tab: 'planner' as PageTab,
      title: 'Smart Study Planner',
      description: 'Input exam dates and available study hours to generate day-wise schedules with priority subject time-blocks.',
      icon: <CalendarCheck className="w-6 h-6 text-cyan-400" />,
      badge: 'Time Mgmt',
    },
    {
      tab: 'resources' as PageTab,
      title: 'Curated Resource Hub',
      description: 'Access top free courses, documentation, YouTube channels, and practice platforms categorized by topic and level.',
      icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
      badge: 'Free Access',
    },
    {
      tab: 'dashboard' as PageTab,
      title: 'Progress & Streak Analytics',
      description: 'Monitor learning progress, average quiz performance, study streak heatmaps, and daily motivational quotes.',
      icon: <LayoutDashboard className="w-6 h-6 text-pink-400" />,
      badge: 'Analytics',
    },
  ];

  const sdgTargets = [
    {
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      title: 'Universal Access to Quality Education',
      text: 'Ensuring all learners have equal access to world-class structured mentorship and personalized academic guidance regardless of geography or background.',
    },
    {
      icon: <Target className="w-5 h-5 text-purple-400" />,
      title: 'Relevant Skills for Employability',
      text: 'Bridging the gap between university curriculum and industry standards through real-world semester roadmaps and hands-on skill development.',
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      title: 'Inclusive & Equitable Learning',
      text: 'Tailoring teaching modalities (visual, practical, simplified) to fit individual cognitive styles and language preferences.',
    },
  ];

  return (
    <div className="space-y-20 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10 space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs sm:text-sm font-medium shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>UN SDG 4 Aligned: Quality Education For All</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Master Any Subject with Your <br className="hidden sm:inline" />
            <span className="gradient-text">Personalized AI Mentor</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            EduGuide AI empowers students with tailored AI tutoring, automated study scheduling, career roadmaps, and adaptive practice quizzes—making quality education accessible, engaging, and personalized.
          </p>

          {/* Action Call to Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-start-learning-btn"
              onClick={() => onNavigate('tutor')}
              className="gradient-button w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all group"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-explore-roadmap-btn"
              onClick={() => onNavigate('roadmap')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/30 hover:border-purple-500/60 text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800/80 shadow-sm"
            >
              <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Explore Career Roadmaps</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="glass-card p-4 rounded-2xl text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Free Access</p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">5+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Learning Styles</p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">SDG 4</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Quality Education</p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">24/7</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">AI Mentorship</p>
            </div>
          </div>

        </div>
      </section>

      {/* SDG 4 Quality Education Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-emerald-500/20">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <Award className="w-4 h-4" /> United Nations Goal 4
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Empowering Sustainable Development Goal 4: Quality Education
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                UN SDG 4 aims to <span className="text-emerald-700 dark:text-emerald-300 font-semibold">"ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."</span> EduGuide AI solves educational disparities by giving every student a customized, intelligent tutor that adapts to their pace, language, and career goals.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                >
                  <BookOpenCheck className="w-4 h-4" /> Track your educational impact on Dashboard &rarr;
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sdgTargets.map((target, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 hover:border-emerald-500/30 transition-all shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    {target.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{target.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{target.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to <span className="gradient-text">Excel & Grow</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Choose a learning module to start mastering concepts, testing your understanding, or mapping out your career trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.tab}
              id={`feature-card-${feat.tab}`}
              onClick={() => onNavigate(feat.tab)}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                <span>Launch Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motivational / CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-blue-900/60 p-8 sm:p-12 border border-purple-500/30 text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Accelerate Your Learning Journey?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Customize your learning preferences and let EduGuide AI generate personalized explanations, quizzes, and schedules for you.
            </p>
          </div>
          <div className="pt-2 relative z-10">
            <button
              onClick={() => onNavigate('tutor')}
              className="gradient-button px-8 py-3.5 rounded-xl text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 text-yellow-300" /> Start AI Tutor Session
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

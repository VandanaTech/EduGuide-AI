import React, { useState, useEffect } from 'react';
import { PageTab, UserProfile, QuizHistoryItem } from '../../types';
import {
  initialDashboardStats,
  sampleRecentActivities,
  motivationalQuotes,
  sampleBadges,
  sampleQuizHistory,
  sampleSmartRecommendations,
} from '../../data/mockData';
import {
  LayoutDashboard,
  Flame,
  Trophy,
  Target,
  BookOpenCheck,
  Clock,
  Sparkles,
  Bot,
  FileQuestion,
  Compass,
  CalendarCheck,
  RefreshCw,
  Quote,
  TrendingUp,
  Award,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Star,
  ChevronRight,
  UserCheck,
  Brain,
  Lightbulb,
  Check,
  ArrowUpRight,
  Code2,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  Zap,
  AlertTriangle,
  Layers,
  History,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (tab: PageTab) => void;
  currentUser: UserProfile | null;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, currentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'analytics' | 'recommendations'>('overview');
  const [stats] = useState(initialDashboardStats);
  const [activities] = useState(sampleRecentActivities);
  const [badges] = useState(sampleBadges);
  
  // Local state array tracking the last 5 completed quizzes
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('eduai_quiz_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.slice(0, 5);
          }
        }
      } catch (e) {
        console.warn('Error reading quiz history from localStorage:', e);
      }
    }
    return sampleQuizHistory.slice(0, 5);
  });

  useEffect(() => {
    const syncQuizHistory = () => {
      try {
        const saved = localStorage.getItem('eduai_quiz_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQuizHistory(parsed.slice(0, 5));
            return;
          }
        }
      } catch (e) {
        console.warn('Error syncing quiz history:', e);
      }
      setQuizHistory(sampleQuizHistory.slice(0, 5));
    };

    syncQuizHistory();
    window.addEventListener('storage', syncQuizHistory);
    return () => window.removeEventListener('storage', syncQuizHistory);
  }, []);

  const handleClearHistory = () => {
    setQuizHistory([]);
    try {
      localStorage.removeItem('eduai_quiz_history');
    } catch (e) {
      console.warn('Error clearing history:', e);
    }
  };

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Profile data
  const studentName = currentUser?.name || 'Alex Chen';
  const studentYear = currentUser?.currentYear || '3rd Year (Junior)';
  const studentBranch = currentUser?.branch || 'Computer Science & Engineering';
  const studentGoal = currentUser?.careerGoal || 'Full-Stack Software Engineer & AI Architect';
  const avatarUrl = currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // Smart Recommendations filter category
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const currentQuote = motivationalQuotes[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const chartData = [
    { day: 'Mon', hours: 3.5, quizScore: 85 },
    { day: 'Tue', hours: 4.2, quizScore: 90 },
    { day: 'Wed', hours: 2.8, quizScore: 78 },
    { day: 'Thu', hours: 5.0, quizScore: 92 },
    { day: 'Fri', hours: 3.8, quizScore: 88 },
    { day: 'Sat', hours: 6.1, quizScore: 95 },
    { day: 'Sun', hours: 4.0, quizScore: 90 },
  ];

  // Subject Performance Data
  const subjectAnalytics = [
    { subject: 'Data Structures & Algo', score: 95, status: 'Strong', color: '#10b981' },
    { subject: 'Database Systems (SQL)', score: 92, status: 'Strong', color: '#10b981' },
    { subject: 'Object Oriented Design', score: 88, status: 'Strong', color: '#10b981' },
    { subject: 'System Architecture', score: 78, status: 'Moderate', color: '#06b6d4' },
    { subject: 'Operating Systems (Threads)', score: 62, status: 'Weak', color: '#f59e0b' },
    { subject: 'Networks (TCP/IP IPsec)', score: 58, status: 'Weak', color: '#ef4444' },
  ];

  // Weak Topics requiring revision
  const weakRevisionTopics = [
    { id: 'w1', subject: 'Operating Systems', topic: 'Thread Synchronization & Deadlock Prevention Protocols', accuracy: '62%' },
    { id: 'w2', subject: 'Computer Networks', topic: 'TCP Sliding Window & BGP Routing Mechanics', accuracy: '58%' },
    { id: 'w3', subject: 'System Design', topic: 'Consistent Hashing & Distributed Cache Eviction', accuracy: '71%' },
  ];

  const streakDays = Array.from({ length: 14 }).map((_, i) => ({
    dayNum: i + 1,
    active: true,
  }));

  const recommendationCategories = [
    'All',
    'Skills',
    'Projects',
    'Courses',
    'Certifications',
    'Internships',
    'Hackathons',
    'Books',
    'Research Papers',
  ];

  const filteredRecommendations = sampleSmartRecommendations.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Student Profile Header Banner */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-purple-100 via-white to-indigo-100 dark:from-purple-950/70 dark:via-slate-900 dark:to-indigo-950/70 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={studentName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500 dark:border-cyan-400 shadow-xl shadow-purple-500/30"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-[#090d16] flex items-center justify-center text-xs text-white font-bold">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
              <UserCheck className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300" /> Active Scholar • UN SDG 4 Track
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {studentName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-purple-800 dark:text-purple-300">{studentYear}</span> • 
              <span>{studentBranch}</span> • 
              <span className="text-purple-900 dark:text-cyan-300 font-semibold">Goal: {studentGoal}</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('tutor')}
            className="gradient-button px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md hover:scale-105 transition-all"
          >
            <Bot className="w-4 h-4" /> AI Voice Tutor
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all shadow-sm"
          >
            <FileQuestion className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Practice Adaptive Quiz
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'overview'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
              : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-purple-500 dark:text-cyan-300" /> 1. Personal Dashboard
        </button>

        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
              : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-500 dark:text-purple-300" /> 2. AI Learning Analytics
        </button>

        <button
          onClick={() => setActiveSubTab('recommendations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'recommendations'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
              : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" /> 3. Smart Recommendations
        </button>
      </div>

      {/* TAB 1: PERSONALIZED DASHBOARD */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Metrics Cards (11 Key Indicators) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Daily Learning Goal & Today's Study Time */}
            <div className="glass-card p-5 rounded-3xl space-y-3 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Daily Learning Goal</span>
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">1h 45m / 2.5h</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">70% Daily Target Achieved</p>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400" style={{ width: '70%' }} />
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="glass-card p-5 rounded-3xl space-y-3 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Weekly Syllabus Progress</span>
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-700 dark:text-blue-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">84%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">+12% vs Last Week</p>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '84%' }} />
              </div>
            </div>

            {/* Quiz Accuracy & Learning Streak */}
            <div className="glass-card p-5 rounded-3xl space-y-3 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quiz Accuracy</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">92% Avg</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" /> 14-Day Active Streak 🔥
                </p>
              </div>
              <div className="flex items-center gap-1">
                {streakDays.slice(0, 7).map((d) => (
                  <span
                    key={d.dayNum}
                    className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"
                  />
                ))}
              </div>
            </div>

            {/* Subjects Completed & Recommended Topic */}
            <div className="glass-card p-5 rounded-3xl space-y-3 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Subjects</span>
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
                  <BookOpenCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4 Core Modules</p>
                <p className="text-[10px] text-purple-700 dark:text-cyan-300 font-medium truncate" title="Next: Dynamic Programming & Graph Algorithms">
                  Next: Dynamic Programming & Graph Algorithms
                </p>
              </div>
              <button
                onClick={() => onNavigate('tutor')}
                className="w-full py-1.5 px-2 rounded-xl bg-purple-100 dark:bg-purple-950/80 hover:bg-purple-200 dark:hover:bg-purple-900 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                Launch Topic in Tutor <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Inspirational Quote Banner */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border-slate-200 dark:border-purple-500/30 relative overflow-hidden bg-slate-50 dark:bg-slate-900/90 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-purple-600 dark:text-cyan-300" /> SDG 4 Daily Academic Inspiration
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white italic leading-relaxed">
                  "{currentQuote.quote}"
                </p>
                <p className="text-xs text-purple-800 dark:text-purple-300 font-semibold">— {currentQuote.author}</p>
              </div>

              <button
                onClick={handleNextQuote}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all shrink-0 shadow-sm"
                title="Next Quote"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activity & Performance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart Column (7 cols) */}
            <div className="lg:col-span-7 glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
                  <span>Weekly Study Hours & Quiz Scores</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Past 7 Days</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorScores" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                    <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--tooltip-bg, #0f172a)', color: '#f8fafc', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="hours" name="Hours Studied" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorHours)" />
                    <Area type="monotone" dataKey="quizScore" name="Quiz Score %" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScores)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Achievement Badges & Recent Scores (5 cols) */}
            <div className="lg:col-span-5 glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                  <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  <span>Achievements & Badges</span>
                </div>
                <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">4 Unlocked</span>
              </div>

              <div className="space-y-3">
                {badges.slice(0, 3).map((badge) => (
                  <div
                    key={badge.id}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 flex items-center justify-center text-lg shrink-0">
                      {badge.icon || '🏆'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{badge.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recent Quiz History Section */}
          <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200 dark:border-purple-500/20 bg-white/80 dark:bg-slate-900/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-cyan-300">
                    <History className="w-4 h-4 text-purple-600 dark:text-cyan-300" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Recent Quiz History
                  </h2>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                    Last 5 Completed
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track your completed quiz attempts, scores, difficulty ratings, and completion timestamps.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate('quiz')}
                  className="py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <FileQuestion className="w-3.5 h-3.5" />
                  <span>Take New Quiz</span>
                </button>
                {quizHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-600 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                    title="Clear history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quiz Items List or Empty State */}
            {quizHistory.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-cyan-300 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">No Recent Quizzes Found</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Take an AI assessment to test your engineering concepts and track your score history here.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Launch AI Practice Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {quizHistory.slice(0, 5).map((item, idx) => {
                  const pct = typeof item.percentage === 'number' ? item.percentage : parseInt(String(item.percentage)) || 0;

                  let scoreBadgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/40';
                  if (pct < 50) {
                    scoreBadgeStyle = 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-500/40';
                  } else if (pct < 80) {
                    scoreBadgeStyle = 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/40';
                  }

                  let diffStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                  if (item.difficulty?.toLowerCase().includes('hard') || item.difficulty?.toLowerCase().includes('advanced')) {
                    diffStyle = 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';
                  }

                  return (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all shadow-sm"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-cyan-300 font-bold text-xs shrink-0">
                          #{idx + 1}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {item.subject}
                            </h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${diffStyle}`}>
                              {item.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        <div className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${scoreBadgeStyle}`}>
                          <Trophy className="w-3.5 h-3.5" />
                          <span>Score: {item.score} ({pct}%)</span>
                        </div>

                        <button
                          onClick={() => onNavigate('quiz')}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-cyan-300 transition-all text-xs font-semibold flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                          title="Retake quiz in quiz module"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline-block">Retake</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: AI LEARNING ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 w-fit">
              <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300" /> Algorithmic Performance Diagnostics
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Quiz & Topic Skill Analytics
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              AI-driven insights isolating your strongest concepts and pin-pointing weak topics for targeted revision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Strong vs Weak Subjects Chart (Col 7) */}
            <div className="lg:col-span-7 glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Subject Mastery & Accuracy Breakdown</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Overall: 88% Accuracy</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectAnalytics} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                    <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="subject" type="category" width={140} stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#f8fafc', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                    <Bar dataKey="score" name="Accuracy %" radius={[0, 8, 8, 0]}>
                      {subjectAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Strong Subjects</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">DSA, SQL, OOD</span>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Moderate Subjects</span>
                  <span className="font-bold text-amber-800 dark:text-amber-300">System Architecture</span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Weak Subjects</span>
                  <span className="font-bold text-rose-800 dark:text-rose-300">OS Threads, Networks</span>
                </div>
              </div>
            </div>

            {/* Recommended Revision Topics (Col 5) */}
            <div className="lg:col-span-5 glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Recommended Revision
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-mono font-bold">Priority High</span>
              </div>

              <div className="space-y-3">
                {weakRevisionTopics.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 font-bold">
                        {item.subject} • {item.accuracy} Accuracy
                      </span>
                    </div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{item.topic}</p>
                    <button
                      onClick={() => onNavigate('tutor')}
                      className="w-full py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-900/60 dark:hover:bg-purple-800 text-xs font-bold text-white border border-purple-500/30 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Bot className="w-3.5 h-3.5 text-cyan-200 dark:text-cyan-300" /> Revise in AI Tutor
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI Learning Suggestions Card */}
          <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/30 space-y-4 bg-gradient-to-r from-purple-50 via-white to-indigo-50 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
              <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-300" />
              <span>Personalized AI Learning Suggestions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="font-bold text-cyan-800 dark:text-cyan-300 block">1. Active Recall Scheduling</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Spend 20 minutes daily practicing Operating Systems Deadlocks in the AI Tutor using the "Practical" learning style.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="font-bold text-purple-800 dark:text-purple-300 block">2. High-Yield Practice Quizzes</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Take a 5-question Hard level quiz on Computer Networks TCP/IP to boost quiz confidence above 85%.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">3. System Design Capstone</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your 3rd Year goal is Full-Stack Software Engineer — start building a distributed Redis clone project to showcase on GitHub.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: SMART RECOMMENDATIONS */}
      {activeSubTab === 'recommendations' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-cyan-300" /> Career Trajectory Matcher
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Smart Recommendations for {studentYear} ({studentGoal})
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Curated skills, projects, courses, certifications, internships, hackathons, books, and research papers matched to your profile.
            </p>

            {/* Filter Category Pills */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
              {recommendationCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecommendations.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-3xl border-slate-200 dark:border-purple-500/20 flex flex-col justify-between gap-4 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">{item.difficulty}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold">{item.subtitle}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {item.actionUrl ? (
                    <a
                      href={item.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-bold text-purple-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      Explore Resource <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate('tutor')}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-bold text-purple-800 dark:text-purple-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Bot className="w-3.5 h-3.5" /> Ask AI Tutor About This
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

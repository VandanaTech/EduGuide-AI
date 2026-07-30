import React, { useState } from 'react';
import { sampleLearningResources } from '../../data/mockData';
import { LearningResource } from '../../types';
import {
  BookOpen,
  Sparkles,
  Search,
  ExternalLink,
  Star,
  Globe,
  Youtube,
  Code2,
  GraduationCap,
  Tag,
  Filter,
  FolderGit2,
  Book,
} from 'lucide-react';

export const LearningResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resourcesList, setResourcesList] = useState<LearningResource[]>(sampleLearningResources);
  const [isSearchingAI, setIsSearchingAI] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    'All',
    'Documentation',
    'YouTube',
    'Practice Websites',
    'GitHub Repositories',
    'Free Courses',
    'Reference Books',
  ];

  const handleFetchAiResources = async () => {
    if (!searchQuery.trim()) return;

    setIsSearchingAI(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          category: selectedCategory,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to fetch AI recommendations.');
      }

      const data = await res.json();
      if (Array.isArray(data.resources) && data.resources.length > 0) {
        setResourcesList(data.resources);
      } else {
        throw new Error('No resources returned from AI.');
      }
    } catch (err: any) {
      console.error('AI Resources Error:', err);
      setErrorMsg(err.message || 'Error searching AI resources.');
    } finally {
      setIsSearchingAI(false);
    }
  };

  const filteredResources = resourcesList.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentation':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-rose-400" />;
      case 'Practice Websites':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'GitHub Repositories':
        return <FolderGit2 className="w-4 h-4 text-amber-400" />;
      case 'Free Courses':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'Reference Books':
        return <Book className="w-4 h-4 text-indigo-400" />;
      default:
        return <Globe className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-300" /> High Quality Free Learning Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Learning Resources <span className="gradient-text">– Free Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explore official documentation, YouTube channels, practice platforms, GitHub repos, free courses, and reference books.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{filteredResources.length} Verified Resources</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, tags or author... (e.g. 'System Design', 'Free Code Camp', 'Donne Martin')"
              className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm border-slate-300 dark:border-purple-500/30 text-slate-900 dark:text-white bg-white dark:bg-transparent placeholder-slate-400 dark:placeholder-slate-400"
            />
          </div>

          <button
            onClick={handleFetchAiResources}
            disabled={isSearchingAI || !searchQuery.trim()}
            className={`py-3 px-6 rounded-2xl gradient-button text-xs font-bold text-white flex items-center gap-2 shadow-lg shrink-0 ${
              isSearchingAI || !searchQuery.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {isSearchingAI ? 'Finding...' : 'AI Search'}
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-600 dark:text-rose-400 font-bold hover:text-slate-900 dark:hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-purple-800 dark:text-purple-300 border border-slate-200 dark:border-purple-500/20">
                  {getCategoryIcon(res.category)}
                  <span>{res.category}</span>
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
                  <span>{res.rating}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                  {res.title}
                </h3>
                <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
                  Provider: {res.authorOrProvider} • Level: {res.level}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {res.description}
              </p>

            </div>

            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {res.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-purple-50 dark:bg-slate-800 dark:hover:bg-purple-900/60 text-xs font-bold text-purple-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/40 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Access Free Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

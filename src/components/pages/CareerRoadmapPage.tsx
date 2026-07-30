import React, { useState } from 'react';
import { RoadmapSemester } from '../../types';
import {
  sampleRoadmaps,
  CURRENT_YEARS,
  ENGINEERING_BRANCHES,
  CAREER_GOALS,
} from '../../data/mockData';
import { SearchableDropdown } from '../SearchableDropdown';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Clock,
  Briefcase,
  Code2,
  FolderGit2,
  BookOpen,
  Milestone,
  RefreshCw,
  Award,
  Layers,
  CheckSquare,
  Square,
  Globe,
  GitBranch,
  ShieldCheck,
} from 'lucide-react';

export const CareerRoadmapPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<string>('3rd Year');
  const [branch, setBranch] = useState<string>('Computer Science');
  const [careerGoal, setCareerGoal] = useState<string>('Full-Stack Software Engineer');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [activeRoadmap, setActiveRoadmap] = useState<RoadmapSemester[]>(
    sampleRoadmaps['Full-Stack Software Engineer']
  );

  // Completed Objectives Checklist State
  const [checkedObjectives, setCheckedObjectives] = useState<Record<string, boolean>>({});

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleCheck = (idKey: string) => {
    setCheckedObjectives((prev) => ({
      ...prev,
      [idKey]: !prev[idKey],
    }));
  };

  const handleGenerateRoadmap = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentYear,
          branch,
          careerGoal,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate career roadmap.');
      }

      const data = await res.json();
      if (Array.isArray(data.roadmap) && data.roadmap.length > 0) {
        setActiveRoadmap(data.roadmap);
      } else {
        throw new Error('Received invalid roadmap format from AI.');
      }
    } catch (err: any) {
      console.error('Career Roadmap Error:', err);
      setErrorMsg(err.message || 'Failed to generate AI roadmap. Using sample template.');
      const match = sampleRoadmaps[careerGoal] || sampleRoadmaps['Full-Stack Software Engineer'];
      setActiveRoadmap(match);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-300" /> Career Trajectory Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Career Roadmap <span className="gradient-text">– Semester Blueprint</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Semester-wise timelines covering skills, capstone projects, certifications, internships, open source, and interactive checklists.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
          <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Goal: {careerGoal}</span>
        </div>
      </div>

      {/* Input Controls Form */}
      <div className="glass-card p-6 rounded-3xl border-slate-200 dark:border-purple-500/20 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <SearchableDropdown
          label="Current Academic Year"
          options={CURRENT_YEARS}
          value={currentYear}
          onChange={(val) => setCurrentYear(val)}
        />

        <SearchableDropdown
          label="Engineering Branch"
          options={ENGINEERING_BRANCHES}
          value={branch}
          onChange={(val) => setBranch(val)}
        />

        <SearchableDropdown
          label="Target Career Role"
          options={CAREER_GOALS}
          value={careerGoal}
          onChange={(val) => setCareerGoal(val)}
        />

        <button
          onClick={handleGenerateRoadmap}
          disabled={isGenerating}
          className={`gradient-button py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg ${
            isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Roadmap...
            </>
          ) : (
            <>
              <Compass className="w-4 h-4" /> Synthesize AI Roadmap
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/40 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-amber-600 dark:text-amber-400 font-bold hover:text-slate-900 dark:hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Timeline Display Section */}
      <div className="space-y-8 relative">
        <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500/20" />

        {(activeRoadmap || []).map((sem, semIdx) => (
          <div key={semIdx} className="relative pl-0 lg:pl-20 space-y-4">
            
            <div className="hidden lg:flex absolute left-4 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-500 dark:border-purple-400 items-center justify-center text-purple-700 dark:text-purple-300 text-xs font-black shadow-md">
              {semIdx + 1}
            </div>

            {/* Semester Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-purple-500/30 shadow-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-xs border border-purple-200 dark:border-purple-500/30">
                    {sem.semester}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Focus: {sem.focusArea}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {sem.phaseTitle}
                </h3>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
                <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400" />
                <span>{(sem?.milestones || []).length} Strategic Milestones</span>
              </div>
            </div>

            {/* Milestones Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(sem?.milestones || []).map((ms, msIdx) => (
                <div
                  key={msIdx}
                  className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all"
                >
                  {/* Milestone Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Milestone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {ms.title}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        ms.status === 'Completed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                          : ms.status === 'In Progress'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {ms.status}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Estimated Duration: <strong className="text-slate-800 dark:text-slate-200">{ms.duration}</strong></span>
                  </div>

                  {/* Skills Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400" /> Core Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(ms?.skills || []).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-purple-800 dark:text-purple-200 font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Projects */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Portfolio Project
                    </span>
                    <ul className="space-y-1">
                      {(ms?.recommendedProjects || []).map((proj, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications & Internships & Open Source Tags */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-purple-800 dark:text-purple-300 space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                        <ShieldCheck className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Certifications / Internships
                      </span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">AWS / GCP / Tier-1 Internships</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-purple-800 dark:text-cyan-300 space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                        <GitBranch className="w-3 h-3 text-purple-600 dark:text-cyan-400" /> Open Source & Hackathons
                      </span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">GitHub PRs & SDG 4 Hackathons</p>
                    </div>
                  </div>

                  {/* Interactive Objectives Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" /> Interactive Milestone Checklist
                    </span>
                    <div className="space-y-1.5">
                      {(ms?.keyObjectives || []).map((obj, oIdx) => {
                        const checkKey = `${semIdx}-${msIdx}-${oIdx}`;
                        const isDone = !!checkedObjectives[checkKey];

                        return (
                          <div
                            key={oIdx}
                            onClick={() => toggleCheck(checkKey)}
                            className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-purple-400 dark:hover:border-purple-500/30 cursor-pointer transition-all"
                          >
                            <button className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-400">
                              {isDone ? <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Square className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
                            </button>
                            <span className={`text-xs ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                              {obj}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

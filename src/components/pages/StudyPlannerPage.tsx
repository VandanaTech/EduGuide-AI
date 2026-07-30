import React, { useState } from 'react';
import { DayStudySchedule } from '../../types';
import { sampleStudySchedules, ENGINEERING_SUBJECT_GROUPS } from '../../data/mockData';
import { SearchableDropdown } from '../SearchableDropdown';
import {
  CalendarCheck,
  Sparkles,
  Clock,
  BookOpen,
  CheckSquare,
  Square,
  RefreshCw,
  Plus,
  X,
  Zap,
  CheckCircle2,
  Calendar,
  Coffee,
  Brain,
  Timer,
  Award,
} from 'lucide-react';

export const StudyPlannerPage: React.FC = () => {
  const [examDate, setExamDate] = useState<string>('2026-08-15');
  const [subjects, setSubjects] = useState<string[]>([
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Operating Systems',
    'System Design',
  ]);
  const [newSubjectInput, setNewSubjectInput] = useState<string>('');
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [schedule, setSchedule] = useState<DayStudySchedule[]>(sampleStudySchedules);

  const handleAddSubject = () => {
    if (newSubjectInput.trim() && !subjects.includes(newSubjectInput.trim())) {
      setSubjects([...subjects, newSubjectInput.trim()]);
      setNewSubjectInput('');
    }
  };

  const handleRemoveSubject = (subj: string) => {
    setSubjects(subjects.filter((s) => s !== subj));
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerateStudyPlan = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examDate,
          subjects,
          dailyHours,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate study plan.');
      }

      const data = await res.json();
      if (Array.isArray(data.schedule) && data.schedule.length > 0) {
        const formatted: DayStudySchedule[] = data.schedule.map((day: any) => ({
          ...day,
          tasks: (day.tasks || []).map((t: any) => ({
            ...t,
            completed: false,
          })),
        }));
        setSchedule(formatted);
      } else {
        throw new Error('Received empty schedule from AI.');
      }
    } catch (err: any) {
      console.error('Study Planner Error:', err);
      setErrorMsg(err.message || 'Failed to generate study plan. Using sample schedule.');
      const newDays: DayStudySchedule[] = [1, 2, 3].map((dayNum) => {
        const subjA = subjects[0] || 'Data Structures';
        const subjB = subjects[1] || 'Database Systems';

        return {
          dayNumber: dayNum,
          dateStr: `Day ${dayNum} - Intensive Revision & Mock Test (${dailyHours} Hours/Day)`,
          focusTitle: `Priority Focus: ${subjA} & ${subjB}`,
          tasks: [
            {
              timeSlot: '08:00 AM - 10:00 AM',
              subject: subjA,
              topic: 'Core Theory & Active Recall',
              activityType: 'Concept Reading',
              estimatedMinutes: 120,
              completed: false,
            },
            {
              timeSlot: '10:00 AM - 10:20 AM',
              subject: 'Break',
              topic: 'Pomodoro Rest & hydration break (20 mins)',
              activityType: 'Break',
              estimatedMinutes: 20,
              completed: false,
            },
            {
              timeSlot: '10:20 AM - 12:30 PM',
              subject: subjB,
              topic: 'Full-Length Practice Mock Test',
              activityType: 'Mock Test',
              estimatedMinutes: 130,
              completed: false,
            },
          ],
        };
      });
      setSchedule(newDays);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskCompletion = (dayIdx: number, taskIdx: number) => {
    setSchedule((prev) =>
      prev.map((d, dI) => {
        if (dI !== dayIdx) return d;
        return {
          ...d,
          tasks: d.tasks.map((t, tI) => {
            if (tI !== taskIdx) return t;
            return { ...t, completed: !t.completed };
          }),
        };
      })
    );
  };

  const totalTasks = schedule.reduce((acc, day) => acc + (day?.tasks || []).length, 0);
  const completedTasks = schedule.reduce(
    (acc, day) => acc + (day?.tasks || []).filter((t) => t.completed).length,
    0
  );
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" /> Pomodoro & Revision Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Smart Study Planner <span className="gradient-text">– Schedule Synthesis</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Generate custom daily, weekly, and monthly revision schedules with integrated Pomodoro breaks and mock tests.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
          <Calendar className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
          <span>Target Exam: {examDate}</span>
        </div>
      </div>

      {/* Control Form */}
      <div className="glass-card p-6 rounded-3xl space-y-5 border-slate-200 dark:border-purple-500/20">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">Target Exam / Goal Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full glass-input p-3 rounded-xl border-slate-300 dark:border-purple-500/30 text-slate-900 dark:text-white bg-white dark:bg-transparent font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">Daily Study Allocation (Hours)</label>
            <div className="flex items-center gap-2">
              {[2, 4, 6, 8].map((hrs) => (
                <button
                  key={hrs}
                  onClick={() => setDailyHours(hrs)}
                  className={`flex-1 py-2.5 rounded-xl font-bold border transition-all ${
                    dailyHours === hrs
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {hrs} hrs
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateStudyPlan}
              disabled={isGenerating}
              className={`w-full gradient-button py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Plan...
                </>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" /> Synthesize Study Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Subjects Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Subjects Included in Schedule:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {subjects.map((subj, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 font-medium"
              >
                <span>{subj}</span>
                <button
                  onClick={() => handleRemoveSubject(subj)}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            <div className="flex items-center gap-2 max-w-xs">
              <SearchableDropdown
                options={ENGINEERING_SUBJECT_GROUPS}
                value={newSubjectInput}
                onChange={(val) => {
                  if (val && !subjects.includes(val)) {
                    setSubjects([...subjects, val]);
                    setNewSubjectInput('');
                  }
                }}
                placeholder="+ Select & Add Subject"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-600 dark:text-rose-400 font-bold hover:text-slate-900 dark:hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Pomodoro & Break Recommendations Box */}
      <div className="p-5 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-200">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Pomodoro Rhythm
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Study in 50-minute focused blocks followed by mandatory 10-minute breaks to avoid cognitive burnout.
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Break Recommendation
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Hydrate, stretch, and perform eye strain exercises during scheduled 20-minute mid-day breaks.
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Weekly Mock Tests
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Schedule 1 timed 90-minute full mock exam every Saturday morning followed by immediate answer review.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Study Plan Progress: <strong>{completedTasks} / {totalTasks} Tasks Completed</strong></span>
        </div>

        <div className="w-36 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      {/* Day-Wise Schedule Cards */}
      <div className="space-y-6">
        {(schedule || []).map((day, dayIdx) => (
          <div
            key={dayIdx}
            className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-extrabold text-xs flex items-center justify-center border border-purple-200 dark:border-purple-500/30">
                  D{day.dayNumber}
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {day.dateStr}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{day.focusTitle}</p>
                </div>
              </div>

              <span className="text-xs text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-500/20 self-start sm:self-auto font-medium">
                {(day?.tasks || []).length} Scheduled Sessions
              </span>
            </div>

            {/* Tasks List */}
            <div className="space-y-2.5">
              {(day?.tasks || []).map((task, taskIdx) => (
                <div
                  key={taskIdx}
                  onClick={() => toggleTaskCompletion(dayIdx, taskIdx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30 text-slate-400 line-through'
                      : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-400 dark:hover:border-purple-500/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <button className="mt-0.5 sm:mt-0 text-purple-600 dark:text-purple-400 hover:text-emerald-600 dark:hover:text-emerald-400 shrink-0">
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white no-underline">{task.topic}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 no-underline font-medium">
                          {task.subject}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 no-underline mt-0.5">
                        Type: {task.activityType} ({task.estimatedMinutes} mins)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-800 dark:text-purple-300 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto no-underline">
                    <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400" />
                    <span>{task.timeSlot}</span>
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

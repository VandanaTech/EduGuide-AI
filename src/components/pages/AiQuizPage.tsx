import React, { useState, useEffect } from 'react';
import { QuizConfig, QuizQuestion } from '../../types';
import { generateAiQuiz } from '../../utils/aiQuizService';
import {
  ENGINEERING_SUBJECT_GROUPS,
  LEARNING_LEVELS,
  sampleQuizHistory,
} from '../../data/mockData';
import { SearchableDropdown } from '../SearchableDropdown';
import {
  FileQuestion,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Trophy,
  BarChart3,
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Brain,
  Check,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export const AiQuizPage: React.FC = () => {
  const [config, setConfig] = useState<QuizConfig>({
    subject: 'Data Structures & Algorithms',
    difficulty: 'Intermediate',
    numQuestions: 5,
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerateQuiz = async (overrideConfig?: QuizConfig) => {
    const activeConfig = overrideConfig || config;
    setIsGenerating(true);
    setErrorMsg(null);
    setIsSubmitted(false);
    setUserAnswers({});

    try {
      const generatedQuestions = await generateAiQuiz(activeConfig);
      setQuestions(generatedQuestions);
    } catch (err: any) {
      console.error('AI Quiz fetch error:', err);
      setErrorMsg('Unable to generate AI quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    handleGenerateQuiz();
  }, []);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const total = questions.length || 1;
    const pct = Math.round((correct / total) * 100);

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' • ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

    const newRecord = {
      id: 'qh-' + Date.now(),
      subject: config.subject,
      date: formattedDate,
      score: `${correct}/${total}`,
      total: total,
      percentage: pct,
      difficulty: config.difficulty,
    };

    try {
      const existingStr = localStorage.getItem('eduai_quiz_history');
      let existingList = existingStr ? JSON.parse(existingStr) : sampleQuizHistory;
      if (!Array.isArray(existingList)) existingList = sampleQuizHistory;
      const updated = [newRecord, ...existingList].slice(0, 10);
      localStorage.setItem('eduai_quiz_history', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  // Calculate Performance Metrics
  let correctCount = 0;
  let wrongCount = 0;
  const wrongQuestions: QuizQuestion[] = [];

  questions.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswerIndex) {
      correctCount++;
    } else {
      wrongCount++;
      wrongQuestions.push(q);
    }
  });

  const scorePercentage = Math.round((correctCount / (questions.length || 1)) * 100);

  // Skill Level Estimation
  let estimatedSkillLevel = 'Proficient Scholar';
  if (scorePercentage >= 90) estimatedSkillLevel = 'Mastery / Advanced Expert';
  else if (scorePercentage >= 70) estimatedSkillLevel = 'Proficient / Industry Ready';
  else if (scorePercentage >= 50) estimatedSkillLevel = 'Developing / Intermediate';
  else estimatedSkillLevel = 'Beginner / Needs Foundational Review';

  // Suggested Next Quiz
  const suggestedNextDifficulty = scorePercentage >= 80 ? 'Hard' : scorePercentage >= 50 ? 'Medium' : 'Easy';

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300" /> Adaptive MCQ Evaluator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            AI Practice Quiz <span className="gradient-text">– Diagnostic Mode</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Generate customized engineering quizzes with instant AI answer evaluations, difficulty diagnostics, and weak area analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-950/60 px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-500/30 text-xs font-medium text-purple-900 dark:text-purple-200">
          <Target className="w-4 h-4 text-amber-600 dark:text-amber-300" />
          <span>Active: {config.subject} • {config.difficulty}</span>
        </div>
      </div>

      {/* Quiz Config Controls Bar */}
      <div className="glass-card p-5 rounded-3xl space-y-4 border-slate-200 dark:border-purple-500/20">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
            <FileQuestion className="w-4 h-4 text-purple-600 dark:text-cyan-400" /> Quiz Settings
          </span>
          <span className="text-[10px] text-purple-700 dark:text-purple-300 font-mono">Dynamic AI Generator</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <SearchableDropdown
            label="Engineering Subject"
            options={ENGINEERING_SUBJECT_GROUPS}
            value={config.subject}
            onChange={(val) => setConfig({ ...config, subject: val })}
            placeholder="Select subject..."
          />

          <SearchableDropdown
            label="Difficulty Tier"
            options={LEARNING_LEVELS}
            value={config.difficulty}
            onChange={(val) => setConfig({ ...config, difficulty: val as any })}
          />

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">Number of Questions</label>
            <div className="flex items-center gap-2">
              {[3, 5, 8, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setConfig({ ...config, numQuestions: num })}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                    config.numQuestions === num
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleGenerateQuiz()}
            disabled={isGenerating}
            className={`gradient-button py-2.5 px-6 rounded-xl font-bold text-xs text-white flex items-center gap-2 shadow-lg ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Quiz...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-yellow-300" /> Generate New Quiz
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 font-bold hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {isGenerating ? (
          <div className="p-12 text-center rounded-3xl glass-card border border-purple-500/20 space-y-4">
            <RefreshCw className="w-8 h-8 text-purple-600 dark:text-cyan-400 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Synthesizing AI Practice Quiz...</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Google Gemini API is generating {config.numQuestions} customized MCQs for <span className="font-bold text-purple-600 dark:text-cyan-300">{config.subject}</span> ({config.difficulty} Level).
              </p>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-card border border-slate-200 dark:border-purple-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-cyan-300 flex items-center justify-center mx-auto">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">No Active AI Quiz</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {errorMsg ? "Unable to generate AI quiz. Please try again." : "Select your preferred subject, difficulty, and question count, then click Generate New Quiz."}
              </p>
            </div>
            <button
              onClick={() => handleGenerateQuiz()}
              className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Generate AI Quiz</span>
            </button>
          </div>
        ) : (
          questions.map((q, index) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`glass-card p-6 rounded-3xl space-y-4 border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/10'
                    : 'border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-purple-500/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-500/30 font-bold text-purple-700 dark:text-purple-300 text-xs flex items-center justify-center">
                    Q{index + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {q.topicTag || config.subject}
                  </span>
                </div>

                {isSubmitted && (
                  <div>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt, optIndex) => {
                  const isOptionSelected = userAnswers[q.id] === optIndex;
                  const isCorrectOption = q.correctAnswerIndex === optIndex;

                  let cardStyle = "bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-400 dark:hover:border-purple-500/40";

                  if (isSubmitted) {
                    if (isCorrectOption) {
                      cardStyle = "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm";
                    } else if (isOptionSelected && !isCorrectOption) {
                      cardStyle = "bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 font-bold shadow-sm";
                    } else {
                      cardStyle = "bg-slate-100/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60";
                    }
                  } else if (isOptionSelected) {
                    cardStyle = "bg-purple-100 dark:bg-purple-900/60 border-purple-500 text-purple-950 dark:text-white font-semibold shadow-md";
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleOptionSelect(q.id, optIndex)}
                      disabled={isSubmitted}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${cardStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Rationale & Explanation Box */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-500/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-600 dark:text-cyan-300" /> Rationale & Explanation
                  </p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}

            </div>
          );
        })
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div className="glass-card p-6 rounded-3xl border-slate-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span>
            Answered {Object.keys(userAnswers).length} of {questions.length} questions
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isSubmitted ? (
            <button
              onClick={() => handleGenerateQuiz()}
              className="w-full sm:w-auto gradient-button py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retake / New Quiz
            </button>
          ) : (
            <button
              id="submit-quiz-btn"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className={`w-full sm:w-auto gradient-button py-3 px-8 rounded-2xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg ${
                Object.keys(userAnswers).length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-300" /> Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* ENHANCED QUIZ EVALUATION RESULTS MODAL/BANNER */}
      {isSubmitted && (
        <div className="p-8 rounded-3xl bg-gradient-to-tr from-purple-50 via-slate-50 to-indigo-50 dark:from-purple-950/90 dark:via-slate-900 dark:to-indigo-950/90 border border-purple-200 dark:border-purple-500/40 space-y-6 text-slate-800 dark:text-slate-200">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-600/30 border border-purple-300 dark:border-purple-400/50 flex items-center justify-center mx-auto text-amber-500 dark:text-yellow-400">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Quiz Evaluation & Skill Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
              Diagnostic overview for <span className="font-bold text-slate-900 dark:text-white">{config.subject}</span> ({config.difficulty})
            </p>
          </div>

          {/* Key Metrics Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs block">Total Score</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{correctCount} / {questions.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs block">Accuracy</span>
              <span className="text-2xl font-black text-purple-700 dark:text-cyan-300">{scorePercentage}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs block">Correct / Wrong</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{correctCount} Right</span>
              <span className="text-xs text-rose-600 dark:text-rose-400 block font-semibold">{wrongCount} Wrong</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-xs block">Estimated Level</span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block pt-1">{estimatedSkillLevel}</span>
            </div>
          </div>

          {/* Weak Areas Breakdown */}
          {wrongQuestions.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-rose-200 dark:border-rose-500/30 space-y-2 text-xs shadow-sm">
              <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Weak Topics Requiring Attention:
              </span>
              <div className="space-y-1.5">
                {wrongQuestions.map((wq) => (
                  <div key={wq.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{wq.topicTag}: Q{questions.indexOf(wq) + 1}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{wq.question}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 shrink-0 font-semibold">
                      Needs Review
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Next Steps */}
          <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-600 dark:text-cyan-300" /> AI Suggested Next Step
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                Generate a <span className="text-slate-900 dark:text-white font-bold">{suggestedNextDifficulty}</span> level quiz on {config.subject} to continue adaptive progression.
              </p>
            </div>

            <button
              onClick={() => {
                setConfig({ ...config, difficulty: suggestedNextDifficulty as any });
                handleGenerateQuiz();
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-lg"
            >
              Start {suggestedNextDifficulty} Quiz <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

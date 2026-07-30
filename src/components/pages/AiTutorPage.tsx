import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { LearningPreferences, AiTutorResponse } from '../../types';
import {
  defaultPreferences,
  ENGINEERING_SUBJECT_GROUPS,
  LEARNING_LEVELS,
  INDIAN_LANGUAGES,
  BACKGROUND_KNOWLEDGE,
  CURRENT_YEARS,
  ENGINEERING_BRANCHES,
  CAREER_GOALS,
} from '../../data/mockData';
import { SearchableDropdown } from '../SearchableDropdown';
import {
  Bot,
  Sliders,
  Send,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Code2,
  Lightbulb,
  GraduationCap,
  BookmarkPlus,
  RefreshCw,
  HelpCircle,
  MessageSquareQuote,
  CheckCircle2,
  Mic,
  MicOff,
  Volume2,
  Square,
  Radio,
  RotateCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Zap,
} from 'lucide-react';

export const AiTutorPage: React.FC = () => {
  const [preferences, setPreferences] = useState<LearningPreferences>(defaultPreferences);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedResponse, setSavedResponse] = useState<boolean>(false);

  // Web Speech API States
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [autoReadAloud, setAutoReadAloud] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<{ recognition: boolean; synthesis: boolean }>({
    recognition: false,
    synthesis: false,
  });
  const recognitionRef = useRef<any>(null);

  // Active Collapsible States for Interview Questions & Hints
  const [openInterviewIndices, setOpenInterviewIndices] = useState<Record<number, boolean>>({});
  const [openHintIndices, setOpenHintIndices] = useState<Record<number, boolean>>({});

  // Active AI output state
  const [response, setResponse] = useState<AiTutorResponse>({
    query: 'Explain Binary Search Tree vs Hash Table trade-offs with practical time complexity examples.',
    prefSummary: 'Tailored for 3rd Year CS Student (Intermediate Level, Practical / Hands-on Style, English)',
    simpleExplanation: 'Imagine a dictionary vs a sorted file cabinet. A Hash Table is like jumping straight to a word on a magic page (O(1) instant lookup). A Binary Search Tree is like opening a cabinet at the middle, deciding left or right, and halving remaining folders each step (O(log N)).',
    detailedExplanation: `A Binary Search Tree (BST) stores key-value pairs in a hierarchical tree structure maintaining strict sorted order. In contrast, a Hash Table uses a hash function to map keys to array indices for O(1) average constant-time access.

### Key Trade-offs:
1. **Search Speed**: Hash Table offers **O(1)** average lookup vs BST **O(log N)**.
2. **Order & Range Queries**: BST maintains elements in in-order sorted arrangement, allowing fast range queries (e.g., finding all values between 20 and 50 in O(log N + K)). Hash Tables lose order completely.
3. **Worst Case Performance**: An unbalanced BST degrades to O(N) linked list complexity. Hash Tables degrade to O(N) only when extreme hash collisions occur (handled via Separate Chaining or Open Addressing).`,
    realWorldExample: 'In web search engines, Hash Tables power instant user session lookup tokens, while BSTs (or B-Trees) power database index range queries like "Find all orders placed between 9 AM and 12 PM".',
    codeExample: `// Hash Table Lookup: O(1) Average
const userMap = new Map<string, { name: string; role: string }>();
userMap.set('user_101', { name: 'Alice', role: 'Dev' });
console.log(userMap.get('user_101')); // Instant O(1) lookup

// Binary Search Tree Node Concept in TypeScript
interface BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;
}`,
    commonMistakes: [
      'Assuming Hash Tables maintain sorted order of keys (they do not).',
      'Forgetting that unbalanced BSTs degrade to linear O(N) linked list lookup time.',
      'Ignoring hash collision degradation when load factors exceed 0.75.',
    ],
    interviewQuestions: [
      {
        question: 'When would you prefer a Self-Balancing BST over a Hash Table in production?',
        answer: 'When you require in-order traversal, min/max operations, or frequent range queries (e.g., finding items between min and max range), as Hash Tables cannot perform range queries without full scans.',
      },
      {
        question: 'What is the worst-case time complexity of a Hash Table lookup and how do modern engines mitigate it?',
        answer: 'Worst-case is O(N) when all keys hash to the same bucket. Modern engines mitigate this by converting long bucket linked lists to balanced Red-Black Trees (e.g., Java 8 HashMap treeification threshold = 8).',
      },
    ],
    practiceQuestions: [
      {
        question: 'Which data structure is better for finding the top 5 closest prices to $100 in a live stock market feed?',
        hint: 'Consider whether you need ordering or constant key equality lookup.',
      },
      {
        question: 'What happens to a BST if you insert strictly sorted numbers 1, 2, 3, 4, 5 in sequence without auto-balancing?',
        hint: 'Think about the height of the tree.',
      },
    ],
    summary: 'Hash Tables offer lightning-fast O(1) lookup for unordered key-value pairs, whereas Binary Search Trees guarantee O(log N) operations with sorted ordering and range query support.',
    keyTakeaways: [
      'Use Hash Tables when speed is paramount and key order does not matter (e.g. session tokens, caching).',
      'Use Self-Balancing BSTs (Red-Black, AVL) when sorted order and min/max/range queries are required.',
      'Hash table load factors determine when resizing occurs to preserve O(1) efficiency.',
    ],
    examTip: 'Exam Alert: In interviews, explicitly highlight that C++ std::map uses a Red-Black Tree (O(log N)), whereas std::unordered_map uses a Hash Table (O(1) average).',
    timestamp: 'Just now',
  });

  const presetPrompts = [
    'Explain Recursion & Call Stack overflow with visual analogy',
    'How to prepare for System Design interviews in 3rd year?',
    'Break down Transformer Self-Attention mechanism step-by-step',
    'Explain ACID properties in SQL databases with real banking example',
  ];

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check Web Speech API availability on mount
  useEffect(() => {
    const hasRec = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    const hasSyn = 'speechSynthesis' in window;
    setSpeechSupported({ recognition: hasRec, synthesis: hasSyn });
  }, []);

  // Cleanup speech resources on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Language mapping helper
  const getLangCode = (prefLang?: string) => {
    if (!prefLang) return 'en-US';
    const lower = prefLang.toLowerCase();
    if (lower.includes('hindi')) return 'hi-IN';
    if (lower.includes('spanish')) return 'es-ES';
    if (lower.includes('french')) return 'fr-FR';
    if (lower.includes('german')) return 'de-DE';
    if (lower.includes('mandarin') || lower.includes('chinese')) return 'zh-CN';
    if (lower.includes('japanese')) return 'ja-JP';
    return 'en-US';
  };

  // Voice Input (Speech Recognition)
  const toggleSpeechRecognition = async () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setErrorMsg('Web Speech Recognition is not supported in this browser. Please try Google Chrome or MS Edge.');
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (micErr: any) {
        console.warn('Microphone permission check:', micErr);
        setErrorMsg('Microphone access was denied or restricted. You can type your question directly in the text box below.');
        setIsListening(false);
        return;
      }
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getLangCode(preferences.preferredLanguage);

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let transcriptResult = '';
        for (let i = 0; i < event.results.length; i++) {
          transcriptResult += event.results[i][0].transcript;
        }
        if (transcriptResult) {
          setPrompt(transcriptResult);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  // Text-To-Speech (Speech Synthesis)
  const speakResponseText = (customText?: string) => {
    if (!('speechSynthesis' in window)) {
      setErrorMsg('Text-to-speech read aloud is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = customText || `${response.simpleExplanation}. ${response.summary}. Key takeaways: ${response.keyTakeaways.join('. ')}. Exam tip: ${response.examTip}`;
    
    const cleanSpeechText = textToRead
      .replace(/```[\s\S]*?```/g, ' Code example provided in response card. ')
      .replace(/[*#_~`]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanSpeechText) return;

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
      utterance.lang = getLangCode(preferences.preferredLanguage);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err: any) {
      console.warn('Speech synthesis notice:', err);
      setIsSpeaking(false);
    }
  };

  const handleAskAI = async (customQuery?: string) => {
    const activeQuery = customQuery || prompt;
    if (!activeQuery.trim()) return;

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
    }

    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setCopied(false);
    setSavedResponse(false);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeQuery,
          preferences,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to communicate with AI Tutor API.');
      }

      const data = await res.json();

      const newResp: AiTutorResponse = {
        query: activeQuery,
        prefSummary: `Tailored for ${preferences.currentYear} ${preferences.branch} (${preferences.learningLevel} Level, ${preferences.learningStyle} Style, ${preferences.preferredLanguage})`,
        simpleExplanation: data.simpleExplanation || 'Simplified summary generated.',
        detailedExplanation: data.detailedExplanation || data.explanation || 'No detailed explanation provided.',
        realWorldExample: data.realWorldExample || 'Real-world practical application scenario.',
        codeExample: data.codeExample || '',
        commonMistakes: Array.isArray(data.commonMistakes) ? data.commonMistakes : [],
        interviewQuestions: Array.isArray(data.interviewQuestions) ? data.interviewQuestions : [],
        practiceQuestions: Array.isArray(data.practiceQuestions) ? data.practiceQuestions : [],
        summary: data.summary || 'Summary generated.',
        keyTakeaways: Array.isArray(data.keyTakeaways) ? data.keyTakeaways : [],
        examTip: data.examTip || 'Focus on understanding core trade-offs and edge cases.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setResponse(newResp);
      setPrompt('');

      if (autoReadAloud) {
        setTimeout(() => {
          speakResponseText(`${newResp.simpleExplanation}. ${newResp.summary}`);
        }, 400);
      }
    } catch (err: any) {
      console.error('AI Tutor Error:', err);
      setErrorMsg(err.message || 'An error occurred while generating AI response.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `Query: ${response.query}\n\nSimple Explanation:\n${response.simpleExplanation}\n\nDetailed Explanation:\n${response.detailedExplanation}\n\nKey Takeaways:\n${response.keyTakeaways.join('\n')}\n\nExam Tip: ${response.examTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleInterviewQuestion = (index: number) => {
    setOpenInterviewIndices((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleHint = (index: number) => {
    setOpenHintIndices((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="p-6 rounded-3xl glass-card border-slate-200 dark:border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300" /> SDG 4 Pedagogical AI Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            AI Tutor <span className="gradient-text">– Structured Learning</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Get 9-part structured explanations with simple analogies, code blueprints, interview questions, and practice self-assessments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-950/60 px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-500/30 text-xs font-medium text-purple-900 dark:text-purple-200">
          <GraduationCap className="w-4 h-4 text-purple-600 dark:text-cyan-300" />
          <span>Profile: {preferences.learningLevel} • {preferences.learningStyle}</span>
        </div>
      </div>

      {/* Main Grid: Sidebar Controls & Response Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR: Preferences Configuration */}
        <aside className="lg:col-span-4 glass-card p-5 sm:p-6 rounded-3xl space-y-5 border-slate-200 dark:border-purple-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Sliders className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
              <span>Learning Preferences</span>
            </div>
            <span className="text-[10px] text-purple-600 dark:text-purple-300 font-semibold uppercase">Personalized</span>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Subject */}
            <SearchableDropdown
              label="Subject / Engineering Topic"
              options={ENGINEERING_SUBJECT_GROUPS}
              value={preferences.subject}
              onChange={(val) => setPreferences({ ...preferences, subject: val })}
              placeholder="Search or select subject..."
            />

            {/* Learning Level */}
            <SearchableDropdown
              label="Learning Level"
              options={LEARNING_LEVELS}
              value={preferences.learningLevel}
              onChange={(val) => setPreferences({ ...preferences, learningLevel: val as any })}
            />

            {/* Learning Style */}
            <SearchableDropdown
              label="Learning Style"
              options={['Practical / Hands-on', 'Visual', 'Theoretical', 'ELI5 (Simplified)', 'Code-First']}
              value={preferences.learningStyle}
              onChange={(val) => setPreferences({ ...preferences, learningStyle: val as any })}
            />

            {/* Preferred Language */}
            <SearchableDropdown
              label="Preferred Language"
              options={INDIAN_LANGUAGES}
              value={preferences.preferredLanguage}
              onChange={(val) => setPreferences({ ...preferences, preferredLanguage: val })}
              placeholder="Search language..."
            />

            {/* Background Knowledge */}
            <SearchableDropdown
              label="Background Knowledge"
              options={BACKGROUND_KNOWLEDGE}
              value={preferences.backgroundKnowledge}
              onChange={(val) => setPreferences({ ...preferences, backgroundKnowledge: val as any })}
            />

            {/* Current Year */}
            <SearchableDropdown
              label="Current Academic Year"
              options={CURRENT_YEARS}
              value={preferences.currentYear}
              onChange={(val) => setPreferences({ ...preferences, currentYear: val as any })}
            />

            {/* Branch */}
            <SearchableDropdown
              label="Engineering Branch"
              options={ENGINEERING_BRANCHES}
              value={preferences.branch}
              onChange={(val) => setPreferences({ ...preferences, branch: val })}
              placeholder="Select branch..."
            />

            {/* Career Goal */}
            <SearchableDropdown
              label="Target Career Goal"
              options={CAREER_GOALS}
              value={preferences.careerGoal}
              onChange={(val) => setPreferences({ ...preferences, careerGoal: val })}
              placeholder="Select career path..."
            />

          </div>
        </aside>

        {/* MAIN AREA: Query & Multi-Part AI Response */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Quick Prompts */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Preset Learning Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset);
                    handleAskAI(preset);
                  }}
                  className="text-xs bg-white dark:bg-slate-900/80 hover:bg-purple-50 dark:hover:bg-purple-900/40 text-slate-700 dark:text-slate-300 hover:text-purple-900 dark:hover:text-purple-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all text-left shadow-sm"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="glass-card p-4 rounded-3xl space-y-3 border-slate-200 dark:border-purple-500/25">
            {isListening && (
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/50 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <Mic className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Listening... Speak your question in {preferences.preferredLanguage}.</span>
                </div>
                <button
                  onClick={toggleSpeechRecognition}
                  className="text-xs font-bold underline hover:text-rose-950 dark:hover:text-white"
                >
                  Stop
                </button>
              </div>
            )}

            <div className="relative">
              <textarea
                id="ai-tutor-prompt-input"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your AI Tutor anything... (e.g. 'Explain how Dynamic Programming solves the 0/1 Knapsack Problem with time complexity')"
                className="w-full glass-input p-4 rounded-2xl text-sm sm:text-base resize-none focus:ring-2 focus:ring-purple-500/30 border-slate-300 dark:border-purple-500/30 bg-white dark:bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                    isListening
                      ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/40 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-900/90 text-purple-700 dark:text-purple-200 border border-slate-300 dark:border-purple-500/30 hover:border-purple-400 hover:text-purple-900 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-purple-950/40'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4 text-white" />
                      <span>Stop Listening</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
                      <span>Voice Question</span>
                    </>
                  )}
                </button>
              </div>

              <button
                id="ask-ai-submit-btn"
                onClick={() => handleAskAI()}
                disabled={isGenerating || !prompt.trim()}
                className={`gradient-button px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg ${
                  isGenerating || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Ask AI Tutor
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center justify-between">
              <span>⚠️ {errorMsg}</span>
              <button onClick={() => setErrorMsg(null)} className="text-rose-600 dark:text-rose-400 font-bold hover:underline">Dismiss</button>
            </div>
          )}

          {/* STRUCTURED RESPONSE CARD (ALL 9 SECTIONS) */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-slate-200 dark:border-purple-500/30 relative">
            
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                    Complete Structured Tutor Explanation
                    {isSpeaking && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 font-normal flex items-center gap-1 animate-pulse">
                        <Volume2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Speaking...
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                  {response.prefSummary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => speakResponseText()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Read Aloud
                </button>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-purple-500/40 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Prompt Callout */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Prompt: </span>
                <span className="italic text-slate-800 dark:text-slate-200">"{response.query}"</span>
              </div>
            </div>

            {/* SECTION 1: SIMPLE EXPLANATION (ELI5) */}
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-300" /> 1. Simple Explanation (Intuitive Analogy)
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {response.simpleExplanation}
              </p>
            </div>

            {/* SECTION 2: DETAILED EXPLANATION */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> 2. Detailed Academic Explanation
              </div>
              <div className="markdown-content text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <ReactMarkdown>{response.detailedExplanation}</ReactMarkdown>
              </div>
            </div>

            {/* SECTION 3: REAL-WORLD EXAMPLE */}
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 3. Real-world Industry Example:
              </span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{response.realWorldExample}</p>
            </div>

            {/* SECTION 4: CODE EXAMPLE */}
            {response.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-purple-600 dark:text-cyan-400" /> 4. Code & Practical Implementation
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">TypeScript / ES6</span>
                </div>
                <div className="relative p-4 rounded-2xl bg-slate-900 dark:bg-[#070b14] border border-slate-300 dark:border-slate-800 font-mono text-xs text-cyan-300 dark:text-cyan-300 overflow-x-auto shadow-inner">
                  <pre>{response.codeExample}</pre>
                </div>
              </div>
            )}

            {/* SECTION 5: COMMON MISTAKES */}
            {response.commonMistakes && response.commonMistakes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" /> 5. Common Mistakes & Pitfalls
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {response.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-sm">
                      <span className="font-bold text-amber-800 dark:text-amber-300">Pitfall {idx + 1}</span>
                      <p className="leading-snug">{mistake}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6: INTERVIEW QUESTIONS */}
            {response.interviewQuestions && response.interviewQuestions.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" /> 6. Technical Interview Questions
                </h4>
                <div className="space-y-2">
                  {response.interviewQuestions.map((iq, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm">
                      <div
                        onClick={() => toggleInterviewQuestion(idx)}
                        className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-cyan-300 transition-colors"
                      >
                        <span>Q{idx + 1}: {iq.question}</span>
                        {openInterviewIndices[idx] ? <ChevronUp className="w-4 h-4 text-purple-600 dark:text-purple-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                      {openInterviewIndices[idx] && (
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs leading-relaxed animate-in fade-in">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Model Answer:</span>
                          {iq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: PRACTICE QUESTIONS */}
            {response.practiceQuestions && response.practiceQuestions.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 7. Self-Assessment Practice Questions
                </h4>
                <div className="space-y-2">
                  {response.practiceQuestions.map((pq, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm">
                      <p className="font-bold text-slate-900 dark:text-white">Challenge {idx + 1}: {pq.question}</p>
                      <div>
                        <button
                          onClick={() => toggleHint(idx)}
                          className="text-[11px] font-bold text-purple-700 dark:text-purple-300 hover:underline"
                        >
                          {openHintIndices[idx] ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {openHintIndices[idx] && (
                          <p className="mt-1 text-slate-600 dark:text-slate-400 italic text-[11px] bg-white dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                            💡 Hint: {pq.hint}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 8 & 9 & EXAM TIP: SUMMARY, KEY TAKEAWAYS, EXAM TIP */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 text-xs shadow-sm">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">8. Executive Summary</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{response.summary}</p>
              </div>

              {response.keyTakeaways && response.keyTakeaways.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 9. Key Takeaways
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {response.keyTakeaways.map((kt, i) => (
                      <li key={i} className="leading-relaxed">{kt}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-800 dark:text-amber-300">Exam & Interview Tip: </span>
                  <span>{response.examTip}</span>
                </div>
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

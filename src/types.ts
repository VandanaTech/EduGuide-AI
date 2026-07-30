export type PageTab =
  | 'home'
  | 'dashboard'
  | 'tutor'
  | 'quiz'
  | 'roadmap'
  | 'planner'
  | 'resources'
  | 'about';

export interface LearningPreferences {
  subject: string;
  learningLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  learningStyle: 'Visual' | 'Practical / Hands-on' | 'Theoretical' | 'ELI5 (Simplified)' | 'Code-First';
  preferredLanguage: string;
  backgroundKnowledge: 'None' | 'Basic' | 'Intermediate' | 'Strong';
  currentYear: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Graduate';
  branch: string;
  careerGoal: string;
}

export interface AiTutorResponse {
  query: string;
  prefSummary: string;
  simpleExplanation: string;
  detailedExplanation: string;
  realWorldExample: string;
  codeExample: string;
  commonMistakes: string[];
  interviewQuestions: { question: string; answer: string }[];
  practiceQuestions: { question: string; hint: string }[];
  summary: string;
  keyTakeaways: string[];
  examTip: string;
  timestamp: string;
}

export interface QuizConfig {
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  numQuestions: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topicTag: string;
}

export interface RoadmapMilestone {
  title: string;
  duration: string;
  skills: string[];
  recommendedProjects: string[];
  resources: string[];
  status: 'Completed' | 'In Progress' | 'Upcoming';
  keyObjectives: string[];
}

export interface RoadmapSemester {
  semester: string;
  phaseTitle: string;
  focusArea: string;
  milestones: RoadmapMilestone[];
}

export interface StudyPlanTask {
  timeSlot: string;
  subject: string;
  topic: string;
  activityType: 'Concept Reading' | 'Problem Solving' | 'Revision & Flashcards' | 'Practice Test' | 'Mock Test' | 'Break' | 'Project Work';
  estimatedMinutes: number;
  completed?: boolean;
}

export interface DayStudySchedule {
  dayNumber: number;
  dateStr: string;
  focusTitle: string;
  tasks: StudyPlanTask[];
}

export interface LearningResource {
  id: string;
  title: string;
  category: 'Documentation' | 'YouTube' | 'Practice Websites' | 'GitHub Repositories' | 'Free Courses' | 'Reference Books' | 'Roadmaps' | string;
  description: string;
  tags: string[];
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  rating: number;
  authorOrProvider: string;
  isOfficial?: boolean;
  subject?: string;
}

export interface SmartRecommendationItem {
  id: string;
  category: 'Skills' | 'Projects' | 'Courses' | 'Certifications' | 'Internships' | 'Hackathons' | 'Books' | 'Research Papers';
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  difficulty: string;
  actionUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  isGuest: boolean;
  institution?: string;
  major?: string;
  currentYear?: string;
  branch?: string;
  careerGoal?: string;
}

export interface AchievementBadge {
  id: string;
  name?: string;
  title?: string;
  description: string;
  icon?: string;
  iconName?: string;
  unlocked: boolean;
  dateUnlocked?: string;
  category?: 'Quiz' | 'Streak' | 'Roadmap' | 'Tutor';
}

export interface QuizHistoryItem {
  id: string;
  subject: string;
  score: number | string;
  total?: number;
  percentage: number;
  date: string;
  difficulty: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: 'Resume' | 'Interview' | 'Internship';
  completed: boolean;
}

export interface DashboardStats {
  overallProgressPercentage: number;
  quizzesTaken: number;
  averageQuizScore: number;
  studyStreakDays: number;
  hoursStudiedThisWeek: number;
  coursesCompleted: number;
  dailyGoalHours?: number;
  todayStudyTimeMinutes?: number;
  recommendedNextTopic?: string;
  completedSubjectsCount?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'Quiz' | 'Tutor' | 'Roadmap' | 'Planner';
  timestamp: string;
  status: string;
}

export interface AccessibilitySettings {
  fontSizeScale: 'sm' | 'normal' | 'lg' | 'xl';
  highContrast: boolean;
  screenReaderMode?: boolean;
  keyboardFocusVisible?: boolean;
}

declare global {
  interface Window {
    botpress?: any;
    botpressWebChat?: any;
  }
}


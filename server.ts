import "dotenv/config";
import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const MODELS_TO_TRY = [
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

async function generateWithFallback(ai: GoogleGenAI, params: any) {
  let lastError: any = null;
  for (const model of MODELS_TO_TRY) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errStr = String(err?.message || err || "");
      const isQuota =
        err?.status === "RESOURCE_EXHAUSTED" ||
        err?.code === 429 ||
        errStr.includes("429") ||
        errStr.includes("quota") ||
        errStr.includes("RESOURCE_EXHAUSTED");

      if (isQuota) {
        console.warn(`[Gemini API] Quota exceeded for model "${model}". Trying next available model...`);
        continue;
      }
      console.warn(`[Gemini API] Error with model "${model}":`, errStr);
    }
  }
  throw lastError;
}

// ----------------------------------------------------
// 1. AI Tutor Endpoint
// ----------------------------------------------------
app.post("/api/tutor", async (req, res) => {
  const { prompt, preferences } = req.body;
  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({ error: "Prompt is required." });
    return;
  }

  const subject = preferences?.subject || "General Computer Science";
  const learningLevel = preferences?.learningLevel || "Intermediate";
  const learningStyle = preferences?.learningStyle || "Practical / Hands-on";
  const preferredLanguage = preferences?.preferredLanguage || "English";

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are EduGuide AI, an elite personal tutor dedicated to UN SDG 4 (Quality Education).
Your student's active profile is:
- Subject / Topic: ${subject}
- Learning Level: ${learningLevel}
- Learning Style: ${learningStyle}
- Preferred Language: ${preferredLanguage}
- Background Knowledge: ${preferences?.backgroundKnowledge || "Basic Understanding"}
- Current Year: ${preferences?.currentYear || "3rd Year"}
- Branch: ${preferences?.branch || "Computer Science"}
- Career Goal: ${preferences?.careerGoal || "Software Engineer"}

CRITICAL REQUIREMENT:
You MUST provide a comprehensive, multi-part pedagogical explanation containing ALL of the following 10 sections:
1. simpleExplanation: Intuitive, ELI5 / easy-to-understand explanation using plain language.
2. detailedExplanation: In-depth academic explanation with core mechanics, architecture, and principles in Markdown.
3. realWorldExample: Real-world, practical industry application scenario.
4. codeExample: Clean code snippet, pseudocode, or architectural algorithm blueprint with inline comments.
5. commonMistakes: Array of 3 to 4 common student mistakes, pitfalls, or edge-case misconceptions.
6. interviewQuestions: Array of 2 to 3 objects containing { question, answer } commonly asked in software/engineering interviews.
7. practiceQuestions: Array of 2 to 3 objects containing { question, hint } for self-assessment.
8. summary: Concise 2-sentence executive summary.
9. keyTakeaways: Array of 3 to 4 bullet points summarizing the key takeaways.
10. examTip: High-yield exam or professor highlight.

Adhere strictly to the JSON schema.`;

    const response = await generateWithFallback(ai, {
      contents: `Student Question: "${prompt}"`,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            simpleExplanation: {
              type: Type.STRING,
              description: "Intuitive, simple explanation using ELI5 analogies.",
            },
            detailedExplanation: {
              type: Type.STRING,
              description: "Comprehensive Markdown text detailing concepts, mechanics, and principles.",
            },
            realWorldExample: {
              type: Type.STRING,
              description: "Practical industry or real-world application example.",
            },
            codeExample: {
              type: Type.STRING,
              description: "Clean code example or algorithmic pseudocode.",
            },
            commonMistakes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 common mistakes or misconceptions.",
            },
            interviewQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING },
                },
                required: ["question", "answer"],
              },
              description: "Common technical interview questions with model answers.",
            },
            practiceQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ["question", "hint"],
              },
              description: "Self-test practice questions with hints.",
            },
            summary: {
              type: Type.STRING,
              description: "2-sentence executive summary.",
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 4 concise key takeaways.",
            },
            examTip: {
              type: Type.STRING,
              description: "A high-yield exam/interview tip or professor highlight.",
            },
          },
          required: [
            "simpleExplanation",
            "detailedExplanation",
            "realWorldExample",
            "codeExample",
            "commonMistakes",
            "interviewQuestions",
            "practiceQuestions",
            "summary",
            "keyTakeaways",
            "examTip"
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.warn("AI Tutor Fallback trigger:", error?.message || error);
    res.json(getFallbackTutorData(prompt, subject, learningLevel, learningStyle));
  }
});

function getFallbackTutorData(prompt: string, subject: string, level: string, style: string) {
  return {
    simpleExplanation: `Think of "${prompt}" in ${subject} as a modular system block. Imagine a sorting facility: inputs arrive, pass through deterministic logic, and produce structured, optimized outputs without state pollution.`,
    detailedExplanation: `### Comprehensive Analysis: ${prompt}\n\nIn **${subject}** (${level} Level, ${style} Approach), **"${prompt}"** is a core pedagogical foundation:\n\n1. **Theoretical Mechanics**: Operates by breaking down complex operations into manageable, deterministic instructions with defined invariant constraints.\n2. **System Architecture**: Prioritizes computational memory efficiency, clean separation of concerns, and minimal side effects.\n3. **Practical Utility**: Applied extensively across modern cloud infrastructure, software frameworks, and high-frequency data pipelines.`,
    realWorldExample: `In high-throughput industry applications (such as distributed databases and web application backends), ${prompt} guarantees high reliability, predictable execution latency, and optimal memory management under heavy traffic.`,
    codeExample: `// Sample Implementation Blueprint for: ${prompt}\nfunction process${subject.replace(/[^a-zA-Z]/g, '')}Concept(inputData: string[]): { status: string; data: string[] } {\n  console.log("Executing ${prompt} with ${style} focus...");\n  const processed = inputData.map(item => item.trim().toUpperCase());\n  return {\n    status: "SUCCESS",\n    data: processed\n  };\n}`,
    commonMistakes: [
      `Confusing execution control flow with asynchronous event loop non-blocking behavior.`,
      `Overlooking boundary conditions such as empty collections, null pointers, or integer overflow.`,
      `Neglecting space complexity O(N) when optimizing solely for execution time.`
    ],
    interviewQuestions: [
      {
        question: `How would you optimize an algorithm implementing ${prompt} for low-latency memory constraints?`,
        answer: `By adopting in-place state mutations, stream processing buffers, or lazy evaluation pipelines to minimize garbage collection overhead.`
      },
      {
        question: `What are the primary architectural trade-offs when implementing ${prompt} in distributed systems?`,
        answer: `Trade-offs center on data consistency vs availability (CAP Theorem), network round-trip latency, and state synchronization costs.`
      }
    ],
    practiceQuestions: [
      {
        question: `What is the worst-case asymptotic time complexity of standard ${prompt} operations?`,
        hint: `Evaluate how execution time scales as input size N doubles.`
      },
      {
        question: `How does immutability benefit multithreaded applications handling ${prompt}?`,
        hint: `Think about race conditions, thread locking, and memory visibility across CPU cores.`
      }
    ],
    summary: `Mastering ${prompt} equips engineering students with vital technical problem-solving skills, balancing computational speed with robust architectural stability.`,
    keyTakeaways: [
      `A thorough understanding of ${prompt} is fundamental for technical interviews and system design.`,
      `Always weigh time complexity O(N) against memory overhead before choosing an algorithmic approach.`,
      `Validate edge cases and state constraints early in development.`
    ],
    examTip: `High-Yield Exam Tip: Expect professors and technical interviewers to ask for time complexity bounds and space trade-offs regarding ${prompt}.`
  };
}

// ----------------------------------------------------
// 2. AI Quiz Endpoint
// ----------------------------------------------------
app.post("/api/quiz", async (req, res) => {
  const { subject, difficulty, numQuestions } = req.body;
  const count = Number(numQuestions) || 5;
  const subj = subject || "General Computer Science";
  const diff = difficulty || "Medium";

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are an expert educational assessment author creating dynamic, high-quality technical quizzes for university engineering students.
Generate exactly ${count} multiple-choice questions (MCQs) for:
- Subject: ${subj}
- Difficulty Level: ${diff}

STRICT REQUIREMENTS:
1. Return a JSON object with a "questions" array containing exactly ${count} question objects.
2. Each question object MUST have integer IDs starting from 1 to ${count}.
3. Each question MUST have exactly 4 distinct options in the "options" array.
4. Exactly ONE option must be correct, indicated by "correctAnswerIndex" (0, 1, 2, or 3).
5. Provide a thorough, educational rationale/explanation explaining why the correct answer is right and clarifying misconceptions.
6. Provide a concise, relevant topicTag for each question.
7. Always generate fresh, unique questions tailored specifically to "${subj}" at "${diff}" level.`;

    const response = await generateWithFallback(ai, {
      contents: `Generate a brand-new ${count}-question ${diff} level quiz on "${subj}".`,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topicTag: { type: Type.STRING },
                },
                required: ["id", "question", "options", "correctAnswerIndex", "explanation", "topicTag"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    if (data && Array.isArray(data.questions) && data.questions.length > 0) {
      res.json({ questions: data.questions });
    } else {
      throw new Error("Invalid response format from Gemini API.");
    }
  } catch (error: any) {
    console.error("AI Quiz generation error:", error?.message || error);
    res.status(500).json({ error: "Unable to generate AI quiz. Please try again." });
  }
});

// ----------------------------------------------------
// 3. Career Roadmap Endpoint
// ----------------------------------------------------
app.post("/api/roadmap", async (req, res) => {
  const { currentYear, branch, careerGoal } = req.body;
  const yr = currentYear || "3rd Year";
  const br = branch || "Computer Science";
  const goal = careerGoal || "Software Engineer";

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are a Senior Career Mentor and Academic Advisory System.
Generate an actionable, semester-by-semester career roadmap for a university student with:
- Current Year: ${yr}
- Branch: ${br}
- Target Career Goal: ${goal}

Generate 3-4 structured semester phases (e.g. "Semester 5 (Fall)", "Semester 6 (Spring)", etc.).
For each semester, include 2-3 strategic milestones. Each milestone must list:
- title
- duration (e.g. "4 Weeks", "Semester Long")
- skills (array of technologies/skills)
- recommendedProjects (1-2 real-world portfolio project names)
- resources (1-2 official documentation or learning links)
- status ("In Progress" for current semester, "Upcoming" for future)
- keyObjectives (2-3 bullet points)`;

    const response = await generateWithFallback(ai, {
      contents: `Create a customized career roadmap for a ${yr} ${br} student aiming to become a ${goal}.`,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              semester: { type: Type.STRING },
              phaseTitle: { type: Type.STRING },
              focusArea: { type: Type.STRING },
              milestones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendedProjects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                    status: { type: Type.STRING },
                    keyObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["title", "duration", "skills", "recommendedProjects", "resources", "status", "keyObjectives"],
                },
              },
            },
            required: ["semester", "phaseTitle", "focusArea", "milestones"],
          },
        },
      },
    });

    const roadmap = JSON.parse(response.text || "[]");
    res.json({ roadmap });
  } catch (error: any) {
    console.warn("Career Roadmap Fallback trigger:", error?.message || error);
    res.json({ roadmap: getFallbackRoadmapData(yr, br, goal) });
  }
});

function getFallbackRoadmapData(currentYear: string, branch: string, careerGoal: string) {
  return [
    {
      semester: "Semester 5 (Current Phase)",
      phaseTitle: "Core Mastery & Problem Solving",
      focusArea: `Foundations in ${branch} for ${careerGoal}`,
      milestones: [
        {
          title: "Advanced Data Structures & Algorithmic Practice",
          duration: "6 Weeks",
          skills: ["Algorithms", "Data Structures", "Problem Solving", "Time Complexity"],
          recommendedProjects: ["Interactive Algorithm Visualizer", "Custom Cache Engine"],
          resources: ["LeetCode Problem Set", "GeeksforGeeks CS Core"],
          status: "In Progress",
          keyObjectives: [
            "Solve 50+ medium-tier array, tree, and dynamic programming challenges",
            "Master asymptotic time and space complexity trade-offs"
          ]
        },
        {
          title: "Full-Stack System Architecture & REST APIs",
          duration: "8 Weeks",
          skills: ["TypeScript", "Node.js", "Express", "PostgreSQL", "React"],
          recommendedProjects: ["Real-time Academic Dashboard", "Collaborative Workspace API"],
          resources: ["MDN Web Docs", "Official Express Guide"],
          status: "In Progress",
          keyObjectives: [
            "Build production-grade REST API with JWT authentication and ORM integration",
            "Implement responsive UI components with clean state management"
          ]
        }
      ]
    },
    {
      semester: "Semester 6 (Upcoming)",
      phaseTitle: "System Design & Industry Projects",
      focusArea: `Production-Grade Projects for ${careerGoal}`,
      milestones: [
        {
          title: "High-Throughput Microservices & Caching",
          duration: "8 Weeks",
          skills: ["Redis", "Docker", "System Design", "Microservices"],
          recommendedProjects: ["Distributed Task Queue", "High-Volume URL Shortener"],
          resources: ["ByteByteGo System Design", "Docker Documentation"],
          status: "Upcoming",
          keyObjectives: [
            "Design scalable database schemas with indexing and caching layers",
            "Containerize microservices using Docker and environment configurations"
          ]
        },
        {
          title: "Open Source Contributions & Technical Portfolios",
          duration: "6 Weeks",
          skills: ["Git", "GitHub Actions", "CI/CD", "Testing"],
          recommendedProjects: ["Open Source Library PRs", "Interactive Portfolio Website"],
          resources: ["GitHub Docs", "First Contributions Guide"],
          status: "Upcoming",
          keyObjectives: [
            "Contribute code features or documentation fixes to popular open-source repositories",
            "Set up automated CI/CD pipelines with GitHub Actions"
          ]
        }
      ]
    },
    {
      semester: "Semester 7 & 8 (Final Phase)",
      phaseTitle: "Interview Preparation & Capstone",
      focusArea: `Career Placement as ${careerGoal}`,
      milestones: [
        {
          title: "Mock Interviews & System Design Readiness",
          duration: "10 Weeks",
          skills: ["System Design", "Behavioral Interviewing", "Mock Coding"],
          recommendedProjects: ["Major Capstone Industry Application"],
          resources: ["Pramp Mock Interviews", "Grokking System Design"],
          status: "Upcoming",
          keyObjectives: [
            "Complete 15+ peer mock interviews covering live coding and system design",
            "Finalize major university capstone project with live Cloud Run deployment"
          ]
        }
      ]
    }
  ];
}

// ----------------------------------------------------
// 4. Study Planner Endpoint
// ----------------------------------------------------
app.post("/api/planner", async (req, res) => {
  const { examDate, subjects, dailyHours } = req.body;
  const hours = Number(dailyHours) || 6;
  const subjectList = Array.isArray(subjects) && subjects.length > 0 ? subjects.join(", ") : "Core Subjects";

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are an AI Academic Study Planner optimizing for peak retention and exam readiness.
Generate a 3-day sample intensive study schedule leading up to the exam date (${examDate || "Upcoming Exams"}).
- Target Subjects: ${subjectList}
- Available Daily Hours: ${hours} Hours/day

For each day (Day 1, Day 2, Day 3):
- Allocate 3 to 5 study sessions fitting within ${hours} hours.
- Mix concept reading, problem solving, practice tests, and revision.
- Include realistic time slots (e.g., "08:00 AM - 10:00 AM").`;

    const response = await generateWithFallback(ai, {
      contents: `Generate a 3-day study plan for subjects [${subjectList}] with ${hours} hours/day capacity for exam on ${examDate}.`,
      config: {
        systemInstruction,
        temperature: 0.6,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dayNumber: { type: Type.INTEGER },
              dateStr: { type: Type.STRING },
              focusTitle: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timeSlot: { type: Type.STRING },
                    subject: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    activityType: { type: Type.STRING },
                    estimatedMinutes: { type: Type.INTEGER },
                  },
                  required: ["timeSlot", "subject", "topic", "activityType", "estimatedMinutes"],
                },
              },
            },
            required: ["dayNumber", "dateStr", "focusTitle", "tasks"],
          },
        },
      },
    });

    const schedule = JSON.parse(response.text || "[]");
    res.json({ schedule });
  } catch (error: any) {
    console.warn("Study Planner Fallback trigger:", error?.message || error);
    res.json({ schedule: getFallbackPlannerData(examDate, subjectList, hours) });
  }
});

function getFallbackPlannerData(examDate: string, subjectList: string, hours: number) {
  const targetSubj = subjectList || "Core Computer Science";
  return [
    {
      dayNumber: 1,
      dateStr: "Day 1 (Foundation Review)",
      focusTitle: "Core Theoretical Principles & Fundamentals",
      tasks: [
        {
          timeSlot: "08:00 AM - 10:00 AM",
          subject: targetSubj,
          topic: "Core Definitions, Invariants & Architecture",
          activityType: "Concept Review & Active Recall",
          estimatedMinutes: 120
        },
        {
          timeSlot: "10:30 AM - 12:30 PM",
          subject: targetSubj,
          topic: "Algorithmic Complexity & Mechanics",
          activityType: "Problem Solving & Code Tracing",
          estimatedMinutes: 120
        },
        {
          timeSlot: "02:00 PM - 04:00 PM",
          subject: targetSubj,
          topic: "High-Yield Professor Highlights & Equations",
          activityType: "Flashcard Revision",
          estimatedMinutes: 120
        }
      ]
    },
    {
      dayNumber: 2,
      dateStr: "Day 2 (Applied Practice)",
      focusTitle: "Past Papers & Diagnostic MCQ Drill",
      tasks: [
        {
          timeSlot: "08:30 AM - 11:00 AM",
          subject: targetSubj,
          topic: "Timed Diagnostic Practice Test",
          activityType: "Mock Exam Simulation",
          estimatedMinutes: 150
        },
        {
          timeSlot: "01:30 PM - 03:30 PM",
          subject: targetSubj,
          topic: "Mistake Analysis & Weak Area Remediation",
          activityType: "Targeted In-Depth Study",
          estimatedMinutes: 120
        },
        {
          timeSlot: "04:00 PM - 05:30 PM",
          subject: targetSubj,
          topic: "Short Questions & Formula Sheet Compilation",
          activityType: "Summary Notes Creation",
          estimatedMinutes: 90
        }
      ]
    },
    {
      dayNumber: 3,
      dateStr: "Day 3 (Final Readiness)",
      focusTitle: "High-Yield Summary & Rapid Memory Pass",
      tasks: [
        {
          timeSlot: "09:00 AM - 11:00 AM",
          subject: targetSubj,
          topic: "Comprehensive Cheat-Sheet & Formula Pass",
          activityType: "Rapid Memory Review",
          estimatedMinutes: 120
        },
        {
          timeSlot: "01:30 PM - 03:30 PM",
          subject: targetSubj,
          topic: "Final Quiz Simulation & Confidence Drill",
          activityType: "Light Self-Assessment",
          estimatedMinutes: 120
        }
      ]
    }
  ];
}

// ----------------------------------------------------
// 5. Learning Resources Search Endpoint
// ----------------------------------------------------
app.post("/api/resources", async (req, res) => {
  const { query, category } = req.body;
  const q = query || "Computer Science & Engineering";
  const cat = category || "All";

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are a Curriculum and Educational Resource Curator.
Recommend 6 top-tier, 100% free educational resources matching the user search or topic:
- Search Topic: ${q}
- Category Preference: ${cat}

Return an array of 6 resource objects.
Categories must be one of: "Documentation", "YouTube", "Practice Websites", "Free Courses".
Provide real, authentic URLs (e.g. developer.mozilla.org, youtube.com, leetcode.com, freecodecamp.org, coursera.org, etc.).
Assign realistic ratings (4.5 to 5.0).`;

    const response = await generateWithFallback(ai, {
      contents: `Find top free learning resources for: "${q}".`,
      config: {
        systemInstruction,
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              level: { type: Type.STRING },
              url: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              authorOrProvider: { type: Type.STRING },
            },
            required: ["id", "title", "category", "description", "tags", "level", "url", "rating", "authorOrProvider"],
          },
        },
      },
    });

    const resources = JSON.parse(response.text || "[]");
    res.json({ resources });
  } catch (error: any) {
    console.warn("Learning Resources Fallback trigger:", error?.message || error);
    res.json({ resources: getFallbackResourcesData(q, cat) });
  }
});

function getFallbackResourcesData(query: string, category: string) {
  return [
    {
      id: "res-1",
      title: `${query} Official Documentation & Specs`,
      category: "Documentation",
      description: "Comprehensive official reference manual, interactive code examples, and API guides.",
      tags: [query, "Documentation", "Official"],
      level: "All Levels",
      url: "https://developer.mozilla.org",
      rating: 4.9,
      authorOrProvider: "MDN / Official Specs"
    },
    {
      id: "res-2",
      title: `FreeCodeCamp: Comprehensive ${query} Crash Course`,
      category: "YouTube",
      description: "Full length video tutorial covering end-to-end concepts, hands-on projects, and practical exercises.",
      tags: [query, "Video Course", "Hands-on"],
      level: "Beginner to Intermediate",
      url: "https://www.youtube.com/@freecodecamp",
      rating: 4.8,
      authorOrProvider: "freeCodeCamp.org"
    },
    {
      id: "res-3",
      title: `LeetCode & Algorithmic Practice for ${query}`,
      category: "Practice Websites",
      description: "Interactive problem-solving platform with hundreds of categorized coding challenges and test cases.",
      tags: [query, "Problem Solving", "Interviews"],
      level: "Intermediate to Advanced",
      url: "https://leetcode.com",
      rating: 4.9,
      authorOrProvider: "LeetCode"
    },
    {
      id: "res-4",
      title: `MIT OpenCourseWare: Computer Science & Engineering`,
      category: "Free Courses",
      description: "Full university lecture series with syllabus, lecture notes, assignments, and exam archives.",
      tags: [query, "MIT", "Academic"],
      level: "Intermediate",
      url: "https://ocw.mit.edu",
      rating: 5.0,
      authorOrProvider: "MIT OCW"
    },
    {
      id: "res-5",
      title: `GeeksforGeeks Core ${query} Reference Guide`,
      category: "Documentation",
      description: "Structured articles, interview question preparation, code snippets, and quick summaries.",
      tags: [query, "Articles", "Interview Prep"],
      level: "All Levels",
      url: "https://www.geeksforGeeks.org",
      rating: 4.7,
      authorOrProvider: "GeeksforGeeks"
    },
    {
      id: "res-6",
      title: `Coursera: University Open Learning Modules`,
      category: "Free Courses",
      description: "Audit top university computer science modules for free with video lectures and readings.",
      tags: [query, "University", "Certifications"],
      level: "All Levels",
      url: "https://www.coursera.org",
      rating: 4.8,
      authorOrProvider: "Coursera Partner Universities"
    }
  ];
}

// ----------------------------------------------------
// Vite Middleware / Static Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduGuide AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

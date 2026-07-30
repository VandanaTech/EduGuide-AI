import {
  LearningPreferences,
  QuizQuestion,
  RoadmapSemester,
  DayStudySchedule,
  LearningResource,
  DashboardStats,
  ActivityItem,
} from '../types';

export const ENGINEERING_SUBJECT_GROUPS = [
  {
    category: 'Programming Languages',
    items: ['Programming in C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'R Programming'],
  },
  {
    category: 'Web Development',
    items: ['HTML', 'CSS', 'React', 'Node.js', 'Express.js'],
  },
  {
    category: 'Databases & Storage',
    items: ['SQL', 'MongoDB', 'DBMS'],
  },
  {
    category: 'Core Computer Science',
    items: [
      'Data Structures',
      'Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Compiler Design',
      'Computer Architecture',
    ],
  },
  {
    category: 'AI & Data Science',
    items: [
      'AI',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Data Science',
    ],
  },
  {
    category: 'Cloud, Security & Emerging Tech',
    items: [
      'Cloud Computing',
      'Cyber Security',
      'Ethical Hacking',
      'IoT',
    ],
  },
];

export const INDIAN_LANGUAGES = [
  'English',
  'Hindi (हिन्दी)',
  'Marathi (मराठी)',
  'Gujarati (ગુજરાતી)',
  'Punjabi (ਪੰਜਾਬੀ)',
  'Bengali (বাংলা)',
  'Tamil (தமிழ்)',
  'Telugu (తెలుగు)',
  'Kannada (કನ್ನಡ)',
  'Malayalam (മലയാളം)',
  'Odia (ଓଡ଼ିଆ)',
  'Assamese (অসমীয়া)',
  'Urdu (اردو)',
  'Sanskrit (संस्कृत)',
];

export const LEARNING_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const BACKGROUND_KNOWLEDGE = ['None', 'Basic', 'Intermediate', 'Strong'] as const;

export const CURRENT_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'] as const;

export const ENGINEERING_BRANCHES = [
  'Computer Science Engineering',
  'Information Technology',
  'Artificial Intelligence & Machine Learning',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
];

export const CAREER_GOALS = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Developer',
  'Frontend Developer',
  'AI Engineer',
  'Machine Learning Engineer',
  'Data Scientist',
  'Data Analyst',
  'Cyber Security Analyst',
  'Cloud Engineer',
  'DevOps Engineer',
  'Android Developer',
  'Research Engineer',
];

export const defaultPreferences: LearningPreferences = {
  subject: 'Data Structures',
  learningLevel: 'Intermediate',
  learningStyle: 'Practical / Hands-on',
  preferredLanguage: 'English',
  backgroundKnowledge: 'Basic',
  currentYear: '3rd Year',
  branch: 'Computer Science Engineering',
  careerGoal: 'Full Stack Developer',
};

export const motivationalQuotes = [
  {
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    sdgTag: "SDG 4: Quality Education",
  },
  {
    quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
    sdgTag: "Lifelong Learning",
  },
  {
    quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
    sdgTag: "Empowered Mindset",
  },
];

// Comprehensive Question Bank per Subject and Difficulty Level
export const subjectDifficultyQuestions: Record<string, Record<'Beginner' | 'Intermediate' | 'Advanced', QuizQuestion[]>> = {
  'Python': {
    'Beginner': [
      {
        id: 101,
        question: 'Which keyword is used to define a function in Python?',
        options: ['def', 'function', 'func', 'define'],
        correctAnswerIndex: 0,
        explanation: 'In Python, functions are defined using the `def` keyword followed by the function name and parentheses.',
        topicTag: 'Python Basics',
      },
      {
        id: 102,
        question: 'What is the output of `type([])` in Python?',
        options: ['<class "tuple">', '<class "list">', '<class "set">', '<class "dict">'],
        correctAnswerIndex: 1,
        explanation: 'Square brackets `[]` create a list in Python, so `type([])` returns `<class "list">`.',
        topicTag: 'Data Types',
      },
      {
        id: 103,
        question: 'Which operator is used for integer floor division in Python?',
        options: ['/', '//', '%', '**'],
        correctAnswerIndex: 1,
        explanation: '`//` calculates floor division, discarding the fractional part.',
        topicTag: 'Operators',
      },
      {
        id: 104,
        question: 'How do you insert comments in Python code?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correctAnswerIndex: 2,
        explanation: 'In Python, single line comments begin with the `#` symbol.',
        topicTag: 'Syntax',
      },
      {
        id: 105,
        question: 'Which built-in Python function returns the length of a string or list?',
        options: ['size()', 'length()', 'len()', 'count()'],
        correctAnswerIndex: 2,
        explanation: '`len()` is the built-in function to get the element count of an iterable in Python.',
        topicTag: 'Built-ins',
      },
    ],
    'Intermediate': [
      {
        id: 111,
        question: 'What is the output of the following snippet?\n`a = [1, 2, 3]`\n`b = a`\n`b.append(4)`\n`print(a)`',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'AttributeError'],
        correctAnswerIndex: 1,
        explanation: 'In Python, lists are mutable objects. `b = a` creates a reference to the same memory address, so mutating `b` updates `a`.',
        topicTag: 'References & Mutability',
      },
      {
        id: 112,
        question: 'What is the result of list comprehension `[x**2 for x in range(5) if x % 2 == 0]`?',
        options: ['[0, 1, 4, 9, 16]', '[0, 4, 16]', '[1, 9]', '[0, 2, 4]'],
        correctAnswerIndex: 1,
        explanation: '`range(5)` evaluates to [0, 1, 2, 3, 4]. Even values are 0, 2, 4. Squares are 0^2 = 0, 2^2 = 4, 4^2 = 16 -> `[0, 4, 16]`.',
        topicTag: 'List Comprehensions',
      },
      {
        id: 113,
        question: 'How does Python handle memory management and unreferenced objects?',
        options: ['Manual malloc/free calls', 'Reference Counting + Generational Garbage Collection', 'RAII destructors only', 'Mark and Sweep on thread exit'],
        correctAnswerIndex: 1,
        explanation: 'Python primarily uses Reference Counting complemented by a Generational Garbage Collector to detect cyclic references.',
        topicTag: 'Memory Management',
      },
      {
        id: 114,
        question: 'What does the `*args` parameter in a Python function signature allow?',
        options: ['Keyword dictionary arguments', 'Variable number of non-keyword positional arguments', 'Global variable overrides', 'Type annotations'],
        correctAnswerIndex: 1,
        explanation: '`*args` collects extra positional arguments into a tuple passed into the function body.',
        topicTag: 'Function Arguments',
      },
      {
        id: 115,
        question: 'What will `print("a,b,c".split(",", 1))` output?',
        options: ["['a', 'b', 'c']", "['a', 'b,c']", "['a,b', 'c']", "['a', 'b']"],
        correctAnswerIndex: 1,
        explanation: 'The second argument to `split()` specifies maxsplit. Setting it to 1 yields a list with max 2 elements: `["a", "b,c"]`.',
        topicTag: 'String Manipulation',
      },
    ],
    'Advanced': [
      {
        id: 121,
        question: 'In Python CPython implementation, what is the Global Interpreter Lock (GIL) and its consequence?',
        options: [
          'Locks file IO operations to single threads',
          'Prevents multiple native C threads from executing Python bytecode in parallel on multiple CPU cores',
          'Enforces static type checking at runtime',
          'Restricts memory usage to 2GB per process'
        ],
        correctAnswerIndex: 1,
        explanation: 'The GIL ensures thread safety by allowing only one CPython thread to execute Python bytecode at a time, limiting pure Python multithreading speedup on multi-core CPUs.',
        topicTag: 'CPython Architecture & Concurrency',
      },
      {
        id: 122,
        question: 'What is the decorator pattern output of `@decorator` wrapping a function without `@functools.wraps`?',
        options: [
          'The function retains its original `__name__` and `__doc__`',
          'The wrapped function takes on the wrapper function’s name and docstring attributes',
          'It throws a SyntaxError at module import',
          'Memory leak occurs'
        ],
        correctAnswerIndex: 1,
        explanation: 'Without `functools.wraps`, metadata like `func.__name__` and `func.__doc__` are overwritten by the inner wrapper function.',
        topicTag: 'Metaprogramming & Decorators',
      },
      {
        id: 123,
        question: 'What happens when a generator function containing `yield` is invoked in Python?',
        options: [
          'It immediately executes all lines up to return',
          'It returns a generator object without executing function body code until `next()` is called',
          'It spawns a background OS thread',
          'It converts return value into a tuple'
        ],
        correctAnswerIndex: 1,
        explanation: 'Calling a generator function instantiates an iterator/generator object; code execution pauses until `next()` or iteration starts.',
        topicTag: 'Generators & Coroutines',
      },
      {
        id: 124,
        question: 'How does Python evaluate `__slots__` declared inside a class definition?',
        options: [
          'It turns class attributes into static C variables',
          'It suppresses creation of `__dict__` for instances, saving memory by reserving fixed descriptor slots',
          'It restricts inheritance to single sub-classes',
          'It automatically serializes objects to JSON'
        ],
        correctAnswerIndex: 1,
        explanation: '`__slots__` explicitly defines instance attributes, avoiding instance `__dict__` overhead and providing noticeable memory savings for millions of small objects.',
        topicTag: 'OOP Internals',
      },
      {
        id: 125,
        question: 'What is the runtime time complexity of Python’s built-in `list.sort()` (Timsort)?',
        options: ['O(N^2) worst case', 'O(N log N) worst case, O(N) best case on nearly sorted data', 'O(N) always', 'O(N^2 log N) worst case'],
        correctAnswerIndex: 1,
        explanation: 'Timsort combines Merge Sort and Insertion Sort algorithms. It takes advantage of existing ordered runs in input data, achieving linear O(N) time for pre-sorted arrays.',
        topicTag: 'Algorithm Efficiency',
      },
    ],
  },
  'Database Management System': {
    'Beginner': [
      {
        id: 201,
        question: 'What does the acronym DBMS stand for?',
        options: ['Database Management System', 'Data Processing Base System', 'Digital Business Management Software', 'Direct Backup Master System'],
        correctAnswerIndex: 0,
        explanation: 'DBMS stands for Database Management System, software designed to store, retrieve, and manage data efficiently.',
        topicTag: 'DBMS Overview',
      },
      {
        id: 202,
        question: 'Which key uniquely identifies each record in a relational database table?',
        options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Composite Key'],
        correctAnswerIndex: 1,
        explanation: 'A Primary Key enforces unique identification and non-null constraints for every row in a table.',
        topicTag: 'Keys',
      },
      {
        id: 203,
        question: 'Which SQL command is used to retrieve data from a database?',
        options: ['FETCH', 'GET', 'SELECT', 'EXTRACT'],
        correctAnswerIndex: 2,
        explanation: 'The `SELECT` statement is the fundamental DQL command used to query records from database tables.',
        topicTag: 'SQL Basics',
      },
      {
        id: 204,
        question: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Array, Column, Index, Data',
          'Authentication, Control, Integrity, Domain',
          'Asynchronous, Concurrent, Isolated, Distributed'
        ],
        correctAnswerIndex: 0,
        explanation: 'ACID properties guarantee reliable transaction processing in database systems.',
        topicTag: 'Transactions',
      },
      {
        id: 205,
        question: 'Which SQL clause is used to filter records based on specified conditions?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswerIndex: 2,
        explanation: 'The `WHERE` clause filters rows before any aggregation is performed.',
        topicTag: 'SQL Queries',
      },
    ],
    'Intermediate': [
      {
        id: 211,
        question: 'In database normalization, what condition must a table satisfy to be in 2nd Normal Form (2NF)?',
        options: [
          'Must be in 1NF and contain no partial dependencies (non-key attributes dependent on part of primary key)',
          'Must eliminate all transitive dependencies',
          'Must eliminate all multivalue dependencies',
          'Must have no foreign keys'
        ],
        correctAnswerIndex: 0,
        explanation: '2NF requires 1NF compliance and that all non-prime attributes fully depend functionally on the whole primary key, eliminating partial dependency.',
        topicTag: 'Normalization',
      },
      {
        id: 212,
        question: 'What is the key functional difference between `WHERE` and `HAVING` clauses in SQL queries?',
        options: [
          'WHERE works on aggregated results; HAVING works on individual rows',
          'WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY',
          'WHERE is DDL; HAVING is DML',
          'There is no difference'
        ],
        correctAnswerIndex: 1,
        explanation: '`WHERE` filters rows prior to `GROUP BY` grouping, whereas `HAVING` filters group summaries created by aggregate functions like `COUNT()` or `AVG()`.',
        topicTag: 'SQL Filtering',
      },
      {
        id: 213,
        question: 'Which SQL join returns all records from the left table and matched records from the right table, filling unmatched right columns with NULLs?',
        options: ['INNER JOIN', 'RIGHT OUTER JOIN', 'LEFT OUTER JOIN', 'FULL OUTER JOIN'],
        correctAnswerIndex: 2,
        explanation: 'LEFT OUTER JOIN preserves every row from the left table regardless of whether a matching key exists in the right table.',
        topicTag: 'SQL Joins',
      },
      {
        id: 214,
        question: 'What is a Phantom Read anomaly in transaction isolation levels?',
        options: [
          'Transaction re-reads data and sees modified values by committed transaction',
          'Transaction queries a range of rows and finds new rows inserted by another committed transaction',
          'Transaction reads uncommitted dirty data',
          'System crash during commit'
        ],
        correctAnswerIndex: 1,
        explanation: 'A Phantom Read occurs when transaction T1 executes a query returning a set of rows matching a condition, and transaction T2 inserts new rows matching that condition before T1 completes.',
        topicTag: 'Transaction Isolation',
      },
      {
        id: 215,
        question: 'How does a B+ Tree index differ from a standard B-Tree index in DBMS storage layout?',
        options: [
          'B+ Trees store data records only in leaf nodes, linking leaves sequentially for fast range scans',
          'B+ Trees store data exclusively in internal root nodes',
          'B+ Trees do not support balance operations',
          'B+ Trees require binary key values'
        ],
        correctAnswerIndex: 0,
        explanation: 'In a B+ Tree, all data records/pointers are strictly at leaf nodes connected via pointers, providing high fan-out and efficient range queries.',
        topicTag: 'Indexing',
      },
    ],
    'Advanced': [
      {
        id: 221,
        question: 'Under Two-Phase Locking (2PL) protocol, what guarantees conflict serializability and avoids cascading rollbacks?',
        options: ['Basic 2PL', 'Strict 2PL (holds all exclusive locks until transaction commit/abort)', 'Rigorous 2PL', 'Conservative 2PL'],
        correctAnswerIndex: 1,
        explanation: 'Strict 2PL prevents dirty reads and cascading aborts by holding all exclusive (write) locks until the transaction completes execution.',
        topicTag: 'Concurrency Control',
      },
      {
        id: 222,
        question: 'Consider a table R(A, B, C, D) with FDs {A -> B, B -> C, C -> D}. What is the highest normal form satisfied by R if candidate key is A?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswerIndex: 0,
        explanation: 'FD B -> C has non-key attribute B determining non-key attribute C, creating a transitive dependency. Thus it violates 3NF and BCNF, satisfying only 1NF/2NF.',
        topicTag: 'Normal Forms & Functional Dependencies',
      },
      {
        id: 223,
        question: 'How does Write-Ahead Logging (WAL) protocol guarantee Atomicity and Durability during system recovery (ARIES algorithm)?',
        options: [
          'Log records describing changes must be flushed to non-volatile storage before corresponding dirty database page is written to disk',
          'Database changes are written to disk directly without logging',
          'Dirty memory blocks are flushed every 1 second continuously',
          'WAL deletes uncommitted rows during boot'
        ],
        correctAnswerIndex: 0,
        explanation: 'WAL mandates that any update log record must reach stable disk before the modified buffer page is flushed, enabling REDO and UNDO passes upon failure recovery.',
        topicTag: 'System Recovery & Logging',
      },
      {
        id: 224,
        question: 'In query optimization, what cost-based strategy converts nested SQL subqueries into hash joins?',
        options: ['Subquery Unnesting / Decorrelation', 'Index Skip Scan', 'Table Scan Fallback', 'Materialized View Refresh'],
        correctAnswerIndex: 0,
        explanation: 'Decorrelation transforms correlated subqueries into relational join operations, enabling relational query optimizers to apply hash join or merge join algorithms.',
        topicTag: 'Query Optimization',
      },
      {
        id: 225,
        question: 'What isolation level prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads completely according to ANSI SQL standard?',
        options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
        correctAnswerIndex: 3,
        explanation: 'Serializable isolation is the highest level, enforcing strict isolation equivalent to serial non-overlapping transaction execution.',
        topicTag: 'SQL Isolation Levels',
      },
    ],
  },
  'Data Structures & Algorithms': {
    'Beginner': [
      {
        id: 301,
        question: 'Which data structure follows the LIFO (Last In, First Out) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswerIndex: 1,
        explanation: 'A Stack operates on Last-In, First-Out order where push and pop occur at the top.',
        topicTag: 'Stacks',
      },
      {
        id: 302,
        question: 'What is the time complexity to access an element by index in a contiguous Array?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctAnswerIndex: 0,
        explanation: 'Arrays store elements in contiguous memory locations, allowing constant time O(1) index offset computation.',
        topicTag: 'Arrays',
      },
      {
        id: 303,
        question: 'In Binary Search, what condition must the input array satisfy?',
        options: ['Must contain only even numbers', 'Must be sorted in ascending or descending order', 'Must be a linked list', 'Must have prime length'],
        correctAnswerIndex: 1,
        explanation: 'Binary Search operates by halving search space; this requires the array elements to be in sorted order.',
        topicTag: 'Searching',
      },
      {
        id: 304,
        question: 'Which traversal of a Binary Search Tree (BST) outputs node values in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswerIndex: 1,
        explanation: 'In-order traversal visits left subtree, current node, and right subtree, which extracts BST values in increasing sorted order.',
        topicTag: 'Trees',
      },
      {
        id: 305,
        question: 'What is the worst-case time complexity of Linear Search on an array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswerIndex: 2,
        explanation: 'In the worst case (element at end or absent), Linear Search checks all N elements sequentially.',
        topicTag: 'Searching',
      },
    ],
    'Intermediate': [
      {
        id: 311,
        question: 'What is the average and worst-case time complexity of Quick Sort algorithm?',
        options: ['O(N log N) average, O(N^2) worst case', 'O(N) average, O(N log N) worst case', 'O(N^2) average, O(N log N) worst case', 'O(log N) average, O(N) worst case'],
        correctAnswerIndex: 0,
        explanation: 'Quick Sort partitioning takes O(N log N) time on average. When pivots pick unbalanced splits (e.g. sorted input with end pivot), it degrades to O(N^2).',
        topicTag: 'Sorting',
      },
      {
        id: 312,
        question: 'How do Floyd’s Cycle-Finding Algorithm (Tortoise and Hare) detect a loop in a Linked List?',
        options: [
          'Using two pointers moving at speed 1 step and 2 steps; if a cycle exists, they collide',
          'Hashing node memory addresses in a hash set',
          'Reversing the linked list twice',
          'Counting list length'
        ],
        correctAnswerIndex: 0,
        explanation: 'Floyd’s algorithm uses slow (1 step) and fast (2 steps) pointers. If a cycle exists, the fast pointer loops around and matches the slow pointer in O(N) time and O(1) space.',
        topicTag: 'Linked Lists',
      },
      {
        id: 313,
        question: 'What data structure is used in Breadth-First Search (BFS) graph traversal?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Disjoint Set'],
        correctAnswerIndex: 1,
        explanation: 'BFS explores neighbors level-by-level, requiring FIFO ordering managed via a Queue.',
        topicTag: 'Graph Algorithms',
      },
      {
        id: 314,
        question: 'What is the space complexity of a recursive solution for Fibonacci numbers without memoization?',
        options: ['O(1)', 'O(N) recursion stack depth', 'O(2^N)', 'O(log N)'],
        correctAnswerIndex: 1,
        explanation: 'The call stack grows linearly up to depth N during recursive calls, taking O(N) auxiliary stack space.',
        topicTag: 'Recursion & Stack',
      },
      {
        id: 315,
        question: 'Dijkstra’s single-source shortest path algorithm fails under which condition?',
        options: ['Directed acyclic graphs', 'Graphs with negative edge weights', 'Unweighted graphs', 'Disconnected components'],
        correctAnswerIndex: 1,
        explanation: 'Dijkstra greedily locks shortest paths. Negative edges invalidate greedy choices because longer paths could reduce overall total distance later.',
        topicTag: 'Shortest Path Algorithms',
      },
    ],
    'Advanced': [
      {
        id: 321,
        question: 'In Dynamic Programming, what is the key difference between 0/1 Knapsack and Fractional Knapsack problem solving paradigms?',
        options: [
          '0/1 Knapsack is solved using Greedy strategy O(N log N); Fractional requires DP O(N*W)',
          '0/1 Knapsack requires DP O(N*W) because items cannot be split; Fractional Knapsack uses Greedy choice based on value-to-weight ratio',
          'Both are NP-Hard requiring Backtracking',
          'Fractional Knapsack uses Divide & Conquer in O(N^3)'
        ],
        correctAnswerIndex: 1,
        explanation: 'Fractional Knapsack exhibits greedy choice property (take item with highest value/weight ratio). 0/1 Knapsack lacks greedy choice and requires dynamic programming state transition DP[i][w].',
        topicTag: 'DP vs Greedy Paradigms',
      },
      {
        id: 322,
        question: 'What is the amortized time complexity of Union and Find operations in Disjoint Set Union (DSU) with Path Compression and Union by Rank?',
        options: ['O(1)', 'O(log N)', 'O(α(N)) Inverse Ackermann function (nearly O(1))', 'O(N)'],
        correctAnswerIndex: 2,
        explanation: 'Combining path compression and rank/size balancing bounds operational complexity to inverse Ackermann function α(N), which is ≤ 4 for any practical value of N.',
        topicTag: 'Advanced Data Structures',
      },
      {
        id: 323,
        question: 'What is the time complexity of building a Max Heap from an unsorted array of N elements using Tarjan/Floyd Heapify algorithm?',
        options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
        correctAnswerIndex: 1,
        explanation: 'Bottom-up heapification satisfies sum S = Σ (N / 2^(h+1)) * O(h) = O(N), achieving linear construction time.',
        topicTag: 'Heaps',
      },
      {
        id: 324,
        question: 'How does Tarjan’s algorithm find Strongly Connected Components (SCCs) in a directed graph in O(V + E) time?',
        options: [
          'Runs two BFS passes with transposed matrix',
          'Uses a single DFS pass tracking discovery time (`disc`) and lowest reachable ancestor (`low`) values alongside a call stack',
          'Executes Bellman-Ford algorithm on every vertex',
          'Calculates topological sort using indegrees'
        ],
        correctAnswerIndex: 1,
        explanation: 'Tarjan maintains DFS discovery timestamps and `low` links to identify root nodes of SCCs in a single pass using an explicit recursion stack.',
        topicTag: 'Advanced Graph Theory',
      },
      {
        id: 325,
        question: 'In string matching, how does Knuth-Morris-Pratt (KMP) algorithm achieve O(N + M) runtime without backtracking text pointer?',
        options: [
          'Uses rolling polynomial hashes',
          'Precomputes Longest Prefix Suffix (LPS) array to skip redundant comparisons when characters mismatch',
          'Converts characters to binary bitmasks',
          'Builds a suffix tree in O(1)'
        ],
        correctAnswerIndex: 1,
        explanation: 'The LPS array informs KMP exactly how many characters in pattern can be reused without re-examining matched text characters upon mismatch.',
        topicTag: 'String Algorithms',
      },
    ],
  },
};

// Generic Fallback Question Generator for ANY subject and ANY difficulty level
export function generateDynamicQuizQuestions(
  subject: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string,
  count: number = 5
): QuizQuestion[] {
  const diffKey = (difficulty === 'Beginner' || difficulty === 'Easy')
    ? 'Beginner'
    : (difficulty === 'Advanced' || difficulty === 'Hard')
    ? 'Advanced'
    : 'Intermediate';

  // Check if explicit hand-crafted questions exist
  if (subjectDifficultyQuestions[subject] && subjectDifficultyQuestions[subject][diffKey as 'Beginner' | 'Intermediate' | 'Advanced']) {
    return subjectDifficultyQuestions[subject][diffKey as 'Beginner' | 'Intermediate' | 'Advanced'].slice(0, count);
  }

  // Otherwise generate high quality dynamic questions tailored specifically to subject & difficulty
  const questions: QuizQuestion[] = [];
  const baseId = Math.floor(Math.random() * 10000) + 100;

  for (let i = 1; i <= count; i++) {
    if (diffKey === 'Beginner') {
      questions.push({
        id: baseId + i,
        question: `[Beginner Level] Which of the following best defines the foundational core concept of ${subject} (Concept #${i})?`,
        options: [
          `Fundamental rule governing syntax, basic data structures, and foundational definitions in ${subject}`,
          `Legacy syntax deprecated in modern standards`,
          `Hardware signal protocol for serial communication`,
          `An unformatted text file storage system`
        ],
        correctAnswerIndex: 0,
        explanation: `In ${subject}, Beginner questions test fundamental definitions, elementary syntax, and basic single-step concepts.`,
        topicTag: `${subject} Fundamentals`,
      });
    } else if (diffKey === 'Intermediate') {
      questions.push({
        id: baseId + i,
        question: `[Intermediate Level - College Exam/Code] Consider a operational module in ${subject}. How should a developer optimize execution and handle dry run for scenario #${i}?`,
        options: [
          `Apply indexing/caching structures, analyze time complexity, and eliminate redundant computations`,
          `Increase poll frequency without backoff bounds`,
          `Use nested global loops across processing threads`,
          `Disable memory cleanup handlers`
        ],
        correctAnswerIndex: 0,
        explanation: `Intermediate level questions in ${subject} test college-level problem solving, code tracing, algorithm trade-offs, and practical application logic.`,
        topicTag: `${subject} Applied Logic`,
      });
    } else {
      questions.push({
        id: baseId + i,
        question: `[Advanced Level - GATE/Interview Scenario] In a high-throughput enterprise or GATE-level system scenario involving ${subject}, what architecture best prevents bottlenecks?`,
        options: [
          `Implement a distributed fault-tolerant design with optimal time-space complexity and concurrency control`,
          `Rely on single-threaded blocking synchronous REST calls`,
          `Hardcode static parameters in local memory buffers`,
          `Disable validation checks to speed up throughput`
        ],
        correctAnswerIndex: 0,
        explanation: `Advanced engineering questions for ${subject} test GATE/interview level scenarios, complex algorithmic optimization, and system failure mode resolution.`,
        topicTag: `${subject} Advanced System`,
      });
    }
  }

  return questions;
}

export function getQuizQuestions(
  subject: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string,
  count: number = 5
): QuizQuestion[] {
  return generateDynamicQuizQuestions(subject, difficulty, count);
}

export const sampleRoadmaps: Record<string, RoadmapSemester[]> = {
  'Full Stack Developer': [
    {
      semester: 'Semester 5 (Fall)',
      phaseTitle: 'Core Web Foundations & DSA Mastery',
      focusArea: 'Frontend Fundamentals, Git, & Complexity Analysis',
      milestones: [
        {
          title: 'Advanced JavaScript & TypeScript',
          duration: '4 Weeks',
          skills: ['ES6+', 'TypeScript Generics', 'Async/Await', 'DOM Optimization'],
          recommendedProjects: ['Interactive Task Kanban Board', 'Weather Dashboard with API'],
          resources: ['MDN Web Docs', 'ExecuteProgram TypeScript'],
          status: 'Completed',
          keyObjectives: [
            'Master closures, prototypes, and promises',
            'Enforce strong types in frontend components',
          ],
        },
        {
          title: 'LeetCode DSA Grind (Mediums)',
          duration: '6 Weeks',
          skills: ['Two Pointers', 'Sliding Window', 'Trees & Graphs', 'Dynamic Programming'],
          recommendedProjects: ['Custom Data Structure Visualizer'],
          resources: ['NeetCode 150', 'Striver SDE Sheet'],
          status: 'In Progress',
          keyObjectives: [
            'Solve 100+ LeetCode Medium problems',
            'Internalize time and space complexity trade-offs',
          ],
        },
      ],
    },
    {
      semester: 'Semester 6 (Spring)',
      phaseTitle: 'Full-Stack Architecture & Cloud Services',
      focusArea: 'React, Node.js/Express, PostgreSQL, and System Architecture',
      milestones: [
        {
          title: 'Backend REST & GraphQL APIs',
          duration: '5 Weeks',
          skills: ['Node.js', 'Express', 'PostgreSQL / Prisma', 'JWT Auth', 'Docker Basics'],
          recommendedProjects: ['E-Commerce Backend with Payment Gateways', 'Real-time Chat App'],
          resources: ['Full Stack Open (University of Helsinki)', 'Postgres Official Tutorial'],
          status: 'Upcoming',
          keyObjectives: [
            'Build resilient authenticated REST endpoints',
            'Design scalable relational database schemas',
          ],
        },
        {
          title: 'System Design & Distributed Systems',
          duration: '4 Weeks',
          skills: ['Caching (Redis)', 'Message Queues', 'Load Balancing', 'Microservices'],
          recommendedProjects: ['URL Shortener with Cache Layer', 'Distributed File Vault'],
          resources: ['System Design Primer (GitHub)', 'ByteByteGo'],
          status: 'Upcoming',
          keyObjectives: [
            'Understand CAP theorem and horizontal scaling',
            'Architect high-throughput, low-latency applications',
          ],
        },
      ],
    },
  ],
};

export const sampleStudySchedules: DayStudySchedule[] = [
  {
    dayNumber: 1,
    dateStr: 'Monday',
    focusTitle: 'Data Structures & Algorithmic Foundations',
    tasks: [
      {
        timeSlot: '08:00 AM - 09:30 AM',
        subject: 'Data Structures & Algorithms',
        topic: 'Graph Traversal (BFS & DFS Deep Dive)',
        activityType: 'Concept Reading',
        estimatedMinutes: 90,
        completed: true,
      },
      {
        timeSlot: '10:00 AM - 11:30 AM',
        subject: 'Data Structures & Algorithms',
        topic: 'Solve 3 LeetCode Mediums on Graph Cycles',
        activityType: 'Problem Solving',
        estimatedMinutes: 90,
        completed: true,
      },
      {
        timeSlot: '02:00 PM - 03:30 PM',
        subject: 'Database Management System',
        topic: 'Indexing Mechanics (B+ Trees vs Hash Indexing)',
        activityType: 'Concept Reading',
        estimatedMinutes: 90,
        completed: false,
      },
      {
        timeSlot: '04:00 PM - 05:00 PM',
        subject: 'Operating Systems',
        topic: 'Process Scheduling & Semaphore Deadlock Flashcards',
        activityType: 'Revision & Flashcards',
        estimatedMinutes: 60,
        completed: false,
      },
    ],
  },
  {
    dayNumber: 2,
    dateStr: 'Tuesday',
    focusTitle: 'Core Engineering & System Design',
    tasks: [
      {
        timeSlot: '08:30 AM - 10:00 AM',
        subject: 'Computer Networks',
        topic: 'TCP/IP 3-Way Handshake & Congestion Control',
        activityType: 'Concept Reading',
        estimatedMinutes: 90,
        completed: false,
      },
      {
        timeSlot: '10:30 AM - 12:00 PM',
        subject: 'System Design',
        topic: 'Consistent Hashing & Distributed Cache Design',
        activityType: 'Project Work',
        estimatedMinutes: 90,
        completed: false,
      },
      {
        timeSlot: '02:30 PM - 04:00 PM',
        subject: 'Full Stack Development',
        topic: 'Build Auth Middleware with JWT & Cookies',
        activityType: 'Project Work',
        estimatedMinutes: 90,
        completed: false,
      },
    ],
  },
];

export const sampleSchedules = sampleStudySchedules;

export const sampleResources: LearningResource[] = [
  {
    id: 'res-1',
    title: 'NeetCode 150 - Curated Algorithm Roadmap',
    category: 'Practice Websites',
    description: 'Structured problem sets covering all core DSA patterns with clear video solutions.',
    tags: ['DSA', 'LeetCode', 'Interview Prep'],
    level: 'All Levels',
    url: 'https://neetcode.io',
    rating: 4.9,
    authorOrProvider: 'NeetCode',
  },
  {
    id: 'res-2',
    title: 'MIT 6.006 Introduction to Algorithms',
    category: 'Free Courses',
    description: 'Comprehensive open courseware lectures on algorithm design, dynamic programming, and graphs.',
    tags: ['MIT OCW', 'Algorithms', 'Theoretical'],
    level: 'Intermediate',
    url: 'https://ocw.mit.edu',
    rating: 4.8,
    authorOrProvider: 'MIT OpenCourseWare',
  },
  {
    id: 'res-3',
    title: 'Full Stack Open - University of Helsinki',
    category: 'Free Courses',
    description: 'Deep-dive modern web development course covering React, Redux, Node.js, GraphQL, and TypeScript.',
    tags: ['React', 'Node.js', 'TypeScript', 'Web Dev'],
    level: 'Intermediate',
    url: 'https://fullstackopen.com/en/',
    rating: 4.9,
    authorOrProvider: 'University of Helsinki',
  },
  {
    id: 'res-4',
    title: 'System Design Primer',
    category: 'Documentation',
    description: 'Open-source repository explaining how to design large-scale systems for scalability.',
    tags: ['System Design', 'Architecture', 'Cloud'],
    level: 'Advanced',
    url: 'https://github.com/donnemartin/system-design-primer',
    rating: 4.9,
    authorOrProvider: 'Donne Martin',
  },
];

export const sampleLearningResources: LearningResource[] = [
  // React
  {
    id: 'res-react-1',
    title: 'React Official Documentation (react.dev)',
    category: 'Documentation',
    description: 'The new, interactive official documentation for React. Learn component architecture, state management, and hooks.',
    tags: ['React', 'Frontend', 'Official', 'Web Dev'],
    level: 'All Levels',
    url: 'https://react.dev',
    rating: 5.0,
    authorOrProvider: 'React Core Team',
    isOfficial: true,
    subject: 'React',
  },
  {
    id: 'res-react-2',
    title: 'React GitHub Repository',
    category: 'GitHub Repositories',
    description: 'Official open-source source code repository for React core library maintained by Meta and community.',
    tags: ['React', 'GitHub', 'Open Source', 'Meta'],
    level: 'Advanced',
    url: 'https://github.com/facebook/react',
    rating: 4.9,
    authorOrProvider: 'Facebook / Meta',
    isOfficial: true,
    subject: 'React',
  },
  {
    id: 'res-react-3',
    title: 'CodeWithHarry - React JS Masterclass',
    category: 'YouTube',
    description: 'Popular Hindi/English project-based React tutorial series covering React Router, Redux Toolkit, and APIs.',
    tags: ['CodeWithHarry', 'React', 'Hindi', 'Projects'],
    level: 'Beginner',
    url: 'https://www.youtube.com/@CodeWithHarry',
    rating: 4.8,
    authorOrProvider: 'CodeWithHarry',
    subject: 'React',
  },
  {
    id: 'res-react-4',
    title: 'Apna College - React JS One Shot Course',
    category: 'YouTube',
    description: 'Comprehensive single video course mastering React components, props, hooks, and project building.',
    tags: ['Apna College', 'React', 'Hindi', 'One Shot'],
    level: 'Beginner',
    url: 'https://www.youtube.com/@ApnaCollegeOfficial',
    rating: 4.9,
    authorOrProvider: 'Shradha Khapra / Apna College',
    subject: 'React',
  },
  {
    id: 'res-react-5',
    title: 'Hitesh Choudhary - React Series (Chai aur React)',
    category: 'YouTube',
    description: 'Deep-dive conceptual breakdown of Fiber architecture, reconciliation, and modern hooks in React.',
    tags: ['Chai aur React', 'Hitesh Choudhary', 'Frontend'],
    level: 'Intermediate',
    url: 'https://www.youtube.com/@HiteshChoudharydotcom',
    rating: 4.9,
    authorOrProvider: 'Hitesh Choudhary',
    subject: 'React',
  },
  {
    id: 'res-react-6',
    title: 'freeCodeCamp - React Full Course 2026',
    category: 'Free Courses',
    description: 'Hands-on free certification course teaching React fundamentals, context API, and full stack integration.',
    tags: ['freeCodeCamp', 'React', 'Certification'],
    level: 'Beginner',
    url: 'https://www.freecodecamp.org/news/tag/react/',
    rating: 4.8,
    authorOrProvider: 'freeCodeCamp',
    subject: 'React',
  },
  {
    id: 'res-react-7',
    title: 'Scrimba - Learn React Interactively',
    category: 'Practice Websites',
    description: 'Interactive code-along platform where you can pause video lectures and edit code directly in the browser.',
    tags: ['Scrimba', 'Interactive', 'React'],
    level: 'Beginner',
    url: 'https://scrimba.com/learn/learnreact',
    rating: 4.9,
    authorOrProvider: 'Scrimba',
    subject: 'React',
  },
  {
    id: 'res-react-8',
    title: 'React Developer Roadmap (roadmap.sh)',
    category: 'Roadmaps',
    description: 'Step-by-step visual roadmap for mastering React in 2026, from ecosystem tools to SSR and Next.js.',
    tags: ['Roadmap', 'React', 'Career Guide'],
    level: 'All Levels',
    url: 'https://roadmap.sh/react',
    rating: 5.0,
    authorOrProvider: 'roadmap.sh',
    isOfficial: true,
    subject: 'React',
  },

  // DSA & Algorithms
  {
    id: 'res-dsa-1',
    title: 'LeetCode Problem Solving Platform',
    category: 'Practice Websites',
    description: 'Industry standard technical interview preparation platform with thousands of DSA coding challenges.',
    tags: ['LeetCode', 'DSA', 'Coding', 'Interviews'],
    level: 'All Levels',
    url: 'https://leetcode.com',
    rating: 4.9,
    authorOrProvider: 'LeetCode',
    subject: 'Data Structures',
  },
  {
    id: 'res-dsa-2',
    title: 'GeeksforGeeks DSA Portal',
    category: 'Documentation',
    description: 'Exhaustive repository of articles, explanations, and code implementations for all algorithms in C++, Java, and Python.',
    tags: ['GeeksforGeeks', 'DSA', 'Tutorials'],
    level: 'All Levels',
    url: 'https://www.geeksforgeeks.org/data-structures/',
    rating: 4.7,
    authorOrProvider: 'GeeksforGeeks',
    isOfficial: true,
    subject: 'Data Structures',
  },
  {
    id: 'res-dsa-3',
    title: 'NeetCode 150 - Curated Algorithm Roadmap',
    category: 'Practice Websites',
    description: 'Structured problem set covering core DSA pattern types with detailed video explanations.',
    tags: ['NeetCode', 'LeetCode', 'Pattern Based'],
    level: 'Intermediate',
    url: 'https://neetcode.io',
    rating: 4.9,
    authorOrProvider: 'NeetCode',
    subject: 'Algorithms',
  },
  {
    id: 'res-dsa-4',
    title: 'take U forward (Striver SDE Sheet)',
    category: 'YouTube',
    description: 'World-renowned DSA course and SDE Sheet by Raj Vikramaditya (Striver) preparing students for FAANG/Big Tech.',
    tags: ['Striver', 'takeUforward', 'SDE Sheet'],
    level: 'Intermediate',
    url: 'https://takeuforward.org',
    rating: 5.0,
    authorOrProvider: 'Raj Vikramaditya (Striver)',
    subject: 'Data Structures',
  },
  {
    id: 'res-dsa-5',
    title: 'Love Babbar - Supreme DSA Course',
    category: 'YouTube',
    description: 'Complete Hindi C++ & DSA playlist from basics to graph theory and dynamic programming.',
    tags: ['Love Babbar', 'CodeHelp', 'C++ DSA'],
    level: 'Beginner',
    url: 'https://www.youtube.com/@CodeHelp-by-Babbar',
    rating: 4.9,
    authorOrProvider: 'Love Babbar',
    subject: 'Data Structures',
  },
  {
    id: 'res-dsa-6',
    title: 'Abdul Bari - Algorithms Video Lectures',
    category: 'YouTube',
    description: 'Legendary visual chalkboard lectures breaking down time complexity, greedy algorithms, DP, and NP-hardness.',
    tags: ['Abdul Bari', 'Algorithms', 'Core CS'],
    level: 'Intermediate',
    url: 'https://www.youtube.com/@abdul_bari',
    rating: 5.0,
    authorOrProvider: 'Abdul Bari',
    subject: 'Algorithms',
  },
  {
    id: 'res-dsa-7',
    title: 'Introduction to Algorithms (CLRS)',
    category: 'Reference Books',
    description: 'The definitive gold standard MIT textbook covering algorithmic rigor, recurrences, dynamic programming, and graphs.',
    tags: ['CLRS', 'MIT Press', 'Textbook'],
    level: 'Advanced',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    rating: 4.8,
    authorOrProvider: 'Cormen, Leiserson, Rivest, Stein',
    subject: 'Algorithms',
  },

  // Python
  {
    id: 'res-py-1',
    title: 'Python 3 Official Documentation',
    category: 'Documentation',
    description: 'Complete standard library reference, language tutorial, and API docs for Python 3.12+.',
    tags: ['Python', 'Official Docs', 'Language Reference'],
    level: 'All Levels',
    url: 'https://docs.python.org/3/',
    rating: 5.0,
    authorOrProvider: 'Python Software Foundation',
    isOfficial: true,
    subject: 'Python',
  },
  {
    id: 'res-py-2',
    title: 'CPython GitHub Repository',
    category: 'GitHub Repositories',
    description: 'Official C implementation of the Python programming language interpreter.',
    tags: ['CPython', 'GitHub', 'Open Source'],
    level: 'Advanced',
    url: 'https://github.com/python/cpython',
    rating: 4.9,
    authorOrProvider: 'Python Software Foundation',
    isOfficial: true,
    subject: 'Python',
  },
  {
    id: 'res-py-3',
    title: 'Corey Schafer - Python Tutorials',
    category: 'YouTube',
    description: 'In-depth Python video tutorials covering OOP, decorators, context managers, and Django/Flask.',
    tags: ['Corey Schafer', 'Python', 'Backend'],
    level: 'Beginner',
    url: 'https://www.youtube.com/@coreyms',
    rating: 4.9,
    authorOrProvider: 'Corey Schafer',
    subject: 'Python',
  },
  {
    id: 'res-py-4',
    title: 'Automate the Boring Stuff with Python',
    category: 'Reference Books',
    description: 'Practical beginner guide to writing Python scripts for web scraping, file manipulation, and automation.',
    tags: ['Book', 'Automation', 'Practical'],
    level: 'Beginner',
    url: 'https://automatetheboringstuff.com',
    rating: 4.9,
    authorOrProvider: 'Al Sweigart',
    subject: 'Python',
  },

  // C++ & C
  {
    id: 'res-cpp-1',
    title: 'cppreference.com - C & C++ Standard Reference',
    category: 'Documentation',
    description: 'The premier, up-to-date documentation for modern C++20/C++23 standard template library (STL) and features.',
    tags: ['C++', 'STL', 'Reference'],
    level: 'All Levels',
    url: 'https://en.cppreference.com',
    rating: 5.0,
    authorOrProvider: 'cppreference Community',
    isOfficial: true,
    subject: 'C++',
  },
  {
    id: 'res-c-1',
    title: 'Learn C Programming - GeeksforGeeks',
    category: 'Documentation',
    description: 'Comprehensive beginner tutorial covering pointers, memory allocation (malloc/free), structs, and file IO.',
    tags: ['C', 'Pointers', 'System Programming'],
    level: 'Beginner',
    url: 'https://www.geeksforgeeks.org/c-programming-language/',
    rating: 4.7,
    authorOrProvider: 'GeeksforGeeks',
    isOfficial: true,
    subject: 'Programming in C',
  },

  // Java
  {
    id: 'res-java-1',
    title: 'Oracle Java Official Documentation',
    category: 'Documentation',
    description: 'Official Java SE API specification and language guides maintained by Oracle.',
    tags: ['Java', 'Oracle', 'OOP'],
    level: 'All Levels',
    url: 'https://docs.oracle.com/en/java/',
    rating: 4.8,
    authorOrProvider: 'Oracle',
    isOfficial: true,
    subject: 'Java',
  },

  // Web Dev & TS & Node & SQL & Databases
  {
    id: 'res-web-1',
    title: 'MDN Web Docs (Mozilla Developer Network)',
    category: 'Documentation',
    description: 'The ultimate web technology reference for HTML5, CSS3, JavaScript ES6+, and Web APIs.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Docs'],
    level: 'All Levels',
    url: 'https://developer.mozilla.org',
    rating: 5.0,
    authorOrProvider: 'Mozilla & Community',
    isOfficial: true,
    subject: 'JavaScript',
  },
  {
    id: 'res-ts-1',
    title: 'TypeScript Official Handbook',
    category: 'Documentation',
    description: 'Official guide to typed JavaScript at scale, generics, interface declaration, and compiler config.',
    tags: ['TypeScript', 'Types', 'Official'],
    level: 'Intermediate',
    url: 'https://www.typescriptlang.org/docs/',
    rating: 4.9,
    authorOrProvider: 'Microsoft',
    isOfficial: true,
    subject: 'TypeScript',
  },
  {
    id: 'res-sql-1',
    title: 'SQLZoo Interactive SQL Tutorial',
    category: 'Practice Websites',
    description: 'Interactive online SQL query runner with quizzes for SELECT, GROUP BY, JOINs, and subqueries.',
    tags: ['SQL', 'Interactive', 'Databases'],
    level: 'Beginner',
    url: 'https://sqlzoo.net',
    rating: 4.8,
    authorOrProvider: 'SQLZoo',
    subject: 'SQL',
  },
  {
    id: 'res-db-1',
    title: 'PostgreSQL Official Documentation',
    category: 'Documentation',
    description: 'Official manuals and tutorials for PostgreSQL relational database management system.',
    tags: ['PostgreSQL', 'DBMS', 'ACID'],
    level: 'Intermediate',
    url: 'https://www.postgresql.org/docs/',
    rating: 4.9,
    authorOrProvider: 'PostgreSQL Global Development Group',
    isOfficial: true,
    subject: 'DBMS',
  },
  {
    id: 'res-mongo-1',
    title: 'MongoDB University',
    category: 'Free Courses',
    description: 'Free official courses on NoSQL document database design, indexing, and aggregation pipelines.',
    tags: ['MongoDB', 'NoSQL', 'Database'],
    level: 'Beginner',
    url: 'https://learn.mongodb.com',
    rating: 4.9,
    authorOrProvider: 'MongoDB Inc.',
    isOfficial: true,
    subject: 'MongoDB',
  },

  // OS & Networks & Security
  {
    id: 'res-os-1',
    title: 'Operating Systems: Three Easy Pieces (OSTEP)',
    category: 'Reference Books',
    description: 'Free online textbook breaking down virtualization, concurrency, and persistence in operating systems.',
    tags: ['OSTEP', 'OS', 'Textbook'],
    level: 'Intermediate',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    rating: 5.0,
    authorOrProvider: 'Remzi & Andrea Arpaci-Dusseau',
    subject: 'Operating Systems',
  },
  {
    id: 'res-net-1',
    title: 'Computer Networking - Stanford CS144',
    category: 'Free Courses',
    description: 'Stanford University open courseware teaching TCP/IP protocols, routing, and network socket programming.',
    tags: ['Networks', 'Stanford', 'TCP/IP'],
    level: 'Intermediate',
    url: 'https://cs144.github.io/',
    rating: 4.9,
    authorOrProvider: 'Stanford University',
    subject: 'Computer Networks',
  },
  {
    id: 'res-sec-1',
    title: 'PortSwigger Web Security Academy',
    category: 'Practice Websites',
    description: 'Free online cybersecurity training labs covering SQL injection, XSS, CSRF, and authentication bypasses.',
    tags: ['Cyber Security', 'PortSwigger', 'Ethical Hacking'],
    level: 'Intermediate',
    url: 'https://portswigger.net/web-security',
    rating: 5.0,
    authorOrProvider: 'PortSwigger',
    subject: 'Cyber Security',
  },
];

export const sampleSmartRecommendations = [
  {
    id: 'sr-1',
    category: 'Skills' as const,
    title: 'System Design & Distributed Architecture',
    subtitle: 'Crucial for 3rd Year Placement & SDE Roles',
    description: 'Master microservices, load balancing, caching strategies, and database partitioning.',
    tags: ['High Priority', 'Placement Ready'],
    difficulty: 'Advanced',
    actionUrl: 'https://github.com/donnemartin/system-design-primer',
  },
  {
    id: 'sr-2',
    category: 'Projects' as const,
    title: 'Distributed In-Memory Key-Value Cache Engine',
    subtitle: 'High-Impact Portfolio Capstone Project',
    description: 'Build a Go/C++ Redis-like server supporting TCP networking, LRU eviction, and WAL persistence.',
    tags: ['Backend', 'Capstone Tier'],
    difficulty: 'Hard',
  },
  {
    id: 'sr-3',
    category: 'Courses' as const,
    title: 'Stanford CS144 - Introduction to Computer Networking',
    subtitle: 'Top Academic Foundation Course',
    description: 'Implement a full TCP router protocol stack from scratch with socket programming.',
    tags: ['Free Stanford', 'Networks'],
    difficulty: 'Intermediate',
    actionUrl: 'https://cs144.github.io/',
  },
  {
    id: 'sr-4',
    category: 'Certifications' as const,
    title: 'AWS Certified Solutions Architect – Associate',
    subtitle: 'Global Cloud Validation',
    description: 'Validates ability to design secure, scalable, and resilient cloud architectures on Amazon Web Services.',
    tags: ['Industry Gold', 'Cloud'],
    difficulty: 'Intermediate',
    actionUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  },
  {
    id: 'sr-5',
    category: 'Internships' as const,
    title: 'Software Engineering Internship 2026/2027',
    subtitle: 'Target Big Tech & AI Startups',
    description: 'Apply early with a clean algorithmic portfolio, polished GitHub, and 2 production full-stack projects.',
    tags: ['SDE-1', 'High Stipend'],
    difficulty: 'Competitive',
  },
  {
    id: 'sr-6',
    category: 'Hackathons' as const,
    title: 'Google AI Hackathon & CalHacks 2026',
    subtitle: 'Global Innovation Competition',
    description: 'Build SDG 4 AI education tools or agentic workflows within 48 hours for global prize funding.',
    tags: ['AI/ML', 'Global Stage'],
    difficulty: 'All Levels',
  },
  {
    id: 'sr-7',
    category: 'Books' as const,
    title: 'Grokking Algorithms - An Illustrated Guide',
    subtitle: 'Intuitive Visual Learning',
    description: 'Perfect for mastering graph traversal, dynamic programming, and greedy heuristics.',
    tags: ['Visual Learning', 'DSA'],
    difficulty: 'Beginner to Intermediate',
  },
  {
    id: 'sr-8',
    category: 'Research Papers' as const,
    title: 'Attention Is All You Need (Vaswani et al.)',
    subtitle: 'Foundational AI Transformer Paper',
    description: 'The revolutionary Google research paper introducing self-attention architectures behind modern LLMs.',
    tags: ['AI Milestone', 'GenAI'],
    difficulty: 'Advanced',
    actionUrl: 'https://arxiv.org/abs/1706.03762',
  },
];

export const sampleStats: DashboardStats = {
  overallProgressPercentage: 78,
  quizzesTaken: 16,
  averageQuizScore: 88,
  studyStreakDays: 14,
  hoursStudiedThisWeek: 22.5,
  coursesCompleted: 5,
  dailyGoalHours: 2.5,
  todayStudyTimeMinutes: 105,
  recommendedNextTopic: 'Dynamic Programming & Graph Algorithms',
  completedSubjectsCount: 4,
};

export const sampleActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Completed DBMS Normalization Quiz',
    type: 'Quiz',
    timestamp: '2 hours ago',
    status: 'Score: 100% (5/5)',
  },
  {
    id: 'act-2',
    title: 'Asked AI Tutor: QuickSort vs MergeSort in C++',
    type: 'Tutor',
    timestamp: '5 hours ago',
    status: 'Detailed Explanation & Code Generated',
  },
  {
    id: 'act-3',
    title: 'Updated Career Roadmap: Full Stack Developer',
    type: 'Roadmap',
    timestamp: 'Yesterday',
    status: 'Semester 5 Milestones Active',
  },
  {
    id: 'act-4',
    title: 'Finished 90-min Study Task: Graph Traversal BFS',
    type: 'Planner',
    timestamp: '2 days ago',
    status: 'Completed',
  },
];

export const initialDashboardStats = sampleStats;
export const sampleRecentActivities = sampleActivities;
export const sampleQuizPool = subjectDifficultyQuestions;

export const sampleBadges = [
  { id: 'b1', name: '14-Day Streak Master', icon: '🔥', description: 'Maintained active learning for 14 consecutive days', unlocked: true },
  { id: 'b2', name: 'DSA Explorer', icon: '⚡', description: 'Solved over 10 Data Structure challenges', unlocked: true },
  { id: 'b3', name: 'Quiz Titan', icon: '🏆', description: 'Achieved 100% score on a Hard level quiz', unlocked: true },
  { id: 'b4', name: 'Roadmap Builder', icon: '🗺️', description: 'Synthesized custom career semester plan', unlocked: true },
  { id: 'b5', name: 'Night Owl Scholar', icon: '🦉', description: 'Completed late-night active recall session', unlocked: false },
];

export const sampleQuizHistory = [
  { id: 'qh-1', subject: 'Data Structures & Algorithms', date: 'Jul 29, 2026 • 02:45 PM', score: '5/5', total: 5, percentage: 100, difficulty: 'Medium' },
  { id: 'qh-2', subject: 'Operating Systems (Threads)', date: 'Jul 28, 2026 • 11:30 AM', score: '4/5', total: 5, percentage: 80, difficulty: 'Hard' },
  { id: 'qh-3', subject: 'DBMS & SQL Queries', date: 'Jul 26, 2026 • 04:15 PM', score: '5/5', total: 5, percentage: 100, difficulty: 'Beginner' },
  { id: 'qh-4', subject: 'System Architecture & Design', date: 'Jul 25, 2026 • 09:20 AM', score: '3/5', total: 5, percentage: 60, difficulty: 'Hard' },
  { id: 'qh-5', subject: 'Computer Networks (TCP/IP)', date: 'Jul 23, 2026 • 06:10 PM', score: '4/5', total: 5, percentage: 80, difficulty: 'Intermediate' },
];

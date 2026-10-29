// 15 Practical Projects with Complete Instructions & Starter Code
// 5 Beginner, 5 Intermediate, 5 Advanced

export const projectsLibrary = [
  // 5 BEGINNER PROJECTS
  {
    id: 'proj_01',
    tier: 'Beginner',
    title: 'Personal Developer Portfolio',
    description: 'Build a sleek, dark-themed personal portfolio showcasing your bio, tech stack skills, and social links.',
    difficulty: 'Easy',
    skills: ['HTML5 Semantic Tags', 'CSS3 Flexbox', 'Responsive Design'],
    learningObjectives: [
      'Structure clean layout using <header>, <main>, <section>, and <footer>',
      'Create reusable responsive card grids for projects and skills',
      'Implement smooth scroll and interactive hover transitions'
    ],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dark Coder • Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="hero">
    <div class="badge">Available for Work 🚀</div>
    <h1>Hi, I'm <span class="highlight">Dark Coder</span></h1>
    <p>Full-Stack Developer building modern, high-performance web applications.</p>
    <div class="actions">
      <a href="#projects" class="btn primary">View Projects</a>
      <a href="#contact" class="btn secondary">Get in Touch</a>
    </div>
  </header>

  <section id="skills" class="section">
    <h2>Tech Stack</h2>
    <div class="skill-grid">
      <span class="skill-pill">HTML5</span>
      <span class="skill-pill">CSS3 / Tailwind</span>
      <span class="skill-pill">JavaScript ES6+</span>
      <span class="skill-pill">React.js</span>
      <span class="skill-pill">Node.js</span>
    </div>
  </section>
</body>
</html>`,
      css: `body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #080B16;
  color: #F8FAFC;
  text-align: center;
  padding: 40px 20px;
}
.hero { max-width: 600px; margin: 0 auto; }
.badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #22C55E;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: bold;
}
h1 { font-size: 2.5rem; margin: 16px 0 8px; }
.highlight {
  background: linear-gradient(to right, #8B5CF6, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p { color: #94A3B8; font-size: 1.1rem; line-height: 1.6; }
.actions { margin-top: 24px; display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: transform 0.2s;
}
.btn.primary { background: #8B5CF6; color: white; }
.btn.secondary { background: #11182A; color: #F8FAFC; border: 1px solid #1E293B; }
.btn:hover { transform: translateY(-2px); }
.section { margin-top: 60px; }
.skill-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 16px; }
.skill-pill {
  background: #11182A;
  border: 1px solid #1E293B;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
}`,
      js: `// Interactive greeting
console.log('Portfolio initialized successfully with Dark Coder Theme.');`
    }
  },
  {
    id: 'proj_02',
    tier: 'Beginner',
    title: 'Interactive Calculator',
    description: 'Create a fully functional digital calculator with clear screen, number inputs, operations, and equals logic.',
    difficulty: 'Easy',
    skills: ['DOM Manipulation', 'Event Listeners', 'Control Flow'],
    learningObjectives: ['Manage calculator state in JavaScript', 'Handle button clicks dynamically', 'Prevent invalid calculations']
  },
  {
    id: 'proj_03',
    tier: 'Beginner',
    title: 'Digital Cyber Clock',
    description: 'Build a live digital clock with real-time hours, minutes, seconds, AM/PM, and date indicators using setInterval().',
    difficulty: 'Easy',
    skills: ['JavaScript Date Object', 'setInterval', 'CSS Neon Styling'],
    learningObjectives: ['Format time strings with leading zeros', 'Run continuous background timers', 'Apply glowing cyber typography']
  },
  {
    id: 'proj_04',
    tier: 'Beginner',
    title: 'Productive Todo List',
    description: 'A task manager with add, delete, toggle completion, and localStorage persistence.',
    difficulty: 'Easy-Medium',
    skills: ['CRUD Operations', 'Browser LocalStorage', 'Array Filtering'],
    learningObjectives: ['Render list elements dynamically', 'Synchronize task array to localStorage', 'Filter active vs completed tasks']
  },
  {
    id: 'proj_05',
    tier: 'Beginner',
    title: 'Modern SaaS Landing Page',
    description: 'A responsive landing page with sticky navigation, feature grid, testimonials, pricing table, and call to action.',
    difficulty: 'Medium',
    skills: ['CSS Grid', 'Flexbox', 'Responsive Breakpoints'],
    learningObjectives: ['Design high-converting landing pages', 'Build responsive pricing cards', 'Implement mobile hamburger drawer']
  },

  // 5 INTERMEDIATE PROJECTS
  {
    id: 'proj_06',
    tier: 'Intermediate',
    title: 'Interactive Quiz Application',
    description: 'Multi-step quiz application with countdown timer, score tallying, category selection, and detailed review page.',
    difficulty: 'Medium',
    skills: ['State Machines', 'Timers', 'JSON Data Structures'],
    learningObjectives: ['Structure question bank schema', 'Implement countdown timer per question', 'Calculate performance percentages']
  },
  {
    id: 'proj_07',
    tier: 'Intermediate',
    title: 'Live Weather Dashboard',
    description: 'Fetch real-time weather information, 5-day forecast, temperature, humidity, and wind speed from a public weather API.',
    difficulty: 'Medium',
    skills: ['Fetch API', 'Async/Await', 'Error Handling'],
    learningObjectives: ['Make asynchronous GET requests to REST APIs', 'Parse and format JSON responses', 'Display intuitive loading states']
  },
  {
    id: 'proj_08',
    tier: 'Intermediate',
    title: 'Personal Expense Tracker',
    description: 'Track income, expenses, category breakdown, visual progress bars, and calculate net balance with persistence.',
    difficulty: 'Medium',
    skills: ['Array Reduce', 'Mathematical Calculations', 'LocalStorage Persistence'],
    learningObjectives: ['Calculate running totals with Array.prototype.reduce()', 'Categorize transactions dynamically', 'Visualize expense percentages']
  },
  {
    id: 'proj_09',
    tier: 'Intermediate',
    title: 'Spotify-Inspired Music Player',
    description: 'Interactive audio player with play/pause, seekbar tracking, playlist navigation, and duration displays.',
    difficulty: 'Medium-Hard',
    skills: ['HTML5 Audio API', 'Timeupdate Events', 'Dynamic Playlists'],
    learningObjectives: ['Control audio playback programmatically', 'Update seekbar in real time', 'Handle playlist tracks queue']
  },
  {
    id: 'proj_10',
    tier: 'Intermediate',
    title: 'Markdown Notes Application',
    description: 'Rich note-taking application with live markdown rendering, search bar, tags, and auto-saving.',
    difficulty: 'Medium-Hard',
    skills: ['Text Parsing', 'Debounced Saving', 'DOM Updates'],
    learningObjectives: ['Render markdown preview in real time', 'Implement debounced auto-save', 'Filter notes by search keywords and tags']
  },

  // 5 ADVANCED PROJECTS
  {
    id: 'proj_11',
    tier: 'Advanced',
    title: 'E-Commerce Store with Shopping Cart',
    description: 'Full-featured online store with product filtering, cart drawer, quantity updates, checkout calculation, and mock payment.',
    difficulty: 'Hard',
    skills: ['Complex State Management', 'Cart Reducer', 'Responsive Checkout'],
    learningObjectives: ['Architect scalable cart management', 'Handle stock and quantity limits', 'Implement checkout validation']
  },
  {
    id: 'proj_12',
    tier: 'Advanced',
    title: 'Modern Blog Platform with CMS',
    description: 'Publishing platform with rich article editor, category filters, reading time estimator, and comments section.',
    difficulty: 'Hard',
    skills: ['Content Architecture', 'Slug Routing', 'Comment Trees'],
    learningObjectives: ['Build content management workflows', 'Calculate estimated reading time dynamically', 'Manage threaded discussions']
  },
  {
    id: 'proj_13',
    tier: 'Advanced',
    title: 'Full Authentication Application',
    description: 'Secure authentication flow featuring registration, login, JWT validation, password hashing simulation, and protected dashboards.',
    difficulty: 'Hard',
    skills: ['Security Standards', 'JWT Handling', 'Protected Routes'],
    learningObjectives: ['Enforce authentication state globally', 'Implement token expiration & refresh', 'Secure user profile data']
  },
  {
    id: 'proj_14',
    tier: 'Advanced',
    title: 'Full-Stack Kanban Task Manager',
    description: 'Trello-style drag-and-drop task board with Todo, In-Progress, and Done columns, subtasks, and deadlines.',
    difficulty: 'Hard',
    skills: ['Drag and Drop API', 'Multi-Column State', 'Persistent Boards'],
    learningObjectives: ['Handle HTML5 Drag and Drop events', 'Reorder items across state columns', 'Persist board layout']
  },
  {
    id: 'proj_15',
    tier: 'Advanced',
    title: 'Real-Time Chat Application Interface',
    description: 'Chatroom interface with instant message sending, channels, typing indicators, user online badges, and emoji picker.',
    difficulty: 'Hard',
    skills: ['Event-Driven UI', 'Message Arrays', 'Scroll Management'],
    learningObjectives: ['Manage real-time message streams', 'Auto-scroll on incoming messages', 'Simulate typing indicators']
  }
];

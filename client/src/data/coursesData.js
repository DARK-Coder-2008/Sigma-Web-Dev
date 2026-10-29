// 10 Structured Courses for Sigma Web Dev - Dark Coder

export const coursesCatalog = [
  {
    id: 'course_html',
    slug: 'html-mastery',
    number: 1,
    title: 'Course 1: HTML5 Architecture & Semantics',
    category: 'HTML',
    difficulty: 'Beginner',
    duration: '14 Hours',
    modulesCount: 13,
    description: 'Learn the foundational skeleton of the internet. From basic tags and attributes to semantic layouts, accessibility (a11y), modern forms, and SEO best practices.',
    syllabus: [
      'Introduction to HTML & Web Anatomy',
      'Elements, Attributes & Void Tags',
      'Headings, Paragraphs & Hyperlinks',
      'Media: Images, WebP, SVG, Audio & Video',
      'Data Structures: Ordered, Unordered Lists & Tables',
      'Forms: Input Types, Labels, Actions & Validation',
      'Semantic HTML5: header, nav, main, article, section, footer',
      'Accessibility (a11y) & Core Web Vitals'
    ]
  },
  {
    id: 'course_css',
    slug: 'css-styling',
    number: 2,
    title: 'Course 2: CSS3 Styling & Modern Layouts',
    category: 'CSS',
    difficulty: 'Beginner to Intermediate',
    duration: '26 Hours',
    modulesCount: 25,
    description: 'Transform raw markup into breathtaking interfaces. Master the CSS Box Model, Flexbox centering, CSS Grid architecture, typography, transitions, transforms, and animations.',
    syllabus: [
      'CSS Syntax, Selectors & Specificity Hierarchy',
      'The Ultimate CSS Box Model & box-sizing: border-box',
      'Colors, HSL, Gradients & Glassmorphism Filters',
      'Display Types & Positioning (Relative, Absolute, Fixed, Sticky)',
      'Flexbox Masterclass: Main/Cross Axis, Justify & Align',
      'CSS Grid Masterclass: 12-Column Grids, repeat() & minmax()',
      'Transitions, Transforms, Keyframe Animations & Theming'
    ]
  },
  {
    id: 'course_js',
    slug: 'javascript-engine',
    number: 3,
    title: 'Course 3: JavaScript Programming & Logic',
    category: 'JavaScript',
    difficulty: 'Beginner to Advanced',
    duration: '38 Hours',
    modulesCount: 30,
    description: 'The programming engine of the web. Learn data types, loops, functional array methods, DOM manipulation, asynchronous programming (Promises, async/await), and ES6+ features.',
    syllabus: [
      'Variables, Data Types, Operators & Control Flow',
      'Functions, Arrow Functions & Scope Chain',
      'Arrays & Modern Functional Methods (map, filter, reduce)',
      'Objects, Destructuring, Spread/Rest Operators',
      'DOM Manipulation, Event Listeners, Bubbling & Delegation',
      'Browser Storage: LocalStorage & SessionStorage APIs',
      'Asynchronous JS: Callbacks, Promises, async/await & Fetch API',
      'OOP: Prototypes, ES6 Classes & The Event Loop'
    ]
  },
  {
    id: 'course_rwd',
    slug: 'responsive-web-design',
    number: 4,
    title: 'Course 4: Responsive Web Design',
    category: 'CSS',
    difficulty: 'Intermediate',
    duration: '10 Hours',
    modulesCount: 8,
    description: 'Ensure your websites look flawless on smartphones, tablets, laptops, and ultra-wide 4K monitors with fluid typography, breakpoints, and mobile-first strategies.',
    syllabus: [
      'Mobile-First vs Desktop-First Strategy',
      'CSS Media Queries & Standard Breakpoints',
      'Fluid Layouts, Responsive Units (rem, vw, vh, clamp())',
      'Responsive Images with <picture> & srcset',
      'Touch Targets (48px+) & Mobile Accessibility'
    ]
  },
  {
    id: 'course_git',
    slug: 'git-and-github',
    number: 5,
    title: 'Course 5: Git & GitHub Version Control',
    category: 'Tools',
    difficulty: 'Beginner',
    duration: '8 Hours',
    modulesCount: 8,
    description: 'Master industry-standard version control. Track code history, manage branching workflows, resolve merge conflicts, collaborate with teams, and deploy to GitHub Pages.',
    syllabus: [
      'Git Installation & Configuration',
      'Repositories, Commits & Staging Area',
      'Branching Workflows, Checkout & Merging',
      'Handling Merge Conflicts like a Pro',
      'Remote Repositories: Push, Pull & Fetch',
      'GitHub Pages Deployment & Automated Actions'
    ]
  },
  {
    id: 'course_tailwind',
    slug: 'tailwind-css',
    number: 6,
    title: 'Course 6: Tailwind CSS Rapid UI Development',
    category: 'CSS',
    difficulty: 'Intermediate',
    duration: '12 Hours',
    modulesCount: 8,
    description: 'Build modern responsive UIs 10x faster with utility-first CSS. Master spacing, typography, flex, grid, responsive modifiers, and dark-mode theming.',
    syllabus: [
      'Tailwind CSS Philosophy & CLI Setup',
      'Utility Classes for Spacing, Typography & Colors',
      'Building Responsive Flexbox & Grid Layouts',
      'State Modifiers: hover, focus, active & dark mode',
      'Component Extraction & Tailwind Configuration'
    ]
  },
  {
    id: 'course_react',
    slug: 'react-mastery',
    number: 7,
    title: 'Course 7: React.js Component Architecture',
    category: 'React',
    difficulty: 'Intermediate to Advanced',
    duration: '32 Hours',
    modulesCount: 15,
    description: 'Build blazing-fast declarative single-page applications. Master Virtual DOM, JSX, components, props, hooks (useState, useEffect), forms, and React Router.',
    syllabus: [
      'Virtual DOM & Declarative Programming',
      'Vite React Setup & JSX Rules',
      'Components, Props & Composition',
      'State Management with useState Hook',
      'Side Effects & Data Fetching with useEffect Hook',
      'Controlled Forms & Input Handling',
      'Client-Side Routing with React Router'
    ]
  },
  {
    id: 'course_backend',
    slug: 'backend-nodejs-express',
    number: 8,
    title: 'Course 8: Backend Development with Node.js & Express',
    category: 'Backend',
    difficulty: 'Intermediate to Advanced',
    duration: '28 Hours',
    modulesCount: 12,
    description: 'Power the server-side. Understand event-driven architecture, file systems, HTTP protocol, build scalable RESTful APIs with Express.js, and implement middlewares.',
    syllabus: [
      'Node.js Runtime & V8 Architecture',
      'NPM Package Ecosystem & Core Modules (fs, path, http)',
      'Express.js Server Architecture',
      'REST API Design & HTTP Status Codes',
      'Middleware Pipeline, Request Validation & Error Handling',
      'Environment Security & dotenv Configuration'
    ]
  },
  {
    id: 'course_db',
    slug: 'databases-mongodb',
    number: 9,
    title: 'Course 9: Databases & Data Modeling (MongoDB)',
    category: 'Database',
    difficulty: 'Intermediate',
    duration: '20 Hours',
    modulesCount: 10,
    description: 'Store, query, and secure user data. Compare SQL and NoSQL, set up MongoDB Atlas, execute CRUD queries, design Mongoose schemas, and enforce data validation.',
    syllabus: [
      'SQL vs NoSQL Paradigms',
      'MongoDB Atlas Cloud Setup & Compass GUI',
      'CRUD Operations: insert, find, update, delete',
      'Mongoose ODM: Connecting Node.js to MongoDB',
      'Defining Schemas, Models & Validation Rules',
      'Advanced Queries, Sorting, Pagination & Indexing'
    ]
  },
  {
    id: 'course_fullstack',
    slug: 'fullstack-deployment',
    number: 10,
    title: 'Course 10: Full-Stack Architecture & Deployment',
    category: 'Full-Stack',
    difficulty: 'Advanced',
    duration: '35 Hours',
    modulesCount: 10,
    description: 'Tie frontend and backend together into production-ready web applications. Implement JWT authentication, bcrypt password hashing, and deploy to Vercel and Render.',
    syllabus: [
      'Frontend & Backend Integration Pipeline',
      'Authentication: Sessions, Cookies & JSON Web Tokens (JWT)',
      'Password Hashing & Security with bcryptjs',
      'CORS Configuration & API Protection',
      'Production Deployment on Vercel & Render',
      'Continuous Integration & GitHub Actions CI/CD'
    ]
  }
];

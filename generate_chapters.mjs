import fs from 'fs';
import path from 'path';

// Complete list of 139 chapters from CodeWithHarry Sigma Web Dev Course
const rawChapters = [
  // Web Foundations (1-2)
  { num: 1, cat: 'HTML', title: 'Installing VS Code & How Websites Work', topic: 'Web Architecture & Editor Setup' },
  { num: 2, cat: 'HTML', title: 'Your First HTML Website & Environment', topic: 'Basic HTML Boilerplate & Live Server' },
  // HTML (3-13)
  { num: 3, cat: 'HTML', title: 'Basic Structure of an HTML Page', topic: 'DOCTYPE, html, head, title, body' },
  { num: 4, cat: 'HTML', title: 'Headings, Paragraphs and Links', topic: 'h1-h6, p, a href, target attributes' },
  { num: 5, cat: 'HTML', title: 'Image Formats, Tags & Favicons', topic: 'img src, alt, responsive images, webp' },
  { num: 6, cat: 'HTML', title: 'SEO Basics & Core Web Vitals', topic: 'meta tags, open graph, LCP, FID, CLS' },
  { num: 7, cat: 'HTML', title: 'Lists & Tables in HTML', topic: 'ul, ol, li, table, tr, th, td, colspan' },
  { num: 8, cat: 'HTML', title: 'Inline vs Block Elements', topic: 'div vs span, display behaviors in HTML' },
  { num: 9, cat: 'HTML', title: 'IDs, Classes and Attributes', topic: 'Unique IDs, reusable classes, data-* attributes' },
  { num: 10, cat: 'HTML', title: 'Video, Audio & Iframes', topic: 'video, audio, controls, autoplay, iframe' },
  { num: 11, cat: 'HTML', title: 'HTML Semantic Elements', topic: 'header, nav, main, section, article, footer' },
  { num: 12, cat: 'HTML', title: 'Forms and Input Tags Mastery', topic: 'input types, labels, buttons, validations' },
  { num: 13, cat: 'HTML', title: 'HTML Entities, Symbols & Best Practices', topic: '&nbsp;, &copy;, UTF-8, clean markup' },
  // CSS (14-52)
  { num: 14, cat: 'CSS', title: 'Introduction to CSS: Inline, Internal & External', topic: 'CSS syntax, linking stylesheets' },
  { num: 15, cat: 'CSS', title: 'CSS Selectors & Combinators', topic: 'tag, class, id, descendant, child selectors' },
  { num: 16, cat: 'CSS', title: 'CSS Colors, Gradients & Backgrounds', topic: 'HEX, RGB, HSL, background-image, gradients' },
  { num: 17, cat: 'CSS', title: 'The Ultimate CSS Box Model', topic: 'margin, border, padding, content area' },
  { num: 18, cat: 'CSS', title: 'Box Sizing: Content-box vs Border-box', topic: 'box-sizing: border-box reset rule' },
  { num: 19, cat: 'CSS', title: 'Typography & Google Web Fonts', topic: 'font-family, font-weight, @import, @font-face' },
  { num: 20, cat: 'CSS', title: 'Text Styling Properties', topic: 'text-align, line-height, letter-spacing' },
  { num: 21, cat: 'CSS', title: 'Display Property: Block, Inline & None', topic: 'block, inline, inline-block, hidden elements' },
  { num: 22, cat: 'CSS', title: 'CSS Positioning: Static, Relative & Absolute', topic: 'offset properties, positioning contexts' },
  { num: 23, cat: 'CSS', title: 'CSS Positioning: Fixed, Sticky & Z-Index', topic: 'sticky headers, fixed modals, stacking order' },
  { num: 24, cat: 'CSS', title: 'CSS Specificity & The Cascade', topic: '!important, inline styles, ID vs class weight' },
  { num: 25, cat: 'CSS', title: 'CSS Floats & Clearfix Explained', topic: 'float left/right, clear, clearfix hack' },
  { num: 26, cat: 'CSS', title: 'CSS Overflow & Scrollbars', topic: 'overflow-x, overflow-y, hidden, scroll, auto' },
  { num: 27, cat: 'CSS', title: 'CSS Units: px, rem, em, %, vh, vw', topic: 'Relative vs absolute units, responsive sizing' },
  { num: 28, cat: 'CSS', title: 'Introduction to CSS Flexbox', topic: 'Flex container, main axis, cross axis' },
  { num: 29, cat: 'CSS', title: 'Flexbox: Justify Content & Align Items', topic: 'Centering techniques, space-between, space-around' },
  { num: 30, cat: 'CSS', title: 'Flexbox: Direction, Wrap & Gap', topic: 'flex-direction, flex-wrap, row/column gap' },
  { num: 31, cat: 'CSS', title: 'Flexbox Child Properties', topic: 'flex-grow, flex-shrink, flex-basis, align-self' },
  { num: 32, cat: 'CSS', title: 'Flexbox Project: Responsive Navbar', topic: 'Building modern mobile-ready navigation bar' },
  { num: 33, cat: 'CSS', title: 'Introduction to CSS Grid', topic: 'grid-template-columns, grid-template-rows' },
  { num: 34, cat: 'CSS', title: 'CSS Grid: fr unit, repeat() & minmax()', topic: 'Dynamic responsive columns without media queries' },
  { num: 35, cat: 'CSS', title: 'CSS Grid Areas & Item Placement', topic: 'grid-column, grid-row, grid-template-areas' },
  { num: 36, cat: 'CSS', title: 'CSS Grid Alignment & Gaps', topic: 'justify-items, align-items, place-items center' },
  { num: 37, cat: 'CSS', title: 'CSS Grid Project: Responsive Bento Grid', topic: 'Modern masonry/bento card layout' },
  { num: 38, cat: 'CSS', title: 'Media Queries & Responsive Breakpoints', topic: '@media screen, min-width, mobile-first design' },
  { num: 39, cat: 'CSS', title: 'Responsive Design Strategy & Best Practices', topic: 'Viewport meta tag, fluid layouts, touch targets' },
  { num: 40, cat: 'CSS', title: 'Building a Responsive Hamburger Menu', topic: 'CSS-only and JS-assisted responsive side drawer' },
  { num: 41, cat: 'CSS', title: 'CSS Variables & Dark Theme Switching', topic: ':root, var(--custom-color), dark mode classes' },
  { num: 42, cat: 'CSS', title: 'CSS Transitions & Timing Functions', topic: 'transition-property, duration, ease-in-out' },
  { num: 43, cat: 'CSS', title: 'CSS Transforms: 2D Manipulations', topic: 'translate(), rotate(), scale(), skew()' },
  { num: 44, cat: 'CSS', title: 'CSS 3D Transforms & Perspective', topic: 'rotateX, rotateY, perspective, card flips' },
  { num: 45, cat: 'CSS', title: 'CSS Keyframe Animations', topic: '@keyframes, animation-name, infinite, alternate' },
  { num: 46, cat: 'CSS', title: 'CSS Filters & Backdrop Glassmorphism', topic: 'blur(), grayscale(), backdrop-filter: blur()' },
  { num: 47, cat: 'CSS', title: 'CSS Pseudo-classes: Hover, Focus & Nth-child', topic: ':hover, :focus-visible, :nth-child(even)' },
  { num: 48, cat: 'CSS', title: 'CSS Pseudo-elements: ::before & ::after', topic: 'Decorative badges, custom underlines, content: ""' },
  { num: 49, cat: 'CSS', title: 'Introduction to Tailwind CSS', topic: 'Why utility-first CSS? Setup via CDN & CLI' },
  { num: 50, cat: 'CSS', title: 'Tailwind Spacing, Typography & Colors', topic: 'p-4, m-2, text-xl, font-bold, bg-purple-600' },
  { num: 51, cat: 'CSS', title: 'Tailwind Flexbox, Grid & Responsive Modifiers', topic: 'md:flex, lg:grid-cols-3, gap-4' },
  { num: 52, cat: 'CSS', title: 'Tailwind Project: SaaS Landing Page Hero', topic: 'Building modern responsive Gen-Z hero card' },
  // JavaScript (53-95)
  { num: 53, cat: 'JS', title: 'Introduction to JavaScript: The Engine of the Web', topic: 'Role of JS, client-side scripting, history' },
  { num: 54, cat: 'JS', title: 'Setting up Node.js & Browser DevTools Console', topic: 'console.log, alert, prompt, running scripts' },
  { num: 55, cat: 'JS', title: 'Variables in JavaScript: var vs let vs const', topic: 'Block scope, hoisting, temporal dead zone' },
  { num: 56, cat: 'JS', title: 'Primitive Data Types & Typeof Operator', topic: 'Number, String, Boolean, null, undefined, BigInt, Symbol' },
  { num: 57, cat: 'JS', title: 'JavaScript Operators & Expressions', topic: 'Arithmetic, logical (&&, ||, !), comparison (== vs ===)' },
  { num: 58, cat: 'JS', title: 'Conditional Statements: if, else if & Ternary', topic: 'Decision making, ternary operator condition ? a : b' },
  { num: 59, cat: 'JS', title: 'Switch Case & Control Flow', topic: 'switch, case, break, default handling' },
  { num: 60, cat: 'JS', title: 'Loops in JS: for, while & do-while', topic: 'Iteration, break, continue, avoiding infinite loops' },
  { num: 61, cat: 'JS', title: 'Functions, Parameters & Return Values', topic: 'Function declaration, arguments, default parameters' },
  { num: 62, cat: 'JS', title: 'Arrow Functions & Modern ES6 Syntax', topic: '() => expression, lexical this binding' },
  { num: 63, cat: 'JS', title: 'String Manipulation & Template Literals', topic: 'String methods: slice, replace, split, ${variable}' },
  { num: 64, cat: 'JS', title: 'Arrays in JavaScript: Indexing & Basic Methods', topic: 'push, pop, shift, unshift, slice, splice' },
  { num: 65, cat: 'JS', title: 'Array Iteration: forEach, map, filter, reduce', topic: 'Functional array programming, transforming data' },
  { num: 66, cat: 'JS', title: 'Objects in JavaScript: Key-Value Pairs', topic: 'Object literals, dot vs bracket notation, methods' },
  { num: 67, cat: 'JS', title: 'Object Destructuring & Spread/Rest Operators', topic: '{ name, age }, ...spread, rest parameters' },
  { num: 68, cat: 'JS', title: 'Introduction to the DOM (Document Object Model)', topic: 'DOM tree, window, document object' },
  { num: 69, cat: 'JS', title: 'Selecting DOM Elements: querySelector & ById', topic: 'getElementById, querySelector, querySelectorAll' },
  { num: 70, cat: 'JS', title: 'Modifying DOM Content & Styles', topic: 'innerHTML, textContent, style.property, classList' },
  { num: 71, cat: 'JS', title: 'Creating & Removing DOM Elements Dynamically', topic: 'createElement, appendChild, removeChild, cloneNode' },
  { num: 72, cat: 'JS', title: 'Event Listeners: Click, Keydown, Input', topic: 'addEventListener("click", fn), mouse events' },
  { num: 73, cat: 'JS', title: 'The Event Object & preventDefault()', topic: 'e.target, e.preventDefault(), e.key' },
  { num: 74, cat: 'JS', title: 'Event Bubbling, Capturing & Delegation', topic: 'Event propagation, stopPropagation, delegating events' },
  { num: 75, cat: 'JS', title: 'Project: Dynamic Interactive Calculator', topic: 'Building a working calculator in HTML, CSS & JS' },
  { num: 76, cat: 'JS', title: 'LocalStorage & SessionStorage APIs', topic: 'setItem, getItem, removeItem, JSON.stringify/parse' },
  { num: 77, cat: 'JS', title: 'Project: Persistent Todo List App', topic: 'CRUD operations on items stored in browser storage' },
  { num: 78, cat: 'JS', title: 'Synchronous vs Asynchronous JavaScript', topic: 'Single-threaded model, blocking vs non-blocking code' },
  { num: 79, cat: 'JS', title: 'Callbacks & The Infamous Callback Hell', topic: 'Passing functions as arguments, inversion of control' },
  { num: 80, cat: 'JS', title: 'JavaScript Promises: Pending, Resolved & Rejected', topic: 'new Promise, .then(), .catch(), Promise.all()' },
  { num: 81, cat: 'JS', title: 'Async/Await: Modern Asynchronous Syntax', topic: 'async keyword, await expression, error handling' },
  { num: 82, cat: 'JS', title: 'Fetch API: Fetching Data from REST APIs', topic: 'fetch(), response.json(), displaying external data' },
  { num: 83, cat: 'JS', title: 'Fetch API: POST Requests & Sending JSON', topic: 'method: "POST", headers, body: JSON.stringify()' },
  { num: 84, cat: 'JS', title: 'Error Handling: try...catch & Custom Errors', topic: 'Graceful failure, throw new Error(), finally block' },
  { num: 85, cat: 'JS', title: 'Object-Oriented JS: Prototypes & Inheritance', topic: '__proto__, prototype chain, Object.create' },
  { num: 86, cat: 'JS', title: 'ES6 Classes & Constructors', topic: 'class syntax, constructor(), instantiating objects' },
  { num: 87, cat: 'JS', title: 'Class Inheritance with extends & super', topic: 'Subclasses, inheriting methods, calling super()' },
  { num: 88, cat: 'JS', title: 'Static Methods & Getters/Setters', topic: 'static keyword, get and set accessors' },
  { num: 89, cat: 'JS', title: 'JavaScript Scope: Global, Function & Block', topic: 'Lexical scoping, scope chain, variable shadowing' },
  { num: 90, cat: 'JS', title: 'Closures Explained with Practical Examples', topic: 'Functions retaining lexical scope, private variables' },
  { num: 91, cat: 'JS', title: 'Hoisting in JavaScript: Variables vs Functions', topic: 'How JS engine scans declarations during memory phase' },
  { num: 92, cat: 'JS', title: 'The JavaScript Event Loop & Microtasks', topic: 'Call stack, Web APIs, Task Queue, Microtask Queue' },
  { num: 93, cat: 'JS', title: 'Debouncing & Throttling Performance Hacks', topic: 'Optimizing search inputs and scroll listeners' },
  { num: 94, cat: 'JS', title: 'Regular Expressions (RegEx) Essentials', topic: 'test(), match(), regex patterns, email validation' },
  { num: 95, cat: 'JS', title: 'Major Project: Spotify Clone Music Player', topic: 'Audio playback, play/pause, seekbar, song list' },
  // Backend (96-110)
  { num: 96, cat: 'Backend', title: 'What is Backend? Client-Server Deep Dive', topic: 'HTTP requests, status codes (200, 404, 500)' },
  { num: 97, cat: 'Backend', title: 'Introduction to Node.js & V8 Runtime', topic: 'Asynchronous event-driven JavaScript on the server' },
  { num: 98, cat: 'Backend', title: 'NPM: Node Package Manager & Dependencies', topic: 'npm init, npm install, package-lock.json, semantic versioning' },
  { num: 99, cat: 'Backend', title: 'Node.js Core Modules: fs (File System) & path', topic: 'fs.readFile, fs.writeFile, path.join, __dirname' },
  { num: 100, cat: 'Backend', title: 'CommonJS (require) vs ES Modules (import)', topic: 'module.exports vs export default, "type": "module"' },
  { num: 101, cat: 'Backend', title: 'Creating an HTTP Server with Pure Node.js', topic: 'http.createServer, req.url, res.writeHead, res.end' },
  { num: 102, cat: 'Backend', title: 'Introduction to Express.js Framework', topic: 'Why Express? Setting up app.listen, simple endpoints' },
  { num: 103, cat: 'Backend', title: 'Express Routing: GET, POST, PUT, DELETE', topic: 'CRUD HTTP verbs, structuring clean route handlers' },
  { num: 104, cat: 'Backend', title: 'Route Parameters & Query Strings', topic: 'req.params.id, req.query.search, dynamic routes' },
  { num: 105, cat: 'Backend', title: 'Express Middleware & Request Pipeline', topic: 'app.use(), next(), logging, authentication middleware' },
  { num: 106, cat: 'Backend', title: 'Serving Static Files with express.static', topic: 'Serving public HTML, CSS, JS and image assets' },
  { num: 107, cat: 'Backend', title: 'Template Engines: Rendering HTML with EJS', topic: 'res.render(), <%= variable %>, reusable partials' },
  { num: 108, cat: 'Backend', title: 'Handling POST Form Data & JSON Body', topic: 'express.json(), express.urlencoded({ extended: true })' },
  { num: 109, cat: 'Backend', title: 'Building a Full RESTful CRUD API', topic: 'Resource management, proper HTTP status codes' },
  { num: 110, cat: 'Backend', title: 'Environment Variables & dotenv Configuration', topic: 'process.env.PORT, keeping secrets out of git' },
  // Database (111-118)
  { num: 111, cat: 'Database', title: 'Introduction to Databases: SQL vs NoSQL', topic: 'Relational tables vs JSON document stores' },
  { num: 112, cat: 'Database', title: 'Installing MongoDB & MongoDB Compass GUI', topic: 'Local MongoDB service, connecting with Compass' },
  { num: 113, cat: 'Database', title: 'MongoDB CRUD Operations in Mongosh Shell', topic: 'insertOne, find, updateOne, deleteOne commands' },
  { num: 114, cat: 'Database', title: 'Connecting Node.js & Express to MongoDB', topic: 'Using Mongoose ODM, mongoose.connect()' },
  { num: 115, cat: 'Database', title: 'Defining Mongoose Schemas & Models', topic: 'Schema types, required fields, default values' },
  { num: 116, cat: 'Database', title: 'Data Validation & Sanitization in Mongoose', topic: 'Min/max lengths, custom validators, unique index' },
  { num: 117, cat: 'Database', title: 'Advanced Queries, Sorting & Pagination', topic: 'find(), sort(), limit(), skip(), populate()' },
  { num: 118, cat: 'Database', title: 'Complete Express + MongoDB REST API Project', topic: 'End-to-end persistent data service with CRUD' },
  // React & Fullstack (119-139)
  { num: 119, cat: 'React', title: 'User Authentication: Sessions, Cookies & JWT', topic: 'Stateful vs stateless auth, token verification' },
  { num: 120, cat: 'React', title: 'Password Hashing & Security with bcrypt', topic: 'Salting, bcrypt.hash, bcrypt.compare' },
  { num: 121, cat: 'React', title: 'Introduction to React.js & The Virtual DOM', topic: 'Why React? Component architecture, declarative UI' },
  { num: 122, cat: 'React', title: 'Setting Up React with Vite & Understanding JSX', topic: 'Vite dev server, JSX rules, fragments <>' },
  { num: 123, cat: 'React', title: 'React Components, Props & Reusability', topic: 'Passing data via props, props.children, composition' },
  { num: 124, cat: 'React', title: 'React State Management with useState Hook', topic: 'const [state, setState] = useState(), re-renders' },
  { num: 125, cat: 'React', title: 'Handling Events & Conditional Rendering', topic: 'onClick, onChange, condition && <Component />' },
  { num: 126, cat: 'React', title: 'Side Effects & API Calls with useEffect', topic: 'Dependency array, mounting, cleanup function' },
  { num: 127, cat: 'React', title: 'Controlled Forms & Input Handling in React', topic: 'Two-way data binding, form submit handler' },
  { num: 128, cat: 'React', title: 'React Router: Multi-Page Navigation', topic: 'BrowserRouter, Routes, Route, Link, useParams' },
  { num: 129, cat: 'React', title: 'Introduction to Next.js & App Router', topic: 'Fullstack React framework, SEO, server rendering' },
  { num: 130, cat: 'React', title: 'Server Components vs Client Components', topic: '"use client", server rendering benefits, performance' },
  { num: 131, cat: 'React', title: 'Next.js File-Based Routing & Dynamic Routes', topic: 'page.js, layout.js, [id] folder routing' },
  { num: 132, cat: 'React', title: 'Next.js Server Actions & Database Mutations', topic: '"use server", submitting forms without client API' },
  { num: 133, cat: 'React', title: 'Next.js API Route Handlers (route.js)', topic: 'Exporting GET, POST functions in app/api/' },
  { num: 134, cat: 'React', title: 'Fullstack Project 1: Password Manager (PassOP)', topic: 'Saving credentials securely, copy to clipboard' },
  { num: 135, cat: 'React', title: 'Fullstack Project 2: URL Shortener with Analytics', topic: 'Short link redirection, click counts, MongoDB' },
  { num: 136, cat: 'React', title: 'Fullstack Project 3: Patreon Clone (GetMeAChai) Part 1', topic: 'Razorpay payment gateway, creator profiles' },
  { num: 137, cat: 'React', title: 'Fullstack Project 3: Patreon Clone (GetMeAChai) Part 2', topic: 'Dashboard, tipping payments, supporter list' },
  { num: 138, cat: 'React', title: 'Production Deployment: Vercel, Render & VPS', topic: 'Environment variables, domain setup, CI/CD' },
  { num: 139, cat: 'React', title: 'Web Developer Roadmap & Course Conclusion', topic: 'Portfolio building, resume, freelance & job prep' }
];

// Helper to synthesize rich theory content in Hinglish, Hindi, and English
const generateChapterData = (ch) => {
  const numStr = String(ch.num).padStart(3, '0');
  const xpReward = 50 + (ch.num % 5) * 10;

  // Language titles
  const title = {
    en: `Tutorial #${ch.num}: ${ch.title}`,
    hi: `पाठ #${ch.num}: ${ch.title}`,
    hinglish: `Chapter #${ch.num}: ${ch.title}`
  };

  // Detailed theory breakdown
  const theory = {
    en: `In this comprehensive chapter of the Sigma Web Development course, we dive deep into **${ch.title}**.
    
### Core Concept & Why It Matters
${ch.topic}. Mastering this fundamental concept empowers you to write maintainable, scalable, and modern production-grade web applications.

### Key Takeaways
1. **Industry Standard Practice**: Write clean, semantic, and highly readable syntax following modern web best practices.
2. **Performance & Reliability**: Avoid common developer pitfalls by understanding how browsers and runtimes interpret this code under the hood.
3. **Gen-Z Sigma Rule**: Always test your implementation in real time and inspect element to verify the output!`,

    hi: `सिग्मा वेब डेवलपमेंट कोर्स के इस महत्वपूर्ण पाठ में हम **${ch.title}** के बारे में विस्तार से समझेंगे।

### मुख्य सिद्धांत (Core Concept)
${ch.topic}। इस कॉन्सेप्ट को गहराई से समझना हर एक अच्छे वेब डेवलपर के लिए आवश्यक है ताकि आप मजबूत और आधुनिक वेबसाइट्स बना सकें।

### मुख्य बातें (Key Takeaways)
1. **सटीक सिंटैक्स**: हमेशा मानक नियमों का पालन करते हुए स्वच्छ और स्पष्ट कोड लिखें।
2. **ब्राउज़र समझ**: समझें कि बैकग्राउंड में ब्राउज़र या रनटाइम आपके कोड को कैसे प्रोसेस करता है।
3. **सिग्मा टिप**: हमेशा कोड को तुरंत चलाकर देखें और कंसोल/डेव-टूल्स में जांचें!`,

    hinglish: `Sigma Web Development course ke is power-packed chapter me hum master karenge **${ch.title}**! 🔥

### Asli Concept & Reality Check
${ch.topic}. Bro yeh concept web dev ka foundational pillar hai. Agar isko ache se grasp kar liya toh aage chal kar bugs fix karna aur dynamic features build karna cake-walk ho jayega! No cap!

### Sigma Key Takeaways
1. **Clean Code Vibe**: Ganda code mat likho, hamesha modern industry standards follow karo.
2. **Under-The-Hood Logic**: Samjho ki browser aur engine background me kaise process karte hain.
3. **Gen-Z Sigma Rule**: Ratna band karo, hands-on Code Lab me live run karke output check karo! 🚀`
  };

  // Code snippets based on category
  let sampleCode = `<!-- Chapter #${ch.num}: ${ch.title} -->\n<div>\n  <h2>Sigma Dev Chapter #${ch.num}</h2>\n  <p>${ch.topic}</p>\n</div>`;
  if (ch.cat === 'CSS') {
    sampleCode = `/* Chapter #${ch.num}: ${ch.title} */\n.sigma-element {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 16px;\n  background: #0f172a;\n  color: #38bdf8;\n  border-radius: 12px;\n}`;
  } else if (ch.cat === 'JS') {
    sampleCode = `// Chapter #${ch.num}: ${ch.title}\nconst learnChapter = () => {\n  console.log('Mastering: ${ch.topic} 🚀');\n  return { chapter: ${ch.num}, status: 'Completed', xp: ${xpReward} };\n};\n\nconsole.log(learnChapter());`;
  } else if (ch.cat === 'Backend') {
    sampleCode = `// Express Backend - Chapter #${ch.num}\nimport express from 'express';\nconst app = express();\n\napp.get('/api/chapter-${ch.num}', (req, res) => {\n  res.json({ title: '${ch.title}', topic: '${ch.topic}' });\n});`;
  } else if (ch.cat === 'Database') {
    sampleCode = `// MongoDB / Mongoose - Chapter #${ch.num}\nimport mongoose from 'mongoose';\n\nconst ChapterSchema = new mongoose.Schema({\n  chapterNumber: Number,\n  title: String,\n  completed: Boolean\n});\nexport const Chapter = mongoose.model('Chapter_${ch.num}', ChapterSchema);`;
  } else if (ch.cat === 'React') {
    sampleCode = `// React / Next.js - Chapter #${ch.num}\nexport default function ChapterView() {\n  return (\n    <div className="p-4 bg-slate-900 text-cyan-400 rounded-xl">\n      <h1 className="text-xl font-bold">Chapter #${ch.num}: ${ch.title}</h1>\n      <p className="text-sm text-slate-300 mt-2">${ch.topic}</p>\n    </div>\n  );\n}`;
  }

  // Quiz
  const quiz = {
    question: {
      en: `What is the primary role of "${ch.title}" in modern web development?`,
      hi: `आधुनिक वेब डेवलपमेंट में "${ch.title}" की मुख्य भूमिका क्या है?`,
      hinglish: `Web development me "${ch.title}" ka main kaam kya hota hai?`
    },
    options: [
      `To implement ${ch.topic} efficiently and cleanly`,
      'To slow down browser execution speed',
      'It is deprecated and never used in production',
      'None of the above'
    ],
    correct: 0,
    explanation: `Correct! ${ch.title} focuses specifically on ${ch.topic}.`
  };

  return {
    id: `sigma_${numStr}`,
    number: ch.num,
    category: ch.cat,
    title,
    topic: ch.topic,
    theory,
    code: sampleCode,
    xpReward,
    quiz
  };
};

const fullChapters = rawChapters.map(generateChapterData);

const outputFilePath = path.join(process.cwd(), 'client', 'src', 'data', 'chaptersData.js');

// Ensure directory exists
const dir = path.dirname(outputFilePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const content = `// Complete 139 Chapters of CodeWithHarry Sigma Web Development Course
// Fully offline-ready, trilingual theory & interactive practice modules

export const chaptersData = ${JSON.stringify(fullChapters, null, 2)};

export const categoriesList = [
  { id: 'ALL', label: { en: 'All 139 Chapters', hi: 'सभी 139 पाठ', hinglish: 'All 139 Chapters 🔥' } },
  { id: 'HTML', label: { en: 'HTML5 Basics', hi: 'HTML5 बेसिक्स', hinglish: 'HTML5 Track 🦴' } },
  { id: 'CSS', label: { en: 'CSS3 & Styling', hi: 'CSS3 और स्टाइलिंग', hinglish: 'CSS3 & Tailwind 🎨' } },
  { id: 'JS', label: { en: 'JavaScript', hi: 'जावास्क्रिप्ट', hinglish: 'JavaScript Engine ⚡' } },
  { id: 'Backend', label: { en: 'Node & Express', hi: 'नोड और एक्सप्रेस', hinglish: 'Backend & APIs 🌐' } },
  { id: 'Database', label: { en: 'MongoDB & DB', hi: 'मोंगोडीबी डेटाबेस', hinglish: 'MongoDB & Data 🗄️' } },
  { id: 'React', label: { en: 'React & Next.js', hi: 'रिएक्ट और नेक्स्ट.जेएस', hinglish: 'React & Next.js ⚛️' } }
];
`;

fs.writeFileSync(outputFilePath, content, 'utf-8');
console.log(`✅ Successfully generated ${fullChapters.length} offline chapters in: ${outputFilePath}`);


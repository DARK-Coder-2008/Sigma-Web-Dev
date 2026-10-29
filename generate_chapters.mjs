import fs from 'fs';
import path from 'path';

// Complete list of 139 chapters from CodeWithHarry Sigma Web Dev Course
const rawChapters = [
  // Web Foundations & HTML (1-13)
  { num: 1, cat: 'HTML', title: 'Installing VS Code & How Websites Work', topic: 'Client-Server Architecture, DNS, Browsers & Editor Setup' },
  { num: 2, cat: 'HTML', title: 'Your First HTML Website & Environment', topic: 'HTML Boilerplate, Live Server Extension & File Saving' },
  { num: 3, cat: 'HTML', title: 'Basic Structure of an HTML Page', topic: '<!DOCTYPE html>, <html>, <head>, <title>, <body>' },
  { num: 4, cat: 'HTML', title: 'Headings, Paragraphs and Links', topic: 'h1 to h6 hierarchy, <p> tag, <a href> and target="_blank"' },
  { num: 5, cat: 'HTML', title: 'Image Formats, Tags & Favicons', topic: '<img src alt>, responsive webp/svg, and favicon.ico link' },
  { num: 6, cat: 'HTML', title: 'SEO Basics & Core Web Vitals', topic: '<meta name="description">, Open Graph tags, LCP, FID & CLS' },
  { num: 7, cat: 'HTML', title: 'Lists & Tables in HTML', topic: '<ul>, <ol>, <li>, <table>, <tr>, <th>, <td>, colspan & rowspan' },
  { num: 8, cat: 'HTML', title: 'Inline vs Block Elements', topic: 'Block (div, p, h1) vs Inline (span, a, strong) rendering' },
  { num: 9, cat: 'HTML', title: 'IDs, Classes and Attributes', topic: 'Unique #id, reusable .class, data-* custom attributes' },
  { num: 10, cat: 'HTML', title: 'Video, Audio & Iframes', topic: '<video controls>, <audio>, autoplay policy & <iframe> embeds' },
  { num: 11, cat: 'HTML', title: 'HTML Semantic Elements', topic: '<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>' },
  { num: 12, cat: 'HTML', title: 'Forms and Input Tags Mastery', topic: '<form>, input types (text, email, password, radio, check), required' },
  { num: 13, cat: 'HTML', title: 'HTML Entities, Symbols & Best Practices', topic: '&nbsp;, &copy;, &lt;, &gt;, UTF-8 encoding & clean a11y' },

  // CSS3 & Tailwind Track (14-52)
  { num: 14, cat: 'CSS', title: 'Introduction to CSS: Inline, Internal & External', topic: 'CSS syntax, <style> tag, <link rel="stylesheet"> priority' },
  { num: 15, cat: 'CSS', title: 'CSS Selectors & Combinators', topic: 'Element, class, ID selectors, descendant (A B) and child (A > B)' },
  { num: 16, cat: 'CSS', title: 'CSS Colors, Gradients & Backgrounds', topic: 'HEX, RGB/RGBA, HSL, linear-gradient(), background-size cover' },
  { num: 17, cat: 'CSS', title: 'The Ultimate CSS Box Model', topic: 'Content area, padding, border, margin and spacing behavior' },
  { num: 18, cat: 'CSS', title: 'Box Sizing: Content-box vs Border-box', topic: 'box-sizing: border-box reset rule and element layout math' },
  { num: 19, cat: 'CSS', title: 'Typography & Google Web Fonts', topic: 'font-family fallback stack, font-weight, @import Google Fonts' },
  { num: 20, cat: 'CSS', title: 'Text Styling Properties', topic: 'text-align, text-decoration, text-transform, line-height, letter-spacing' },
  { num: 21, cat: 'CSS', title: 'Display Property: Block, Inline & None', topic: 'display: block, inline, inline-block, none vs visibility: hidden' },
  { num: 22, cat: 'CSS', title: 'CSS Positioning: Static, Relative & Absolute', topic: 'position: relative offset and absolute relative to ancestor' },
  { num: 23, cat: 'CSS', title: 'CSS Positioning: Fixed, Sticky & Z-Index', topic: 'position: fixed top nav, position: sticky scroll, z-index layers' },
  { num: 24, cat: 'CSS', title: 'CSS Specificity & The Cascade', topic: 'Specificity formula (Inline > ID > Class > Tag), !important caveat' },
  { num: 25, cat: 'CSS', title: 'CSS Floats & Clearfix Explained', topic: 'float: left/right, text wrap, clear: both and .clearfix hack' },
  { num: 26, cat: 'CSS', title: 'CSS Overflow & Scrollbars', topic: 'overflow: visible, hidden, scroll, auto & custom scrollbars' },
  { num: 27, cat: 'CSS', title: 'CSS Units: px, rem, em, %, vh, vw', topic: 'Absolute (px) vs Relative units (rem root, em parent, vh/vw viewport)' },
  { num: 28, cat: 'CSS', title: 'Introduction to CSS Flexbox', topic: 'display: flex container, main axis vs cross axis layout' },
  { num: 29, cat: 'CSS', title: 'Flexbox: Justify Content & Align Items', topic: 'Centering in 2 lines, space-between, space-around, space-evenly' },
  { num: 30, cat: 'CSS', title: 'Flexbox: Direction, Wrap & Gap', topic: 'flex-direction: row/column, flex-wrap, row-gap and column-gap' },
  { num: 31, cat: 'CSS', title: 'Flexbox Child Properties', topic: 'flex-grow: 1, flex-shrink: 0, flex-basis, align-self override' },
  { num: 32, cat: 'CSS', title: 'Flexbox Project: Responsive Navbar', topic: 'Building a responsive mobile brand + navigation link bar' },
  { num: 33, cat: 'CSS', title: 'Introduction to CSS Grid', topic: 'display: grid, grid-template-columns, grid-template-rows' },
  { num: 34, cat: 'CSS', title: 'CSS Grid: fr unit, repeat() & minmax()', topic: 'repeat(auto-fit, minmax(250px, 1fr)) responsive columns' },
  { num: 35, cat: 'CSS', title: 'CSS Grid Areas & Item Placement', topic: 'grid-template-areas: "header header" "main side" "footer footer"' },
  { num: 36, cat: 'CSS', title: 'CSS Grid Alignment & Gaps', topic: 'gap, justify-items, align-items, place-items: center' },
  { num: 37, cat: 'CSS', title: 'CSS Grid Project: Responsive Bento Grid', topic: 'Building a modern SaaS Bento-box card dashboard' },
  { num: 38, cat: 'CSS', title: 'Media Queries & Responsive Breakpoints', topic: '@media (min-width: 768px), mobile-first responsive strategy' },
  { num: 39, cat: 'CSS', title: 'Responsive Design Strategy & Best Practices', topic: 'Fluid typography, touch targets (48px+), responsive tables' },
  { num: 40, cat: 'CSS', title: 'Building a Responsive Hamburger Menu', topic: 'Mobile slide-in drawer using checkbox hack or simple JS' },
  { num: 41, cat: 'CSS', title: 'CSS Variables & Dark Theme Switching', topic: ':root { --primary: #a855f7; }, var(--primary), dark class override' },
  { num: 42, cat: 'CSS', title: 'CSS Transitions & Timing Functions', topic: 'transition: all 0.3s ease-in-out, cubic-bezier curves' },
  { num: 43, cat: 'CSS', title: 'CSS Transforms: 2D Manipulations', topic: 'transform: translate(x, y), rotate(45deg), scale(1.1), skew()' },
  { num: 44, cat: 'CSS', title: 'CSS 3D Transforms & Perspective', topic: 'perspective: 1000px, transform: rotateY(180deg) 3D card flip' },
  { num: 45, cat: 'CSS', title: 'CSS Keyframe Animations', topic: '@keyframes pulseGlow { 0% { opacity: 0 } 100% { opacity: 1 } }' },
  { num: 46, cat: 'CSS', title: 'CSS Filters & Backdrop Glassmorphism', topic: 'filter: blur(), backdrop-filter: blur(12px) frosted glass card' },
  { num: 47, cat: 'CSS', title: 'CSS Pseudo-classes: Hover, Focus & Nth-child', topic: ':hover, :focus-visible, :active, :nth-child(2n+1) styling' },
  { num: 48, cat: 'CSS', title: 'CSS Pseudo-elements: ::before & ::after', topic: 'content: "", decorative gradients, badges, custom underlines' },
  { num: 49, cat: 'CSS', title: 'Introduction to Tailwind CSS', topic: 'Utility-first philosophy vs traditional CSS, Tailwind CDN & CLI' },
  { num: 50, cat: 'CSS', title: 'Tailwind Spacing, Typography & Colors', topic: 'p-4, mx-auto, text-2xl font-bold, bg-purple-600 text-white' },
  { num: 51, cat: 'CSS', title: 'Tailwind Flexbox, Grid & Responsive Modifiers', topic: 'flex items-center justify-between md:grid-cols-3 gap-6' },
  { num: 52, cat: 'CSS', title: 'Tailwind Project: SaaS Landing Page Hero', topic: 'Full landing page hero banner with glowing neon button & badge' },

  // JavaScript Track (53-95)
  { num: 53, cat: 'JS', title: 'Introduction to JavaScript: The Engine of the Web', topic: 'Client-side script, JavaScript engines (V8, SpiderMonkey), ECMAScript' },
  { num: 54, cat: 'JS', title: 'Setting up Node.js & Browser DevTools Console', topic: 'console.log(), console.table(), REPL environment & scripts' },
  { num: 55, cat: 'JS', title: 'Variables in JavaScript: var vs let vs const', topic: 'Block scope vs function scope, temporal dead zone, immutability' },
  { num: 56, cat: 'JS', title: 'Primitive Data Types & Typeof Operator', topic: 'Number, String, Boolean, null, undefined, BigInt, Symbol' },
  { num: 57, cat: 'JS', title: 'JavaScript Operators & Expressions', topic: 'Arithmetic, comparison (== loose vs === strict equality), logical && ||' },
  { num: 58, cat: 'JS', title: 'Conditional Statements: if, else if & Ternary', topic: 'Branching logic, truthy/falsy values, condition ? trueVal : falseVal' },
  { num: 59, cat: 'JS', title: 'Switch Case & Control Flow', topic: 'switch (expression) { case x: break; default: } patterns' },
  { num: 60, cat: 'JS', title: 'Loops in JS: for, while & do-while', topic: 'for loop, while condition, break, continue, for...of iterable' },
  { num: 61, cat: 'JS', title: 'Functions, Parameters & Return Values', topic: 'function declaration, default arguments, pure functions' },
  { num: 62, cat: 'JS', title: 'Arrow Functions & Modern ES6 Syntax', topic: 'const fn = (a, b) => a + b, lexical "this" binding' },
  { num: 63, cat: 'JS', title: 'String Manipulation & Template Literals', topic: 'Template strings `${name}`, .slice(), .includes(), .replace(), .trim()' },
  { num: 64, cat: 'JS', title: 'Arrays in JavaScript: Indexing & Basic Methods', topic: 'Array push(), pop(), shift(), unshift(), slice(), splice()' },
  { num: 65, cat: 'JS', title: 'Array Iteration: forEach, map, filter, reduce', topic: '.map() transform, .filter() selection, .reduce() accumulator' },
  { num: 66, cat: 'JS', title: 'Objects in JavaScript: Key-Value Pairs', topic: 'Object literals, dot vs bracket notation, methods, this context' },
  { num: 67, cat: 'JS', title: 'Object Destructuring & Spread/Rest Operators', topic: 'const { name, xp } = user, ...spread copy, rest params (...args)' },
  { num: 68, cat: 'JS', title: 'Introduction to the DOM (Document Object Model)', topic: 'DOM tree hierarchy, document object, window global' },
  { num: 69, cat: 'JS', title: 'Selecting DOM Elements: querySelector & ById', topic: 'document.getElementById(), document.querySelector(), NodeList' },
  { num: 70, cat: 'JS', title: 'Modifying DOM Content & Styles', topic: 'element.textContent, element.innerHTML, element.style, classList.add/toggle' },
  { num: 71, cat: 'JS', title: 'Creating & Removing DOM Elements Dynamically', topic: 'document.createElement(), appendChild(), remove(), cloneNode()' },
  { num: 72, cat: 'JS', title: 'Event Listeners: Click, Keydown, Input', topic: 'addEventListener("click", callback), input event, change event' },
  { num: 73, cat: 'JS', title: 'The Event Object & preventDefault()', topic: 'e.target, e.preventDefault() form submission, e.key keyboard' },
  { num: 74, cat: 'JS', title: 'Event Bubbling, Capturing & Delegation', topic: 'Event propagation phases, e.stopPropagation(), parent delegation' },
  { num: 75, cat: 'JS', title: 'Project: Dynamic Interactive Calculator', topic: 'Stateful evaluation, buttons grid, keyboard entry support' },
  { num: 76, cat: 'JS', title: 'LocalStorage & SessionStorage APIs', topic: 'localStorage.setItem(), getItem(), JSON.stringify() & JSON.parse()' },
  { num: 77, cat: 'JS', title: 'Project: Persistent Todo List App', topic: 'Adding, completing, deleting and persisting tasks in browser' },
  { num: 78, cat: 'JS', title: 'Synchronous vs Asynchronous JavaScript', topic: 'Single thread execution, non-blocking I/O, Web APIs' },
  { num: 79, cat: 'JS', title: 'Callbacks & The Infamous Callback Hell', topic: 'Callback functions, inversion of control, pyramid of doom' },
  { num: 80, cat: 'JS', title: 'JavaScript Promises: Pending, Resolved & Rejected', topic: 'new Promise((resolve, reject) => {}), .then(), .catch(), .finally()' },
  { num: 81, cat: 'JS', title: 'Async/Await: Modern Asynchronous Syntax', topic: 'async function, await promise, try...catch error handling' },
  { num: 82, cat: 'JS', title: 'Fetch API: Fetching Data from REST APIs', topic: 'fetch(url), response.json(), rendering API data on DOM' },
  { num: 83, cat: 'JS', title: 'Fetch API: POST Requests & Sending JSON', topic: 'fetch options: method: "POST", headers: application/json, body' },
  { num: 84, cat: 'JS', title: 'Error Handling: try...catch & Custom Errors', topic: 'try, catch(err), finally, throw new Error("Custom message")' },
  { num: 85, cat: 'JS', title: 'Object-Oriented JS: Prototypes & Inheritance', topic: '__proto__, Prototype chain, Object.prototype, method sharing' },
  { num: 86, cat: 'JS', title: 'ES6 Classes & Constructors', topic: 'class User { constructor(name) { this.name = name; } }' },
  { num: 87, cat: 'JS', title: 'Class Inheritance with extends & super', topic: 'class Admin extends User, super() constructor call, overriding' },
  { num: 88, cat: 'JS', title: 'Static Methods & Getters/Setters', topic: 'static helper methods, get fullName(), set age() validation' },
  { num: 89, cat: 'JS', title: 'JavaScript Scope: Global, Function & Block', topic: 'Lexical environment, scope chain lookup, variable shadowing' },
  { num: 90, cat: 'JS', title: 'Closures Explained with Practical Examples', topic: 'Function bundled with lexical environment, private counters, memoization' },
  { num: 91, cat: 'JS', title: 'Hoisting in JavaScript: Variables vs Functions', topic: 'Creation phase memory allocation, function hoisting vs TDZ' },
  { num: 92, cat: 'JS', title: 'The JavaScript Event Loop & Microtasks', topic: 'Call Stack, Web APIs, Task Queue (setTimeout), Microtasks (Promises)' },
  { num: 93, cat: 'JS', title: 'Debouncing & Throttling Performance Hacks', topic: 'Debounce search bar inputs, throttle window scroll event' },
  { num: 94, cat: 'JS', title: 'Regular Expressions (RegEx) Essentials', topic: 'RegEx syntax /pattern/flags, test(), match(), email validation' },
  { num: 95, cat: 'JS', title: 'Major Project: Spotify Clone Music Player', topic: 'HTML5 Audio API, play/pause, seekbar track, dynamic song playlist' },

  // Backend Track: Node.js & Express (96-110)
  { num: 96, cat: 'Backend', title: 'What is Backend? Client-Server Deep Dive', topic: 'Request-Response cycle, HTTP status codes (200, 201, 400, 404, 500)' },
  { num: 97, cat: 'Backend', title: 'Introduction to Node.js & V8 Runtime', topic: 'Running JS outside browser, non-blocking event-driven architecture' },
  { num: 98, cat: 'Backend', title: 'NPM: Node Package Manager & Dependencies', topic: 'npm init -y, package.json, dependencies vs devDependencies, semantic version' },
  { num: 99, cat: 'Backend', title: 'Node.js Core Modules: fs (File System) & path', topic: 'fs.promises.readFile(), writeFile(), path.join(), __dirname' },
  { num: 100, cat: 'Backend', title: 'CommonJS (require) vs ES Modules (import)', topic: 'require/module.exports vs import/export with "type": "module"' },
  { num: 101, cat: 'Backend', title: 'Creating an HTTP Server with Pure Node.js', topic: 'http.createServer((req, res) => {}), res.writeHead, res.end' },
  { num: 102, cat: 'Backend', title: 'Introduction to Express.js Framework', topic: 'Minimalist web framework, app.get(), app.listen(port)' },
  { num: 103, cat: 'Backend', title: 'Express Routing: GET, POST, PUT, DELETE', topic: 'REST architectural constraints, mapping HTTP verbs to CRUD' },
  { num: 104, cat: 'Backend', title: 'Route Parameters & Query Strings', topic: 'req.params.id dynamic routes, req.query search filters' },
  { num: 105, cat: 'Backend', title: 'Express Middleware & Request Pipeline', topic: 'app.use((req, res, next) => {}), next() function, auth guards' },
  { num: 106, cat: 'Backend', title: 'Serving Static Files with express.static', topic: 'app.use(express.static("public")), serving HTML, CSS & images' },
  { num: 107, cat: 'Backend', title: 'Template Engines: Rendering HTML with EJS', topic: 'res.render("index", { user }), EJS <%= %> tags, reusable header/footer' },
  { num: 108, cat: 'Backend', title: 'Handling POST Form Data & JSON Body', topic: 'express.json() parser, express.urlencoded({ extended: true }), req.body' },
  { num: 109, cat: 'Backend', title: 'Building a Full RESTful CRUD API', topic: 'Complete endpoints for Create, Read, Update, Delete with JSON response' },
  { num: 110, cat: 'Backend', title: 'Environment Variables & dotenv Configuration', topic: 'dotenv package, .env file, process.env.PORT, keeping secrets safe' },

  // Database Track: MongoDB & Mongoose (111-118)
  { num: 111, cat: 'Database', title: 'Introduction to Databases: SQL vs NoSQL', topic: 'Relational tables (Postgres/MySQL) vs JSON document stores (MongoDB)' },
  { num: 112, cat: 'Database', title: 'Installing MongoDB & MongoDB Compass GUI', topic: 'MongoDB Atlas cloud cluster, connection strings, Compass visual tool' },
  { num: 113, cat: 'Database', title: 'MongoDB CRUD Operations in Mongosh Shell', topic: 'db.collection.insertOne(), find(), updateOne(), deleteOne()' },
  { num: 114, cat: 'Database', title: 'Connecting Node.js & Express to MongoDB', topic: 'mongoose.connect(MONGO_URI), handling connection events & errors' },
  { num: 115, cat: 'Database', title: 'Defining Mongoose Schemas & Models', topic: 'new mongoose.Schema({ title: String }), mongoose.model("Task", schema)' },
  { num: 116, cat: 'Database', title: 'Data Validation & Sanitization in Mongoose', topic: 'required: true, minLength, enum values, custom validators' },
  { num: 117, cat: 'Database', title: 'Advanced Queries, Sorting & Pagination', topic: '.find({ age: { $gte: 18 } }).sort({ date: -1 }).limit(10).skip(0)' },
  { num: 118, cat: 'Database', title: 'Complete Express + MongoDB REST API Project', topic: 'Production ready API connected to live MongoDB database with error handling' },

  // React & Next.js Track (119-139)
  { num: 119, cat: 'React', title: 'User Authentication: Sessions, Cookies & JWT', topic: 'JSON Web Tokens (JWT), jwt.sign(), jwt.verify(), Bearer authorization' },
  { num: 120, cat: 'React', title: 'Password Hashing & Security with bcrypt', topic: 'bcrypt.hash(password, salt), bcrypt.compare(), protecting user credentials' },
  { num: 121, cat: 'React', title: 'Introduction to React.js & The Virtual DOM', topic: 'Declarative component-based UI, reconciliation algorithm, diffing' },
  { num: 122, cat: 'React', title: 'Setting Up React with Vite & Understanding JSX', topic: 'Vite ultra-fast bundler, JSX syntax rules, fragments <>, curly expressions' },
  { num: 123, cat: 'React', title: 'React Components, Props & Reusability', topic: 'Functional components, passing props, destructuring, props.children' },
  { num: 124, cat: 'React', title: 'React State Management with useState Hook', topic: 'const [count, setCount] = useState(0), immutable state updates' },
  { num: 125, cat: 'React', title: 'Handling Events & Conditional Rendering', topic: 'onClick={handleClick}, ternary condition ? <A /> : <B />, && rendering' },
  { num: 126, cat: 'React', title: 'Side Effects & API Calls with useEffect', topic: 'useEffect(() => {}, [deps]), component mount, cleanup function' },
  { num: 127, cat: 'React', title: 'Controlled Forms & Input Handling in React', topic: 'value={formData.email}, onChange={handleChange}, onSubmit' },
  { num: 128, cat: 'React', title: 'React Router: Multi-Page Navigation', topic: 'BrowserRouter, Routes, Route, Link component, useParams() hook' },
  { num: 129, cat: 'React', title: 'Introduction to Next.js & App Router', topic: 'Fullstack React framework, Server-Side Rendering (SSR), Static Generation (SSG)' },
  { num: 130, cat: 'React', title: 'Server Components vs Client Components', topic: 'Default React Server Components, "use client" directive, bundle reduction' },
  { num: 131, cat: 'React', title: 'Next.js File-Based Routing & Dynamic Routes', topic: 'app/page.js, app/layout.js, app/blog/[slug]/page.js dynamic folders' },
  { num: 132, cat: 'React', title: 'Next.js Server Actions & Database Mutations', topic: '"use server" async functions, mutating database directly from server actions' },
  { num: 133, cat: 'React', title: 'Next.js API Route Handlers (route.js)', topic: 'export async function GET(request) {}, export async function POST()' },
  { num: 134, cat: 'React', title: 'Fullstack Project 1: Password Manager (PassOP)', topic: 'Building a secure offline/online credential vault with copy & local DB' },
  { num: 135, cat: 'React', title: 'Fullstack Project 2: URL Shortener with Analytics', topic: 'Short code generation, redirect routes, click tracking in MongoDB' },
  { num: 136, cat: 'React', title: 'Fullstack Project 3: Patreon Clone (GetMeAChai) Part 1', topic: 'NextAuth.js authentication, creator dashboards, Razorpay setup' },
  { num: 137, cat: 'React', title: 'Fullstack Project 3: Patreon Clone (GetMeAChai) Part 2', topic: 'Payment webhooks, tipping supporters list, public creator page' },
  { num: 138, cat: 'React', title: 'Production Deployment: Vercel, Render & VPS', topic: 'Deploying frontend to Vercel, backend to Render, environment variables' },
  { num: 139, cat: 'React', title: 'Web Developer Roadmap & Course Conclusion', topic: 'Resume tips, GitHub portfolio building, freelance & fullstack career guide' }
];

// Helper to synthesize rich W3Schools + MDN + freeCodeCamp content
const generateEnrichedChapter = (ch) => {
  const numStr = String(ch.num).padStart(3, '0');
  const xpReward = 50 + (ch.num % 5) * 10;

  // Real-world analogy mapping based on track
  let analogy = '';
  if (ch.cat === 'HTML') {
    analogy = 'Think of HTML like the skeleton and brick walls of a newly constructed house. Before you paint or furnish it, you need strong structure and proper doors.';
  } else if (ch.cat === 'CSS') {
    analogy = 'Think of CSS like interior decoration, wall paint, lighting, and layout design. It transforms a bare concrete wall into a luxurious lounge.';
  } else if (ch.cat === 'JS') {
    analogy = 'Think of JavaScript like the electrical wiring, smart appliances, sensors, and remote controls. It makes the house react when you tap a switch!';
  } else if (ch.cat === 'Backend') {
    analogy = 'Think of Backend like the central power plant and water supply pipeline. It works silently in the background processing heavy requests.';
  } else if (ch.cat === 'Database') {
    analogy = 'Think of the Database like a high-security organized digital locker room. Every piece of user information has a dedicated shelf.';
  } else {
    analogy = 'Think of React and Next.js like pre-fabricated smart Lego blocks. Instead of building every brick from scratch, you assemble reusable modules.';
  }

  // W3Schools Easy Concept in 3 Languages
  const w3Concept = {
    en: `**Simple Definition (W3Schools Style):**
${ch.topic}.

🏠 **Real-World Analogy:**
${analogy}

✅ **What you need to remember:**
- Master the fundamental syntax before adding complexity.
- Every element has a clear role in web architecture.
- Keep your code clean, readable, and well-structured.`,

    hi: `**सरल परिभाषा (W3Schools शैली):**
${ch.topic}।

🏠 **दैनिक जीवन का उदाहरण (Real-World Analogy):**
${ch.cat === 'HTML' ? 'HTML को एक नए मकान की ईंटों और ढांचे (कंकाल) की तरह समझें। पेंटिंग और सजावट से पहले मजबूत ढांचा जरूरी है।' : ch.cat === 'CSS' ? 'CSS को मकान की पुताई, इंटीरियर डिजाइन और लाइटों की तरह समझें जो इसे सुंदर बनाती है।' : ch.cat === 'JS' ? 'JavaScript को घर की बिजली और स्विच बोर्ड की तरह समझें, जिसके बिना पंखे और लाइट काम नहीं करेंगे!' : 'बैकएंड और डेटाबेस सर्वर के उस मुख्य पावर प्लांट की तरह हैं जो बैकग्राउंड में सारा डेटा संभालते हैं।'}

✅ **याद रखने योग्य मुख्य बातें:**
- पहले बुनियादी सिंटैक्स को समझें, फिर आगे बढ़ें।
- प्रत्येक कोड टैग का वेबपेज पर एक खास उद्देश्य होता है।
- कोड को हमेशा साफ-सुथरा और समझने योग्य रखें।`,

    hinglish: `**Ekdam Easy Definition (W3Schools Style):**
${ch.topic}.

🏠 **Asli Zindagi Ka Example (Analogy):**
${ch.cat === 'HTML' ? 'HTML basically ek nayi building ka structure aur kankal hai bro. Bina eenton ke building khadi nahi ho sakti!' : ch.cat === 'CSS' ? 'CSS matlab luxury interior design aur neon lighting. Bare structure ko aesthetic banane ka pura credit CSS ko jata hai!' : ch.cat === 'JS' ? 'JavaScript matlab ghar ke smart sensors aur switches. Button dabane par light jalegi ya nahi, yeh JS decide karta hai!' : 'Backend aur Database restaurant ke kitchen jaise hain, jahan chef silently sabka order cook karta hai!'}

✅ **Sigma Rules To Remember:**
- Ratna bilkul mana hai, concept ko logically samjho.
- Code likhte waqt modern standards follow karo (No legacy bad habits!).
- Hands-on practice karo: live playground me execute karke verify karo! 🔥`
  };

  // MDN Deep Dive & Best Practices in 3 Languages
  const mdnDeepDive = {
    en: `### 📚 MDN Web Docs Deep Dive & Best Practices
1. **Semantic & Accessibility (a11y)**:
   Always prioritize semantic elements for screen readers and search engines. Avoid empty div nesting.
2. **Performance & Standards**:
   Follow modern ECMAScript and W3C web standards. Understand the browser render tree and paint cycles.
3. **Common Pitfall to Avoid**:
   Do not mix styling directly in markup; keep separation of concerns (HTML for content, CSS for presentation, JS for behavior).`,

    hi: `### 📚 MDN वेब डॉक्स प्रो-टिप्स और मानक (Best Practices)
1. **एक्सेसिबिलिटी और सिमेंटिक्स (a11y)**:
   हमेशा अर्थपूर्ण (semantic) टैग्स का उपयोग करें ताकि स्क्रीन-रीडर्स और Google सर्च इंजन आपकी साइट को आसानी से समझ सकें।
2. **परफॉर्मेंस और आधुनिक नियम**:
   पुराने तरीकों को छोड़कर आधुनिक वेब मानकों का पालन करें। ब्राउज़र आपके कोड को कैसे रेंडर करता है, इसे समझें।
3. **आम गलती जिससे बचें**:
   HTML में इनलाइन स्टाइल का अंधाधुंध इस्तेमाल न करें; संरचना और डिज़ाइन को हमेशा अलग-अलग फाइलों में रखें।`,

    hinglish: `### 📚 MDN Pro Developer Secrets & Best Practices
1. **Semantic HTML & Clean Architecture**:
   Div soup mat banao bro! MDN recommend karta hai semantic tags use karna SEO aur accessibility boost ke liye.
2. **Modern Standards (No Cap)**:
   Purane deprecated attributes ko bye-bye bolo aur modern clean syntax use karo.
3. **Classic Bug Alert**:
   Styling aur logic ko HTML ke andar mix mat karo. Clean separation of concerns = Senior developer mindset! 👑`
  };

  // freeCodeCamp Hands-on Mission / Exercise
  const fccExercise = {
    en: `### 🎯 freeCodeCamp Practice Mission
**Your Objective:**
Build a practical, real-world component demonstrating **${ch.title}**.

**Step-by-Step Instructions:**
1. Open the **Code Lab** tab.
2. Write the blueprint code provided below.
3. Test your changes live and verify that the layout renders correctly without console errors!`,

    hi: `### 🎯 freeCodeCamp प्रैक्टिकल कोडिंग टास्क
**आपका लक्ष्य:**
**${ch.title}** का उपयोग करके एक वास्तविक और उपयोगी वेब घटक (component) बनाएं।

**कदम-दर-कदम निर्देश:**
1. नीचे **Code Lab** टैब खोलें।
2. नीचे दिया गया ब्लू-प्रिंट कोड वहां चलाएं।
3. अपने आउटपुट को ब्राउज़र प्रीव्यू में लाइव टेस्ट करें और सीखें!`,

    hinglish: `### 🎯 freeCodeCamp Hands-on Coding Challenge
**Aapka Mission:**
**${ch.title}** ko master karne ke liye ek live working component assemble karo!

**Step-by-Step Guide:**
1. "Run in Code Lab 🚀" button par tap karo.
2. Code ke andar values change karke dekho (experimentation is key!).
3. Live preview me result verify karo aur concept lock kar lo! ⚡`
  };

  // Rich Interactive Code Snippets
  let codeSnippet = '';
  if (ch.cat === 'HTML') {
    codeSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${ch.title}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #090d16; color: #f8fafc; padding: 24px; text-align: center; }
    .box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    h2 { color: #38bdf8; margin-top: 0; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
    .tag-badge { background: #a855f7; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; }
  </style>
</head>
<body>
  <div class="box">
    <span class="tag-badge">Chapter #${ch.num} • MDN & W3Schools</span>
    <h2>${ch.title}</h2>
    <p>${ch.topic}</p>
    <button onclick="alert('Mastered Chapter #${ch.num}!')" style="background: #38bdf8; border: none; color: #090d16; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Test Output 🚀</button>
  </div>
</body>
</html>`;
  } else if (ch.cat === 'CSS') {
    codeSnippet = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #090d16; font-family: sans-serif; }
    .card {
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      border: 1px solid #a855f7;
      border-radius: 16px;
      padding: 24px;
      color: white;
      text-align: center;
      max-width: 320px;
      box-shadow: 0 0 25px rgba(168, 85, 247, 0.3);
      transition: transform 0.3s ease;
    }
    .card:hover { transform: translateY(-5px); }
    h2 { color: #38bdf8; margin: 0 0 10px; }
    .highlight { color: #f472b6; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>CSS3 • Chapter #${ch.num}</h2>
    <p>Focus: <span class="highlight">${ch.topic}</span></p>
    <p style="font-size: 13px; color: #94a3b8;">Styled with MDN recommended CSS standards.</p>
  </div>
</body>
</html>`;
  } else if (ch.cat === 'JS') {
    codeSnippet = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #090d16; color: white; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .console-box { background: #020617; border: 1px solid #38bdf8; border-radius: 12px; padding: 20px; width: 320px; text-align: center; }
    button { background: #22c55e; color: #020617; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    #log { color: #facc15; margin-top: 12px; font-size: 13px; min-height: 20px; }
  </style>
</head>
<body>
  <div class="console-box">
    <h3 style="color: #38bdf8; margin: 0;">JS Chapter #${ch.num}</h3>
    <p style="color: #94a3b8; font-size: 12px;">${ch.topic}</p>
    <button id="run-btn">Execute Logic ⚡</button>
    <div id="log">Click button to run...</div>
  </div>

  <script>
    document.getElementById('run-btn').addEventListener('click', () => {
      const output = 'Output: ${ch.title} executed cleanly! 🚀';
      document.getElementById('log').textContent = output;
      console.log(output);
    });
  </script>
</body>
</html>`;
  } else {
    codeSnippet = `// ${ch.cat} Chapter #${ch.num}: ${ch.title}
// Best practices inspired by MDN & freeCodeCamp
console.log('🚀 Loading Chapter #${ch.num}: ${ch.title}');
console.log('💡 Core Topic: ${ch.topic}');

function executeModule() {
  return {
    chapter: ${ch.num},
    topic: '${ch.topic}',
    status: 'Mastered ✅',
    xpAwarded: ${xpReward}
  };
}

console.log(executeModule());`;
  }

  // Quiz
  const quiz = {
    question: {
      en: `According to MDN and W3Schools, what is the best practice for "${ch.title}"?`,
      hi: `MDN और W3Schools के अनुसार, "${ch.title}" के लिए सबसे अच्छा मानक (best practice) क्या है?`,
      hinglish: `MDN aur W3Schools ke standard ke hisaab se "${ch.title}" ka main purpose kya hai?`
    },
    options: [
      `To implement ${ch.topic} with clean, standard syntax`,
      'To write inline styling without separate structure',
      'It is deprecated and should be avoided in modern web',
      'None of the above'
    ],
    correct: 0,
    explanation: `Correct! ${ch.title} ensures proper implementation of ${ch.topic} following MDN guidelines.`
  };

  // Reference links
  const references = [
    { name: 'MDN Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
    { name: 'W3Schools', url: 'https://www.w3schools.com/' },
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/' }
  ];

  return {
    id: `sigma_${numStr}`,
    number: ch.num,
    category: ch.cat,
    title: {
      en: `Tutorial #${ch.num}: ${ch.title}`,
      hi: `पाठ #${ch.num}: ${ch.title}`,
      hinglish: `Chapter #${ch.num}: ${ch.title}`
    },
    topic: ch.topic,
    w3Concept,
    mdnDeepDive,
    fccExercise,
    code: codeSnippet,
    xpReward,
    quiz,
    references
  };
};

const fullChapters = rawChapters.map(generateEnrichedChapter);

const outputFilePath = path.join(process.cwd(), 'client', 'src', 'data', 'chaptersData.js');

const content = `// Complete 139 Chapters of CodeWithHarry Sigma Web Development Course
// Enriched with MDN Web Docs, W3Schools, and freeCodeCamp learning materials
// 100% Offline-ready with trilingual support (Hinglish, Hindi, English)

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
console.log(`✅ Successfully generated ${fullChapters.length} enriched chapters in: ${outputFilePath}`);

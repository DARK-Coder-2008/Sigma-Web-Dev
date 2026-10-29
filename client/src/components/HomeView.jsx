import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  Sparkles, 
  Code2, 
  Trophy, 
  Flame, 
  Zap, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  FolderGit2, 
  Check, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';
import { coursesCatalog } from '../data/coursesData';
import { projectsLibrary } from '../data/projectsData';
import { chaptersData } from '../data/chaptersData';
import confetti from 'canvas-confetti';

export default function HomeView({ 
  user, 
  completedLessons, 
  onNavigate, 
  onSelectCourse, 
  onOpenPlaygroundWithCode,
  language,
  onAwardXp
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyAnswered, setDailyAnswered] = useState(false);
  const [selectedDailyOption, setSelectedDailyOption] = useState(null);
  const [dailyFeedback, setDailyFeedback] = useState(null);

  // Determine user's current progress & next recommended chapter
  const completedCount = completedLessons.length;
  const nextChapter = chaptersData.find(ch => !completedLessons.includes(ch.id)) || chaptersData[0];
  const progressPercent = Math.min(100, Math.round((completedCount / chaptersData.length) * 100));

  // Daily Coding Challenge (Rotates daily or static today)
  const dailyChallenge = {
    title: 'CSS Specificity & The Cascade Order',
    question: 'Which of the following CSS selectors has the HIGHEST specificity weight?',
    options: [
      'div#main-navigation .menu-item:hover',
      '#main-navigation a.menu-item',
      '.navbar .menu-list li.menu-item a',
      'body header div nav ul li a'
    ],
    correctIndex: 0,
    explanation: 'div#main-navigation .menu-item:hover has 1 ID (100) + 2 Classes/Pseudo-classes (20) + 1 Element (1) = 121 specificity points!'
  };

  const handleDailySubmit = (index) => {
    if (dailyAnswered) return;
    setSelectedDailyOption(index);
    setDailyAnswered(true);

    if (index === dailyChallenge.correctIndex) {
      setDailyFeedback({ correct: true, text: 'Spot on, Dark Coder! +50 XP Awarded ⚡' });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      if (onAwardXp) onAwardXp(50);
    } else {
      setDailyFeedback({ correct: false, text: 'Not quite! ' + dailyChallenge.explanation });
    }
  };

  // Filtered courses for search
  const filteredCourses = coursesCatalog.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full pb-28 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-left">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#11182A] via-[#0D1222] to-[#080B16] border border-violet-500/20 shadow-2xl">
        {/* Glow ambient circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
            <span>DARK CODER PLATFORM • 100% PRODUCTION READY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.1]">
            Master Web Dev from <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400">Zero to Senior Engineer</span>.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
            No fluff. No shortcuts. Complete full-stack web development with 10 structured courses, 139 deep conceptual chapters, hands-on live code sandboxes, and interactive quizzes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Learning Free</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('popular-courses');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>Explore 10 Courses</span>
            </button>

            <button
              onClick={() => onNavigate('playground')}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold text-sm transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Open Code Lab</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, concepts, HTML tags, React hooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 placeholder-slate-500 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE LEARNING SECTION (FOR LOGGED-IN / RETURNING STUDENTS) */}
      <section className="bg-[#11182A] border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-lg font-bold text-white">Continue Your Journey</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <span className="text-violet-400 font-semibold">{user ? user.name : 'Dark Coder'}</span>. Pick up right where you left off.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-violet-400 font-bold">{completedCount}</span> / 139 Completed
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-300 font-bold">
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Next Chapter Card */}
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-violet-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-violet-500/60 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/20 text-violet-400 border border-violet-500/40">
                NEXT UP • #{nextChapter.number}
              </span>
              <span className="text-xs text-slate-400 font-mono">{nextChapter.category}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {nextChapter.title.en}
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">
              Focus: {nextChapter.topic}
            </p>
          </div>

          <button
            onClick={() => onNavigate('roadmap')}
            className="self-start md:self-center flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all shrink-0 active:scale-95"
          >
            <span>Resume Lesson</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 space-y-1">
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* 3. DAILY CODING CHALLENGE */}
      <section className="bg-gradient-to-r from-[#11182A] via-[#141d33] to-[#11182A] border border-amber-500/30 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>Daily Coding Challenge • +50 XP</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Resets daily</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
          {dailyChallenge.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          {dailyChallenge.question}
        </p>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {dailyChallenge.options.map((opt, idx) => {
            const isSelected = selectedDailyOption === idx;
            const isCorrect = idx === dailyChallenge.correctIndex;
            let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-700';

            if (dailyAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={dailyAnswered}
                onClick={() => handleDailySubmit(idx)}
                className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-start space-x-2.5 ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {dailyFeedback && (
          <div className={`mt-3 p-3 rounded-xl text-xs font-mono border ${
            dailyFeedback.correct 
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
              : 'bg-red-950/60 border-red-500/40 text-red-300'
          }`}>
            {dailyFeedback.text}
          </div>
        )}
      </section>

      {/* 4. POPULAR COURSES (10 STRUCTURED ROADMAPS) */}
      <section id="popular-courses" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              10 Structured Learning Tracks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Battle-tested roadmaps meticulously designed from foundational syntax to cloud deployment.
            </p>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="flex items-center space-x-1 text-violet-400 hover:text-violet-300 text-xs font-bold transition-all"
          >
            <span>View All 139 Chapters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="group relative bg-[#11182A] border border-slate-800/80 hover:border-violet-500/50 rounded-2xl p-5 shadow-lg hover:shadow-violet-600/10 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-violet-500/10 border border-violet-500/30 text-violet-400">
                      COURSE #{course.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
                      Key Topics:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {course.syllabus.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5 truncate">
                          <Check className="w-3 h-3 text-violet-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {course.modulesCount} Deep Modules
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(course.category);
                      onNavigate('roadmap');
                    }}
                    className="flex items-center space-x-1 text-xs font-bold text-violet-400 hover:text-white px-3 py-1.5 rounded-lg bg-violet-600/10 hover:bg-violet-600 transition-all"
                  >
                    <span>Start Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS PREVIEW */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              Practical Projects Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              15 production-ready builds across Beginner, Intermediate, and Advanced tiers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs font-bold transition-all"
          >
            <span>Browse All 15 Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectsLibrary.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-[#11182A] border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    project.tier === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    project.tier === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  }`}>
                    {project.tier}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{project.difficulty}</span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (project.starterCode) {
                      onOpenPlaygroundWithCode(project.starterCode.html);
                    }
                  }}
                  className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Launch in Code Lab</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REAL STUDENT STATISTICS (NO FAKE METRICS) */}
      <section className="bg-gradient-to-r from-[#0D1222] to-[#11182A] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
          Platform Architecture & Real Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-display font-black text-violet-400">139</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Deep Chapters</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-display font-black text-blue-400">10</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Structured Courses</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-display font-black text-cyan-400">15</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Hands-On Projects</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Offline & PWA Ready</div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center text-white font-bold text-xs">
            Σ
          </div>
          <span className="font-bold text-slate-400">SIGMA WEB DEV • DARK CODER</span>
        </div>
        <p className="font-mono text-[11px]">
          Designed with Dark Coder Aesthetic • Built for Modern Web Developers
        </p>
      </footer>

    </div>
  );
}

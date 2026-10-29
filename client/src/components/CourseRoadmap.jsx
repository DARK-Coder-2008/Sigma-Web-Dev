import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  Code,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  Zap,
  Flame,
  Layers,
  FileCode,
  Smartphone,
  ExternalLink,
  Target,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Check,
  Play,
  Download
} from 'lucide-react';
import { chaptersData, categoriesList } from '../data/chaptersData';
import { coursesCatalog } from '../data/coursesData';
import { debouncedSaveProfile } from '../services/firestoreService';

export default function CourseRoadmap({
  user,
  completedLessons = [],
  onCompleteLesson,
  language = 'hinglish',
  onOpenPlaygroundWithCode,
  onOpenApkModal
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterId, setActiveChapterId] = useState('sigma_001');
  const [selectedPageTab, setSelectedPageTab] = useState('page1'); // 'page1' | 'page2' | 'page3' | 'quiz'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sigma_bookmarked_chapters') || '[]');
    } catch {
      return [];
    }
  });

  // Sync bookmarks from authenticated user profile if available
  useEffect(() => {
    if (user?.bookmarkedChapters && Array.isArray(user.bookmarkedChapters)) {
      setBookmarkedIds(user.bookmarkedChapters);
    }
  }, [user?.bookmarkedChapters]);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return chaptersData.filter((ch) => {
      const matchesCat = selectedCategory === 'ALL' || ch.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch =
        String(ch.number).includes(q) ||
        (ch.title.en && ch.title.en.toLowerCase().includes(q)) ||
        (ch.topic && ch.topic.toLowerCase().includes(q)) ||
        (ch.title.hi && ch.title.hi.toLowerCase().includes(q)) ||
        (ch.title.hinglish && ch.title.hinglish.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active Chapter Object
  const currentChapter = useMemo(() => {
    return chaptersData.find(c => c.id === activeChapterId) || chaptersData[0];
  }, [activeChapterId]);

  const handleToggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('sigma_bookmarked_chapters', JSON.stringify(updated));
      if (user?.uid) {
        debouncedSaveProfile(user.uid, { bookmarkedChapters: updated });
      }
      return updated;
    });
  };

  const handleQuizAnswer = (chapterId, optionIndex, correctIndex) => {
    const isCorrect = optionIndex === correctIndex;
    setSelectedAnswers(prev => ({ ...prev, [chapterId]: optionIndex }));
    setQuizResults(prev => ({ ...prev, [chapterId]: isCorrect }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleComplete = (chapterId) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCompleteLesson(chapterId, quizResults[chapterId] ? 1 : 0);
  };

  const handleNavigateNext = () => {
    const currentIndex = chaptersData.findIndex(c => c.id === activeChapterId);
    if (currentIndex < chaptersData.length - 1) {
      setActiveChapterId(chaptersData[currentIndex + 1].id);
      setSelectedPageTab('page1');
    }
  };

  const handleNavigatePrev = () => {
    const currentIndex = chaptersData.findIndex(c => c.id === activeChapterId);
    if (currentIndex > 0) {
      setActiveChapterId(chaptersData[currentIndex - 1].id);
      setSelectedPageTab('page1');
    }
  };

  const getCategoryBadgeColor = (cat) => {
    switch (cat) {
      case 'HTML': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'CSS': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'JS': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Backend': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Database': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'React': return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="w-full pb-28 pt-4 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 text-left">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#11182A] via-[#0D1222] to-[#080B16] border border-violet-500/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% OFFLINE CURRICULUM</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold">
                DARK CODER ARCHITECTURE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white">
              Complete Web Development Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              139 exhaustive chapters with 3-page deep conceptual notes, production blueprints, interactive quizzes, and live code runners.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={onOpenApkModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-cyan-500/10 hover:from-violet-600/30 hover:to-blue-600/30 border border-violet-500/40 text-violet-300 hover:text-white font-bold transition-all active:scale-95 shadow-sm"
              title="Download APK or Install Mobile App"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download APK / App</span>
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-violet-400 font-bold">{completedLessons.length}</span> / 139 Done
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between text-xs text-slate-400 font-mono mb-1.5">
            <span>Platform Mastery</span>
            <span className="text-violet-400 font-bold">
              {Math.min(100, Math.round((completedLessons.length / 139) * 100))}%
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (completedLessons.length / 139) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 text-xs px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${isSelected
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-[#11182A] text-slate-400 hover:text-white border border-slate-800'
                }`}
            >
              {cat.label[language] || cat.label.hinglish || cat.label.en}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chapter #, topic (e.g. flexbox, dom, mongodb, promises)..."
          className="w-full bg-[#11182A] border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Two-Column Responsive Layout: Sidebar List + Main Deep Notes Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: CHAPTERS LIST (4 COLS ON DESKTOP) */}
        <div className="lg:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-1">
          <div className="text-xs font-mono text-slate-400 pb-1 flex justify-between">
            <span>Showing {filteredChapters.length} Chapters</span>
            <span className="text-violet-400 font-bold">139 Total</span>
          </div>

          {filteredChapters.map((chapter) => {
            const isSelected = activeChapterId === chapter.id;
            const isCompleted = completedLessons.includes(chapter.id);
            const isBookmarked = bookmarkedIds.includes(chapter.id);

            return (
              <div
                key={chapter.id}
                onClick={() => {
                  setActiveChapterId(chapter.id);
                  setSelectedPageTab('page1');
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isSelected
                    ? 'bg-[#18233C] border-violet-500/80 shadow-lg shadow-violet-600/20'
                    : isCompleted
                      ? 'bg-[#0E1524] border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-[#11182A] border-slate-800/80 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isSelected
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : `#${chapter.number}`}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getCategoryBadgeColor(chapter.category)}`}>
                        {chapter.category}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        +{chapter.xpReward} XP
                      </span>
                    </div>
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {chapter.title[language] || chapter.title.hinglish || chapter.title.en}
                    </p>
                  </div>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={(e) => handleToggleBookmark(chapter.id, e)}
                  className="p-1 text-slate-500 hover:text-amber-400 shrink-0 ml-1"
                  title="Bookmark Lesson"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: 3-PAGE DEEP NOTES VIEWER (8 COLS ON DESKTOP) */}
        <div className="lg:col-span-8 bg-[#11182A] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">

          {/* Active Chapter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCategoryBadgeColor(currentChapter.category)}`}>
                  {currentChapter.category} • CHAPTER #{currentChapter.number}
                </span>
                <span className="text-xs text-cyan-400 font-mono font-bold">
                  +{currentChapter.xpReward} XP
                </span>
                {completedLessons.includes(currentChapter.id) && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                {currentChapter.title[language] || currentChapter.title.hinglish || currentChapter.title.en}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Target Architecture: {currentChapter.topic}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenPlaygroundWithCode(currentChapter.code)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 text-xs font-bold transition-all active:scale-95"
                title="Launch in Code Lab Sandbox"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Open in Code Lab</span>
              </button>
            </div>
          </div>

          {/* 3 A4-Page Document Tabs */}
          <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setSelectedPageTab('page1')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${selectedPageTab === 'page1'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Page 1: Architecture</span>
            </button>

            <button
              onClick={() => setSelectedPageTab('page2')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${selectedPageTab === 'page2'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Page 2: Syntax & Rules</span>
            </button>

            <button
              onClick={() => setSelectedPageTab('page3')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${selectedPageTab === 'page3'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Page 3: Code & Mission</span>
            </button>

            <button
              onClick={() => setSelectedPageTab('quiz')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${selectedPageTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-amber-400 hover:text-amber-300'
                }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Chapter Quiz</span>
            </button>
          </div>

          {/* TAB 1: PAGE 1 NOTES */}
          {selectedPageTab === 'page1' && (
            <div className="bg-[#080B16] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-violet-600 selection:text-white">
              {currentChapter.notes?.page1?.[language] || currentChapter.notes?.page1?.hinglish || currentChapter.notes?.page1?.en}
            </div>
          )}

          {/* TAB 2: PAGE 2 NOTES */}
          {selectedPageTab === 'page2' && (
            <div className="bg-[#080B16] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-violet-600 selection:text-white">
              {currentChapter.notes?.page2?.[language] || currentChapter.notes?.page2?.hinglish || currentChapter.notes?.page2?.en}
            </div>
          )}

          {/* TAB 3: PAGE 3 NOTES */}
          {selectedPageTab === 'page3' && (
            <div className="space-y-4">
              <div className="bg-[#080B16] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-violet-600 selection:text-white">
                {currentChapter.notes?.page3?.[language] || currentChapter.notes?.page3?.hinglish || currentChapter.notes?.page3?.en}
              </div>

              {/* Code Preview Box */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Executable Chapter Sample</span>
                  <button
                    onClick={() => onOpenPlaygroundWithCode(currentChapter.code)}
                    className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    <Play className="w-3 h-3 fill-cyan-400" />
                    <span>Run in Sandbox</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-violet-300 bg-[#080B16] p-3 rounded-xl border border-slate-800 overflow-x-auto">
                  <code>{currentChapter.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CHAPTER QUIZ */}
          {selectedPageTab === 'quiz' && currentChapter.quiz && (
            <div className="bg-[#0D1222] border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Chapter #{currentChapter.number} Knowledge Check</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {currentChapter.quiz.question[language] || currentChapter.quiz.question.hinglish || currentChapter.quiz.question.en}
              </h4>

              <div className="space-y-2 pt-1">
                {currentChapter.quiz.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentChapter.id] === idx;
                  const isCorrect = idx === currentChapter.quiz.correct;
                  const hasAnswered = selectedAnswers[currentChapter.id] !== undefined;

                  let optClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (hasAnswered) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      optClass = 'bg-red-950/80 border-red-500 text-red-200';
                    } else {
                      optClass = 'bg-slate-900/40 border-slate-800/40 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleQuizAnswer(currentChapter.id, idx, currentChapter.quiz.correct)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-start space-x-2.5 ${optClass}`}
                    >
                      <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswers[currentChapter.id] !== undefined && (
                <div className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed ${quizResults[currentChapter.id]
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}>
                  <p className="font-bold mb-1">
                    {quizResults[currentChapter.id] ? '✅ Correct Answer!' : '❌ Incorrect Selection'}
                  </p>
                  <p>{currentChapter.quiz.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Actions: Previous, Mark Complete, Next */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleNavigatePrev}
              disabled={currentChapter.number === 1}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            {/* Complete Lesson Button */}
            <button
              onClick={() => handleComplete(currentChapter.id)}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${completedLessons.includes(currentChapter.id)
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-violet-600/30'
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedLessons.includes(currentChapter.id)
                  ? 'Completed (Click to Re-award)'
                  : `Mark Chapter Completed (+${currentChapter.xpReward} XP)`}
              </span>
            </button>

            <button
              onClick={handleNavigateNext}
              disabled={currentChapter.number === 139}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
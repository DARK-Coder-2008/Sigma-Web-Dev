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
  Smartphone
} from 'lucide-react';
import { translations } from '../i18n/translations';
import { chaptersData, categoriesList } from '../data/chaptersData';

export default function CourseRoadmap({ 
  completedLessons, 
  onCompleteLesson, 
  language,
  onOpenPlaygroundWithCode,
  onOpenApkModal
}) {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterId, setActiveChapterId] = useState('sigma_001');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return chaptersData.filter((ch) => {
      const matchesCat = selectedCategory === 'ALL' || ch.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch = 
        String(ch.number).includes(q) ||
        ch.title.en.toLowerCase().includes(q) ||
        ch.topic.toLowerCase().includes(q) ||
        (ch.title.hi && ch.title.hi.toLowerCase().includes(q)) ||
        (ch.title.hinglish && ch.title.hinglish.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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

  const getCategoryBadgeColor = (cat) => {
    switch (cat) {
      case 'HTML': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'CSS': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'JS': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Backend': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Database': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'React': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Hero Banner with Offline & APK Badge */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/20 shadow-xl">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Offline Ready</span>
          </span>

          {/* Download APK Quick Action */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold hover:bg-cyan-500/30 transition-all active:scale-95"
          >
            <Smartphone className="w-3 h-3" />
            <span>Download APK 📱</span>
          </button>
        </div>

        <h2 className="text-lg font-display font-black text-white mt-2 leading-tight">
          {language === 'hi' 
            ? 'सिग्मा वेब डेवलपमेंट: पूरे 139 अध्याय' 
            : language === 'hinglish' 
            ? 'Sigma Web Dev: 139 Complete Chapters 🔥' 
            : 'Sigma Web Dev: All 139 Chapters'}
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {language === 'hi' 
            ? 'वीडियो समरी, थ्योरी नोट्स, कोड स्निपेट्स और क्विज़ के साथ संपूर्ण पाठ्यक्रम।' 
            : language === 'hinglish' 
            ? 'Zero fluff, pure theory summaries, code blueprints aur quizzes for all 139 tutorials!' 
            : 'Comprehensive theory summaries, syntax blueprints & quizzes for all 139 tutorials.'}
        </p>

        {/* Progress Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
            <span>Overall Progress</span>
            <span className="text-purple-400 font-bold">
              {completedLessons.length} / 139 Chapters Done
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (completedLessons.length / 139) * 100)}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Pills (HTML, CSS, JS, Backend, Database, React) */}
      <div className="overflow-x-auto flex space-x-1.5 pb-1 no-scrollbar">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label[language] || cat.label.hinglish || cat.label.en}
            </button>
          );
        })}
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'hi' 
              ? 'अध्याय संख्या या टॉपिक खोजें (उदा. 1, flexbox, dom, mongodb)...' 
              : language === 'hinglish' 
              ? 'Search chapter # ya topic (eg. 1, flexbox, dom, react)...' 
              : 'Search chapter # or topic (e.g. flexbox, promises, react)...'
          }
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-slate-500 hover:text-white text-xs font-mono"
          >
            ✕
          </button>
        )}
      </div>

      {/* Chapters Count Badge */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1 font-mono">
        <span>Showing {filteredChapters.length} Chapters</span>
        <span className="text-[11px] text-cyan-400">Tap to read theory & code</span>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {filteredChapters.map((chapter) => {
          const isExpanded = activeChapterId === chapter.id;
          const isCompleted = completedLessons.includes(chapter.id);

          return (
            <div
              key={chapter.id}
              className={`rounded-2xl transition-all border ${
                isCompleted 
                  ? 'bg-slate-900/60 border-emerald-500/30' 
                  : isExpanded
                    ? 'bg-slate-900/90 border-purple-500/40 glow-purple'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Chapter Card Header */}
              <div
                onClick={() => setActiveChapterId(isExpanded ? null : chapter.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-3 pr-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold transition-colors ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `#${chapter.number}`}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md border ${getCategoryBadgeColor(chapter.category)}`}>
                        {chapter.category}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono font-bold">
                        +{chapter.xpReward} XP
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {chapter.title[language] || chapter.title.hinglish || chapter.title.en}
                    </h4>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Chapter Expanded Details: Theory & Summary */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                  {/* Theory & Summary Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                    <div className="flex items-center space-x-1.5 text-purple-400 font-bold mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {language === 'hi' 
                          ? 'थ्योरी और मुख्य सिद्धांत (Theory Summary)' 
                          : language === 'hinglish' 
                          ? 'Video Theory & Key Concept Summary 💡' 
                          : 'Comprehensive Theory Summary'}
                      </span>
                    </div>
                    {chapter.theory[language] || chapter.theory.hinglish || chapter.theory.en}
                  </div>

                  {/* Code Blueprint & Playground Runner */}
                  {chapter.code && (
                    <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <FileCode className="w-3.5 h-3.5 text-purple-400" />
                          <span>syntax_blueprint.{chapter.category === 'CSS' ? 'css' : chapter.category === 'JS' ? 'js' : 'html'}</span>
                        </span>
                        <button
                          onClick={() => onOpenPlaygroundWithCode(chapter.code)}
                          className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-bold"
                        >
                          <Code className="w-3 h-3" />
                          <span>Run in Code Lab 🚀</span>
                        </button>
                      </div>
                      <pre className="p-3 text-[11px] font-mono text-cyan-200 overflow-x-auto max-h-40 leading-relaxed">
                        <code>{chapter.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Quick Concept Quiz */}
                  {chapter.quiz && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-indigo-500/20 space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400">
                        <HelpCircle className="w-4 h-4" />
                        <span>{t.quizTitle}</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        {chapter.quiz.question[language] || chapter.quiz.question.hinglish || chapter.quiz.question.en}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {chapter.quiz.options.map((opt, idx) => {
                          const isSelected = selectedAnswers[chapter.id] === idx;
                          const isAnswered = selectedAnswers[chapter.id] !== undefined;
                          const isCorrectOpt = idx === chapter.quiz.correct;

                          return (
                            <button
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleQuizAnswer(chapter.id, idx, chapter.quiz.correct)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isAnswered
                                  ? isCorrectOpt
                                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                                    : isSelected
                                      ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                              }`}
                            >
                              <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizResults[chapter.id] !== undefined && (
                        <p className={`text-[11px] font-semibold mt-1 ${
                          quizResults[chapter.id] ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {quizResults[chapter.id] ? t.correctAnswer : t.wrongAnswer}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Mark As Completed Button */}
                  <div className="pt-1">
                    <button
                      disabled={isCompleted}
                      onClick={() => handleComplete(chapter.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 ${
                        isCompleted
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-default'
                          : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-purple-600/30 hover:opacity-95'
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>{isCompleted ? t.alreadyCompleted : `Mark Chapter Completed (+${chapter.xpReward} XP) 🚀`}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

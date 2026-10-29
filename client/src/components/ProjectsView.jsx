import React, { useState } from 'react';
import { 
  FolderGit2, 
  Terminal, 
  Code2, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  Search, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { projectsLibrary } from '../data/projectsData';

export default function ProjectsView({ onOpenPlaygroundWithCode, language }) {
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(projectsLibrary[0]);

  const filteredProjects = projectsLibrary.filter(proj => {
    const matchesTier = selectedTier === 'ALL' || proj.tier === selectedTier;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Advanced': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="w-full pb-28 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#11182A] via-[#0D1222] to-[#080B16] border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>15 PRODUCTION BUILDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Practical Project Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Real-world portfolio projects ranging from interactive browser apps to full-stack applications. Each comes with starter code and direct Code Lab sandbox testing.
          </p>
        </div>

        {/* Tier Stats */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">5 Beginner</span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">5 Intermediate</span>
          <span className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300">5 Advanced</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Tier filter tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedTier === tier 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier === 'ALL' ? 'All Projects (15)' : tier}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by tech or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 text-slate-200 text-xs rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:border-violet-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#11182A] border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${getTierColor(project.tier)}`}>
                  {project.tier}
                </span>
                <span className="text-xs font-mono text-slate-400">{project.difficulty}</span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                {project.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                {project.description}
              </p>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Learning Objectives */}
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  What You Will Build:
                </p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {project.learningObjectives.map((obj, oIdx) => (
                    <li key={oIdx} className="flex items-start space-x-1.5 text-[11px]">
                      <CheckCircle className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  if (project.starterCode) {
                    onOpenPlaygroundWithCode(project.starterCode.html);
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-600 text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Code2 className="w-4 h-4" />
                <span>Launch in Live Code Lab</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

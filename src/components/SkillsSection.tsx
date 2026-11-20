import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const displayCategories = portfolioData.skillCategories.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  });

  const hasAnyMatches = displayCategories.some((cat) => cat.skills.length > 0);

  // Bioluminescent color themes for the 3 categories with high contrast in light mode
  const categoryThemes: Record<string, {
    gradient: string;
    border: string;
    borderHover: string;
    textAccent: string;
    tagBg: string;
    hoverBg: string;
    shadow: string;
  }> = {
    'Languages': {
      gradient: 'from-amber-500 via-orange-500 to-cyan-500',
      border: 'border-slate-200 dark:border-amber-500/20',
      borderHover: 'hover:border-amber-400/60 dark:hover:border-amber-400/60',
      textAccent: 'text-amber-800 dark:text-amber-400',
      tagBg: 'text-amber-900 bg-amber-500/15 dark:bg-amber-400/10 dark:text-amber-300 border border-amber-500/30',
      hoverBg: 'hover:bg-amber-500/10 dark:hover:bg-amber-500/10',
      shadow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
    },
    'Tools & Frameworks': {
      gradient: 'from-cyan-500 via-blue-600 to-fuchsia-600',
      border: 'border-slate-200 dark:border-cyan-500/25',
      borderHover: 'hover:border-cyan-500 dark:hover:border-[#00F3FF]/70',
      textAccent: 'text-cyan-800 dark:text-[#00F3FF]',
      tagBg: 'text-cyan-900 bg-cyan-500/15 dark:bg-cyan-400/10 dark:text-[#00F3FF] border border-cyan-500/30',
      hoverBg: 'hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,243,255,0.25)]',
    },
    'Databases & Cloud': {
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      border: 'border-slate-200 dark:border-emerald-500/20',
      borderHover: 'hover:border-emerald-500 dark:hover:border-emerald-400/60',
      textAccent: 'text-emerald-800 dark:text-emerald-400',
      tagBg: 'text-emerald-900 bg-emerald-500/15 dark:bg-emerald-400/10 dark:text-emerald-300 border border-emerald-500/30',
      hoverBg: 'hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10',
      shadow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
    },
  };

  return (
    <section id="skills" className="py-24 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-[#00F3FF] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-[#00F3FF] shadow-[0_0_8px_#00F3FF]" />
              Technical Skillset
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Languages, frameworks, tools, and database systems.
            </h2>
          </div>

          {/* Recruiter Skill Search Bar with animated glow */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400 group-focus-within:text-cyan-700 dark:group-focus-within:text-[#00F3FF] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. React, Python, MySQL)..."
              className="w-full pl-10 pr-12 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-cyan-500/20 glass-panel text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#00F3FF] px-1 py-0.5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3 Skill Cards: Languages, Tools & Frameworks, Databases & Cloud */}
        {hasAnyMatches ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayCategories.map((cat) => {
              const theme = categoryThemes[cat.title] || categoryThemes['Tools & Frameworks'];
              return (
                <motion.div
                  key={cat.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 rounded-2xl glass-card border ${theme.border} ${theme.borderHover} shadow-sm hover:shadow-2xl ${theme.shadow} transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Themed Top Gradient Ribbon */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-display text-base font-extrabold ${theme.textAccent}`}>
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-cyan-400/60 font-semibold">
                        {cat.skills.length} skills
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 font-normal">
                      {cat.description}
                    </p>

                    <div className="space-y-1">
                      {cat.skills.length > 0 ? (
                        cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`flex items-center justify-between text-xs py-2 px-2.5 rounded-lg border-b border-slate-100 dark:border-cyan-500/10 last:border-b-0 ${theme.hoverBg} transition-colors`}
                          >
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {skill.name}
                            </span>

                            <div className="flex items-center gap-2 font-mono text-xs">
                              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${theme.tagBg}`}>
                                {skill.category}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic py-2">
                          No matches in this category
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-cyan-500/15 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                    <span className="font-medium">Curated Stack</span>
                    <span className={`font-mono font-semibold ${theme.textAccent}`}>Verified on Resume</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl border border-slate-200 dark:border-cyan-500/20 p-8">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              No matching skills found for "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-[#00F3FF] underline"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { Github, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === activeFilter);

  // Distinct bioluminescent color identities for each project with high contrast in light mode
  const getProjectTheme = (projectId: string) => {
    switch (projectId) {
      case 'ai-resume-analyzer':
        return {
          gradient: 'from-cyan-500 via-blue-600 to-fuchsia-600',
          borderHover: 'hover:border-fuchsia-500 dark:hover:border-[#D946EF]/70',
          shadowGlow: 'hover:shadow-[0_0_35px_rgba(217,70,239,0.25)]',
          kickerColor: 'text-fuchsia-700 dark:text-[#F472B6]',
          btnBg: 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white',
          accentDot: 'bg-fuchsia-600 dark:bg-[#D946EF]',
          checkIcon: 'text-fuchsia-600 dark:text-[#00F3FF]',
          badgeBg: 'bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-500/20',
        };
      case 'blood-donor-finder':
        return {
          gradient: 'from-rose-500 via-pink-600 to-fuchsia-600',
          borderHover: 'hover:border-rose-500 dark:hover:border-rose-400/70',
          shadowGlow: 'hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]',
          kickerColor: 'text-rose-700 dark:text-rose-400',
          btnBg: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white',
          accentDot: 'bg-rose-600 dark:bg-rose-500',
          checkIcon: 'text-rose-600 dark:text-rose-400',
          badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20',
        };
      case 'real-estate-listing':
        return {
          gradient: 'from-cyan-500 via-teal-500 to-blue-600',
          borderHover: 'hover:border-cyan-500 dark:hover:border-[#00F3FF]/70',
          shadowGlow: 'hover:shadow-[0_0_35px_rgba(0,243,255,0.28)]',
          kickerColor: 'text-teal-700 dark:text-[#00F3FF]',
          btnBg: 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold',
          accentDot: 'bg-teal-600 dark:bg-[#00F3FF]',
          checkIcon: 'text-teal-600 dark:text-[#00F3FF]',
          badgeBg: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20',
        };
      default:
        return {
          gradient: 'from-cyan-500 to-blue-600',
          borderHover: 'hover:border-cyan-500 dark:hover:border-cyan-400/60',
          shadowGlow: 'hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]',
          kickerColor: 'text-cyan-700 dark:text-[#00F3FF]',
          btnBg: 'bg-cyan-600 text-white',
          accentDot: 'bg-cyan-600 dark:bg-[#00F3FF]',
          checkIcon: 'text-cyan-600 dark:text-cyan-400',
          badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20',
        };
    }
  };

  const filterTabs = [
    { id: 'all', label: `All Projects (${portfolioData.projects.length})` },
    { id: 'ai', label: 'AI & Full Stack' },
    { id: 'mobile', label: 'Mobile Application' },
    { id: 'web', label: 'Web Application' },
  ] as const;

  return (
    <section id="projects" className="py-24 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-[#00F3FF] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-[#00F3FF] shadow-[0_0_8px_#00F3FF]" />
              Featured Software Projects
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              End-to-end full stack web, AI, and mobile applications.
            </h2>
          </div>

          {/* Functional Glassmorphic Filter Tabs */}
          <div className="glass-panel p-1.5 rounded-xl border border-slate-200 dark:border-cyan-500/20 self-start md:self-auto overflow-x-auto max-w-full flex items-center gap-1.5 shadow-sm">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`relative px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap z-10 ${
                    isActive
                      ? 'text-slate-950 dark:text-slate-950 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-[#00F3FF]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 dark:from-[#00F3FF] dark:via-cyan-400 dark:to-[#38BDF8] rounded-lg shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with Bioluminescent Translucent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const theme = getProjectTheme(project.id);
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className={`group flex flex-col glass-card rounded-2xl border border-slate-200/80 dark:border-cyan-500/20 overflow-hidden shadow-sm hover:shadow-2xl ${theme.shadowGlow} ${theme.borderHover} transition-all duration-300 relative`}
                >
                  {/* Themed Top Bioluminescent Gradient Accent Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} />

                  {/* Media Container with Smooth Shine Effect */}
                  <div
                    className="aspect-video w-full overflow-hidden bg-slate-900/40 relative cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg ${theme.btnBg} flex items-center gap-1.5`}>
                        <span>Explore Technical Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata with separators */}
                      <div className="flex items-center gap-2 text-xs font-semibold mb-2.5">
                        <span className={theme.kickerColor}>{project.categoryLabel}</span>
                        <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
                        <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
                        {project.featured && (
                          <>
                            <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
                            <span className="text-amber-400 font-bold">
                              Featured
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title and Tagline */}
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <span className="group-hover:text-cyan-700 dark:group-hover:text-[#00F3FF] transition-colors">
                          {project.title}
                        </span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 text-cyan-600 dark:text-[#00F3FF]" />
                      </h3>

                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                        {project.tagline}
                      </p>

                      {/* Key Features Bullet Points */}
                      <div className="mb-5 space-y-1.5">
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2 font-medium">
                            <CheckCircle2 className={`w-3.5 h-3.5 ${theme.checkIcon} shrink-0 mt-0.5`} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Tech Stack and Links */}
                    <div>
                      <div className="pt-4 border-t border-slate-200 dark:border-cyan-500/15 mb-4">
                        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                          {project.technologies.map((tech, idx) => (
                            <React.Fragment key={tech}>
                              <span className="text-slate-900 dark:text-cyan-300 font-semibold">{tech}</span>
                              {idx < project.technologies.length - 1 && (
                                <span className="text-slate-400 dark:text-cyan-500/40">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className={`text-xs font-bold ${theme.kickerColor} hover:underline transition-all flex items-center gap-1`}
                        >
                          <span>Technical Deep Dive</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-3">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#00F3FF] transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Technical Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

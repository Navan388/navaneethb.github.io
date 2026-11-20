import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle, Code2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#030712]/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] p-6 sm:p-8 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F3FF] via-[#0D6EFD] to-[#D946EF]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-[#00F3FF] hover:bg-slate-100 dark:hover:bg-cyan-500/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-cyan-400/80 mb-2">
          <span>{project.categoryLabel}</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
          <span>Released {project.year}</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
          <span>Verified Implementation</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 mb-6 font-normal">
          {project.tagline}
        </p>

        {/* Project Image */}
        <div className="rounded-xl overflow-hidden mb-6 aspect-video bg-slate-900/60 border border-slate-200/60 dark:border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Overview */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-cyan-950/20 border border-slate-200 dark:border-cyan-500/20">
          <h4 className="text-xs font-bold text-cyan-800 dark:text-[#00F3FF] uppercase tracking-wider mb-2">
            Project Overview & Implementation
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-600 dark:text-[#00F3FF]" />
            Key Features & Functional Capabilities
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-medium"
              >
                <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-[#00F3FF] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="mb-8 pt-4 border-t border-slate-200 dark:border-cyan-500/20">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-slate-600 dark:text-cyan-300">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="text-slate-900 dark:text-cyan-200 font-semibold">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-slate-400 dark:text-cyan-500/40">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-cyan-500/20">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent dark:border-cyan-500/20"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                const contactEl = document.getElementById('contact');
                contactEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00F3FF] to-[#0D6EFD] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] rounded-lg transition-all"
            >
              <span>Inquire About Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-[#00F3FF] underline transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

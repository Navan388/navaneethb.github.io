import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { downloadResumePdf } from '../data/resumeBase64';
import { ArrowUp, Github, Mail, Phone, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-cyan-500/20 glass-panel py-12 transition-colors">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F3FF] via-[#0D6EFD] to-[#D946EF] shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Title */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-display font-black text-slate-900 dark:text-[#00F3FF] dark:drop-shadow-[0_0_12px_rgba(0,243,255,0.4)] text-base tracking-tight">
              {portfolioData.personal.name}
            </span>
            <span className="hidden sm:inline text-slate-400 dark:text-cyan-500/40">·</span>
            <span className="text-xs text-slate-700 dark:text-slate-400 font-semibold">
              Full Stack Developer · B.Tech IT, CUSAT
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-5 text-xs text-slate-700 dark:text-slate-400 font-semibold">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-700 dark:hover:text-[#00F3FF] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {portfolioData.personal.socials.email && (
              <a
                href={portfolioData.personal.socials.email}
                className="hover:text-cyan-700 dark:hover:text-[#00F3FF] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            )}

            {portfolioData.personal.socials.phone && (
              <a
                href={portfolioData.personal.socials.phone}
                className="hover:text-cyan-700 dark:hover:text-[#00F3FF] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone</span>
              </a>
            )}

            <button
              onClick={() => downloadResumePdf('Navaneeth_B_Resume.pdf')}
              className="hover:text-cyan-700 dark:hover:text-[#00F3FF] transition-colors flex items-center gap-1.5 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-200/80 hover:bg-slate-300 dark:bg-cyan-950/40 dark:hover:bg-cyan-500/20 text-slate-900 dark:text-[#00F3FF] border border-slate-300 dark:border-cyan-500/30 transition-colors ml-2 shadow-xs"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium gap-2">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Full Stack Developer</span>
            <span>·</span>
            <span>{portfolioData.personal.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

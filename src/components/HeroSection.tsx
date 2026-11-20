import React, { useState, useEffect } from 'react';
import { ArrowDown, Check, Copy, Github, Download, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { downloadResumePdf } from '../data/resumeBase64';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const headlinePart1 = 'Developing ';
  const headlinePart2 = 'modern full stack';
  const headlinePart3 = ' web & mobile applications.';
  const fullHeadline = headlinePart1 + headlinePart2 + headlinePart3;

  const [isDeleting, setIsDeleting] = useState(false);
  const [typedCount, setTypedCount] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return fullHeadline.length;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let delay = isDeleting ? 25 : 45;

    if (!isDeleting && typedCount === fullHeadline.length) {
      delay = 1800;
    } else if (isDeleting && typedCount === 0) {
      delay = 400;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (typedCount < fullHeadline.length) {
          setTypedCount((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (typedCount > 0) {
          setTypedCount((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [typedCount, isDeleting, fullHeadline.length]);

  const typedPart1 = headlinePart1.slice(0, Math.min(typedCount, headlinePart1.length));
  const typedPart2 =
    typedCount > headlinePart1.length
      ? headlinePart2.slice(0, Math.min(typedCount - headlinePart1.length, headlinePart2.length))
      : '';
  const typedPart3 =
    typedCount > headlinePart1.length + headlinePart2.length
      ? headlinePart3.slice(0, typedCount - headlinePart1.length - headlinePart2.length)
      : '';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!portfolioData.personal.email) return;
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownload = async () => {
    const downloaded = await downloadResumePdf('Navaneeth_B_Resume.pdf');
    if (downloaded) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const metricColors = [
    {
      gradient: 'from-indigo-500 to-cyan-400',
      bgGlow: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      border: 'border-indigo-200/80 dark:border-indigo-800/40',
      textAccent: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      gradient: 'from-fuchsia-500 to-pink-500',
      bgGlow: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20',
      border: 'border-fuchsia-200/80 dark:border-fuchsia-800/40',
      textAccent: 'text-fuchsia-600 dark:text-fuchsia-400',
    },
    {
      gradient: 'from-amber-500 to-orange-400',
      bgGlow: 'bg-amber-500/10 dark:bg-amber-500/20',
      border: 'border-amber-200/80 dark:border-amber-800/40',
      textAccent: 'text-amber-600 dark:text-amber-400',
    },
    {
      gradient: 'from-emerald-500 to-teal-400',
      bgGlow: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      border: 'border-emerald-200/80 dark:border-emerald-800/40',
      textAccent: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Kicker with Bioluminescent Glow (Clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 mb-4 tracking-wider uppercase">
              <span className="text-cyan-700 dark:text-cyan-400 font-extrabold">
                {portfolioData.personal.title}
              </span>
              <span aria-hidden="true" className="text-cyan-500/40">·</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{portfolioData.personal.location}</span>
            </div>

            {/* Primary Headline with Typing Animation */}
            <h1
              aria-label={fullHeadline}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6 relative"
            >
              {/* Invisible placeholder to reserve exact dimensions and prevent layout shift */}
              <span aria-hidden="true" className="block invisible select-none">
                {headlinePart1}
                <span className="font-black">{headlinePart2}</span>
                {headlinePart3}
              </span>

              {/* Typed characters with preserved gradient styling and cursor */}
              <span aria-hidden="true" className="block absolute inset-0">
                {typedPart1}
                {typedPart2 && (
                  <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 dark:from-cyan-400 dark:via-blue-400 dark:via-fuchsia-400 dark:to-white bg-clip-text text-transparent glow-text font-black">
                    {typedPart2}
                  </span>
                )}
                {typedPart3}
                <span className="inline-block w-[3px] h-[0.85em] bg-[#00F3FF] shadow-[0_0_12px_#00F3FF] ml-1 translate-y-[0.06em] animate-pulse" />
              </span>
            </h1>

            {/* Subhead / Lead */}
            <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-8 max-w-2xl font-normal">
              Hi, I’m <strong className="font-bold text-slate-950 dark:text-white">{portfolioData.personal.name}</strong>. An enthusiastic and detail-oriented full stack developer with a passion for problem-solving and continuous learning. Seeking an entry-level role to contribute to innovative projects and grow in a collaborative team environment.
            </p>

            {/* Action Buttons with signature Bioluminescent gradients */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-600 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Direct PDF Download Button */}
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-white glass-panel hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-300/80 dark:border-cyan-500/30 hover:border-cyan-500/60 rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-cyan-300" />
                    <span className="text-emerald-700 dark:text-cyan-300">Resume Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                    <span>Download Resume (PDF)</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                title="Preview full resume online"
              >
                <Eye className="w-4 h-4" />
                <span>View Online</span>
              </button>
            </div>

            {/* Recruiter Quick-Contact Row */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300">
              {portfolioData.personal.email && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Email:</span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 font-mono text-cyan-700 dark:text-cyan-300 hover:text-slate-950 dark:hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30"
                    title="Click to copy email"
                  >
                    <span className="font-semibold">{portfolioData.personal.email}</span>
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-500/70" />
                    )}
                  </button>
                  {copiedEmail && <span className="text-emerald-600 dark:text-cyan-300 text-xs font-bold">Copied!</span>}
                </div>
              )}

              {portfolioData.personal.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Phone:</span>
                  <a
                    href={portfolioData.personal.socials.phone || `tel:${portfolioData.personal.phone}`}
                    className="font-mono text-cyan-700 dark:text-cyan-300 hover:text-slate-950 dark:hover:text-white transition-colors font-semibold"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-2.5 font-semibold"
                >
                  <Github className="w-7 h-7 text-cyan-700 dark:text-cyan-400" />
                  <span className="text-lg">github.com/Navan388</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Container with Bioluminescent Glass Card Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Animated Bioluminescent Glow behind the card */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-fuchsia-500 opacity-60 blur-xl animate-pulse-soft"
                aria-hidden="true"
              />

              {/* Profile Card Frame */}
              <div className="relative glass-card p-4 rounded-3xl border border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,243,255,0.25)] overflow-hidden">
                {/* Decorative Top Accent Gradient Bar */}
                <div className="h-1.5 -mx-4 -mt-4 mb-4 bg-gradient-to-r from-cyan-400 via-blue-600 to-fuchsia-500" />

                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900/80 relative shadow-inner group border border-cyan-500/20">
                  {!imgError ? (
                    <img
                      src={portfolioData.personal.avatar}
                      alt="Navaneeth B - Full Stack Developer"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        setImgError(true);
                      }}
                      className="w-full h-full object-cover object-[50%_16%] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-display font-bold text-2xl mb-3">
                        NB
                      </div>
                      <span className="font-display font-bold text-white text-base">Navaneeth B</span>
                      <span className="text-xs text-cyan-400 mt-1">Full Stack Developer</span>
                    </div>
                  )}

                  {/* Floating Bioluminescent Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#030712]/80 backdrop-blur-md text-cyan-300 text-[11px] font-semibold border border-cyan-400/40 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>CUSAT '27</span>
                  </div>
                </div>

                {/* Profile Card Footer Details */}
                <div className="pt-4 px-1 pb-1">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {portfolioData.personal.name}
                    </span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                      Available for Hire
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    B.Tech in Information Technology at Cochin University of Science and Technology (CUSAT).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Metrics Strip with Bioluminescent Palette */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-cyan-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-card p-5 rounded-2xl text-center border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-cyan-600 dark:text-cyan-400 tabular-nums">
                2+
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Internships
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono font-medium">
                Mobile & Web Production
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-fuchsia-500" />
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 tabular-nums">
                3+
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Featured Projects
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono font-medium">
                AI, Full Stack & Mobile
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500" />
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-fuchsia-600 dark:text-fuchsia-400 tabular-nums">
                10+
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Tech Stack Tools
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono font-medium">
                React, Python, Node, DBs
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400" />
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-teal-600 dark:text-teal-300 tabular-nums">
                B.Tech
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Information Technology
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono font-medium">
                CUSAT, Kochi (2023–27)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

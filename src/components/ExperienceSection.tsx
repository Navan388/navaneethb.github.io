import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Calendar, MapPin, Building2, CheckCircle2, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceSection: React.FC = () => {
  const expThemes = [
    {
      gradient: 'from-[#00F3FF] via-[#0D6EFD] to-[#D946EF]',
      nodeBorder: 'border-[#00F3FF]',
      nodeGlow: 'shadow-[0_0_15px_rgba(0,243,255,0.7)]',
      badgeColor: 'text-cyan-800 dark:text-[#00F3FF]',
      techAccent: 'text-cyan-700 dark:text-[#00F3FF]',
      cardHover: 'hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]',
    },
    {
      gradient: 'from-[#D946EF] via-purple-500 to-[#00F3FF]',
      nodeBorder: 'border-[#D946EF]',
      nodeGlow: 'shadow-[0_0_15px_rgba(217,70,239,0.7)]',
      badgeColor: 'text-fuchsia-800 dark:text-[#D946EF]',
      techAccent: 'text-fuchsia-700 dark:text-[#D946EF]',
      cardHover: 'hover:border-fuchsia-400/60 hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]',
    },
  ];

  return (
    <section id="experience" className="py-24 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-[#00F3FF] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-[#00F3FF] shadow-[0_0_8px_#00F3FF]" />
            Work Experience & Internships
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Practical development experience with production mobile & web applications.
          </h2>
        </div>

        {/* Timeline Layout with animated glowing gradient vertical line */}
        <div className="relative ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
          {/* Vertical Glowing Line */}
          <div
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#00F3FF] via-[#0D6EFD] to-[#D946EF] rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            aria-hidden="true"
          />

          {portfolioData.experiences.map((exp, idx) => {
            const theme = expThemes[idx % expThemes.length];
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Indicator Dot with Breathing Glow */}
                <div
                  className={`absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-white dark:bg-[#030712] border-2 ${theme.nodeBorder} ${theme.nodeGlow} group-hover:scale-125 transition-all duration-300`}
                />

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 sm:p-8 rounded-2xl glass-card border border-slate-200/90 dark:border-cyan-500/20 shadow-sm ${theme.cardHover} transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Subtle top color highlight */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`} />

                  {/* Header Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span className={`flex items-center gap-1.5 font-bold text-sm ${theme.badgeColor}`}>
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        {exp.location}
                      </span>
                      <span aria-hidden="true" className="text-slate-400 dark:text-cyan-500/40">·</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{exp.type}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-900 dark:text-cyan-300 bg-slate-200/80 dark:bg-cyan-950/40 border border-slate-300/80 dark:border-cyan-500/30 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00F3FF]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {exp.role}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Achievements */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className={`w-3.5 h-3.5 ${theme.badgeColor}`} />
                      Responsibilities & Key Contributions
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((item, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-[#00F3FF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies used (Clean unboxed text) */}
                  <div className="pt-4 border-t border-slate-200 dark:border-cyan-500/15 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="font-sans font-bold text-slate-800 dark:text-slate-200 text-xs mr-1">
                      Technologies:
                    </span>
                    {exp.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span className="text-slate-900 dark:text-cyan-300 font-semibold">{skill}</span>
                        {sIdx < exp.skills.length - 1 && (
                          <span className="text-slate-400 dark:text-cyan-500/40">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

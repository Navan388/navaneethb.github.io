import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { downloadResumePdf } from '../data/resumeBase64';
import { GraduationCap, MapPin, Calendar, BookOpen, Download, FileText, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface EducationSectionProps {
  onOpenResume: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenResume }) => {
  const coursework = [
    { name: 'Data Structures & Algorithms', color: 'bg-[#00F3FF]' },
    { name: 'Database Management Systems (DBMS)', color: 'bg-[#0D6EFD]' },
    { name: 'Object-Oriented Programming', color: 'bg-[#D946EF]' },
    { name: 'Web Technologies & Full Stack Development', color: 'bg-[#38BDF8]' },
    { name: 'Mobile Application Development', color: 'bg-rose-500' },
    { name: 'Computer Networks & Protocols', color: 'bg-cyan-400' },
    { name: 'Operating Systems', color: 'bg-amber-400' },
    { name: 'Software Engineering Principles', color: 'bg-emerald-400' },
  ];

  return (
    <section id="education" className="py-24 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-[#00F3FF] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-[#00F3FF] shadow-[0_0_8px_#00F3FF]" />
            Academic Background
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Formal Education & Engineering Studies
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 font-normal">
            Higher technical education in Information Technology at one of Kerala’s premier technological institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Education Card (Col span 7) */}
          <div className="lg:col-span-7">
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-200/90 dark:border-cyan-500/20 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/15 transition-all relative overflow-hidden"
              >
                {/* Bioluminescent top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00F3FF] via-[#0D6EFD] to-[#D946EF]" />

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-[#00F3FF] mb-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>Undergraduate Degree</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-bold text-cyan-900 dark:text-cyan-300 mt-1">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-slate-900 dark:text-cyan-300 bg-slate-200/80 dark:bg-cyan-950/40 px-2.5 py-1 rounded-md border border-slate-300/80 dark:border-cyan-500/30">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00F3FF]" />
                      {edu.period}
                    </span>
                    <span className="flex items-center justify-end gap-1 text-xs text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6 pt-2 border-t border-slate-200 dark:border-cyan-500/15 font-normal">
                  {edu.details}
                </p>

                {/* Core Academic Foundations */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00F3FF]" />
                    Relevant Coursework & Technical Domains
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 dark:text-slate-200 font-mono font-medium">
                    {coursework.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-cyan-500/10 transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full ${course.color} shadow-[0_0_6px_currentColor] shrink-0`} />
                        <span>{course.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Verification & Resume Download Card (Col span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-cyan-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F3FF] to-[#D946EF]" />

              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-600 dark:text-[#00F3FF]" />
                Official Resume Document
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed mb-4 font-normal">
                Access the verified one-page resume document for Navaneeth B containing complete internship, technical skill, and project details.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => downloadResumePdf('Navaneeth_B_Resume.pdf')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:shadow-lg rounded-xl transition-all duration-300 active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Original PDF Resume</span>
                </button>

                <button
                  onClick={onOpenResume}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-300 bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-800/80 dark:hover:bg-cyan-500/15 rounded-xl border border-slate-300/80 dark:border-cyan-500/20 transition-colors active:scale-98"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Preview Formatted Resume</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-cyan-500/30 text-xs shadow-sm">
              <span className="font-bold text-cyan-900 dark:text-[#00F3FF] block mb-1">
                Continuous Learning Focus
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Complementing university studies at CUSAT with intensive hands-on development in the MERN stack, mobile application engineering, and machine learning REST API services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

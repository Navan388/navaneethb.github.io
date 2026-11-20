import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Layers, Smartphone, Database, GitBranch, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const strengths = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Full Stack Web Development',
      description: 'Hands-on experience developing robust web applications with the MERN stack (MongoDB, Express.js, React, Node.js), writing clean APIs, and optimizing UI performance.',
      gradient: 'from-indigo-600 to-purple-600',
      borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-600',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      title: 'Mobile App Engineering',
      description: 'Engineered cross-platform mobile apps for Customers and Delivery Partners using React Native, Expo, and Flutter with real-time location and push notifications.',
      gradient: 'from-rose-600 to-pink-500',
      borderHover: 'hover:border-rose-400 dark:hover:border-rose-600',
      iconBg: 'bg-rose-50 dark:bg-rose-950/60',
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: 'Database & Cloud Integration',
      description: 'Designing structured and document schemas with MongoDB and MySQL, paired with seamless cloud deployment on Render and real-time backend syncing with Firebase.',
      gradient: 'from-emerald-600 to-teal-500',
      borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-600',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      icon: <GitBranch className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: 'Python & Machine Learning APIs',
      description: 'Building microservices with Python and FastAPI for intelligent applications, including automated resume parsing, NLP feature extraction, and job-matching algorithms.',
      gradient: 'from-amber-600 to-orange-500',
      borderHover: 'hover:border-amber-400 dark:hover:border-amber-600',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    },
  ];

  return (
    <section id="about" className="py-20 bg-transparent border-y border-cyan-500/20 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-700 via-blue-700 to-fuchsia-700 dark:from-cyan-400 dark:via-blue-500 dark:to-fuchsia-400 bg-clip-text text-transparent mb-2 block">
            About Me & Technical Background
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Detail-oriented full stack developer driven by problem-solving and clean execution.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main narrative & Pillars (Col span 7) */}
          <div className="lg:col-span-7 space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-base">
            <p>
              I am an enthusiastic full stack developer pursuing my Bachelor of Technology in Information Technology at <strong className="font-bold text-slate-950 dark:text-white">Cochin University of Science and Technology (CUSAT), Kochi</strong>. With a strong passion for solving real-world challenges through code, I have cultivated comprehensive skills spanning web development, cross-platform mobile development, and backend API engineering.
            </p>
            <p>
              Through internships at <strong className="font-bold text-slate-950 dark:text-white">Addonez Marketplace LLP</strong> and <strong className="font-bold text-slate-950 dark:text-white">Fair Code Technologies</strong>, I have contributed directly to production codebases—building customer and delivery partner mobile applications with React Native, architecting shared backends deployed on Render, and collaborating with cross-functional teams to test, debug, and ship responsive web features.
            </p>
            <p>
              Whether parsing complex data with Python and FastAPI or building fluid interfaces with React and Tailwind CSS, I focus on writing maintainable, well-structured software and continuously learning emerging industry standards.
            </p>

            {/* Core Strengths with 4 Distinct Color Identities */}
            <div className="pt-6">
              <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white mb-6">
                Core Technical Strengths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {strengths.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="glass-card p-5 rounded-2xl border border-slate-200/90 dark:border-cyan-500/20 hover:border-cyan-400/50 shadow-sm hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-3 shadow-inner border border-slate-200/80 dark:border-white/10`}>
                      {item.icon}
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recruiter Quick Snapshot Card (Col span 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 glass-card p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-cyan-500/30 shadow-lg relative overflow-hidden">
              {/* Colorful gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-cyan-500/20 mb-5">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Recruiter Snapshot
                </h3>
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
                  Seeking Entry-Level Roles
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Target Roles</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    Full Stack Developer, Software Engineer Intern / Associate, Frontend / Backend Engineer
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Location</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      Ernakulam, Kerala (Open to Relocation)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Internships</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400 shrink-0" />
                      2 Completed (Mobile & Web)
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Education</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    B.Tech in Information Technology (2023–2027)
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-0.5 ml-5 font-semibold">
                    Cochin University of Science and Technology, Kochi
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-cyan-500/20">
                  <span className="text-slate-600 dark:text-slate-400 block mb-2 font-semibold uppercase tracking-wider text-[10px]">Verified Stack</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-semibold">
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold">React</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-blue-700 dark:text-blue-400 font-bold">React Native</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Node.js</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">Express.js</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-teal-700 dark:text-teal-400 font-bold">MongoDB</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-fuchsia-700 dark:text-fuchsia-400 font-bold">FastAPI</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">Python</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">MySQL</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold">Flutter</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-3 glass-pill rounded-xl text-slate-800 dark:text-slate-200 font-medium leading-normal flex items-start gap-2 border border-slate-200 dark:border-cyan-500/20">
                    <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>Open to full-time roles, internships, and collaborative software projects.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

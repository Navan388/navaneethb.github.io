/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { BioluminescentBackground } from './components/BioluminescentBackground';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#030712]/80 text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Real-time WebGL Bioluminescent Cyan & Electric Blue Fluid Shader (Headless, no adjustment controls) */}
      <BioluminescentBackground />

      {/* 3-Zone Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Layout */}
      <main className="relative">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection onOpenResume={() => setResumeOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Viewer & Exporter Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

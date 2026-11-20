import React, { useState, useEffect } from 'react';
import { X, Printer, Download, Copy, Check, FileText, Eye, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { downloadResumePdf, getResumePdfBlobUrl, isLocalResumePdfAvailable } from '../data/resumeBase64';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'pdf'>('formatted');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');
  const [pdfAvailable, setPdfAvailable] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    let generatedBlobUrl = '';

    if (isOpen) {
      isLocalResumePdfAvailable().then((available) => {
        if (!active) return;
        if (available) {
          setPdfBlobUrl('/Navaneeth_B_Resume.pdf');
          setPdfAvailable(true);
        } else {
          generatedBlobUrl = getResumePdfBlobUrl();
          setPdfBlobUrl(generatedBlobUrl);
          setPdfAvailable(Boolean(generatedBlobUrl));
        }
      });
    }

    return () => {
      active = false;
      if (generatedBlobUrl && generatedBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedBlobUrl);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdfFile = async () => {
    const success = await downloadResumePdf('Navaneeth_B_Resume.pdf');
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const generateMarkdownResume = () => {
    const contactSegments = [
      'Ernakulam, Kerala',
      portfolioData.personal.email ? `Email: ${portfolioData.personal.email}` : '',
      portfolioData.personal.phone ? `Phone: ${portfolioData.personal.phone}` : '',
      portfolioData.personal.socials.github ? `GitHub: ${portfolioData.personal.socials.github}` : '',
    ].filter(Boolean);

    return `# ${portfolioData.personal.name}
${contactSegments.join(' | ')}

---

## SUMMARY
${portfolioData.personal.bio}

---

## EXPERIENCE

${portfolioData.experiences
  .map(
    (exp) => `### ${exp.role} (${exp.period})
${exp.company} (${exp.location})
${exp.responsibilities.map((r) => `- ${r}`).join('\n')}
Technologies: ${exp.skills.join(', ')}
`
  )
  .join('\n')}

---

## EDUCATION

### ${portfolioData.education[0].degree} (${portfolioData.education[0].period})
${portfolioData.education[0].institution}

---

## PROJECTS

${portfolioData.projects
  .map(
    (p) => `### ${p.title} (${p.year})
${p.description}
${p.features.map((f) => `- ${f}`).join('\n')}
Technologies: ${p.technologies.join(', ')}
`
  )
  .join('\n')}

---

## SKILLS

- Languages: HTML, CSS, JavaScript, Python, SQL
- Tools/Frameworks: React, React Native, Express.js, Node.js, FastAPI, Expo, Flutter
- Databases: MongoDB, MySQL, Firebase
`;
  };

  const handleDownloadMarkdown = () => {
    const content = generateMarkdownResume();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Navaneeth_B_Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPlainText = () => {
    const content = generateMarkdownResume().replace(/#{1,6}\s?/g, '').replace(/---/g, '----------------------------------------');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Navaneeth_B_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (no-print) */}
        <div className="no-print p-4 sm:px-6 bg-slate-50 dark:bg-[#030712]/90 border-b border-slate-200 dark:border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#00F3FF]" />
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Resume — {portfolioData.personal.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-[#00F3FF] border border-cyan-500/30">Verified</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Full Stack Developer · B.Tech IT (CUSAT)
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'formatted'
                  ? 'bg-white dark:bg-cyan-500/20 text-slate-900 dark:text-[#00F3FF] shadow-sm border border-transparent dark:border-cyan-500/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Formatted View
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'pdf'
                  ? 'bg-white dark:bg-cyan-500/20 text-slate-900 dark:text-[#00F3FF] shadow-sm border border-transparent dark:border-cyan-500/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PDF Document View
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary Verified PDF Download */}
            <button
              onClick={handleDownloadPdfFile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00F3FF] to-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] rounded-lg transition-all"
              title="Downloads verified intact PDF file directly"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'PDF Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-cyan-500/20 hover:bg-slate-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors"
              title="Prints or saves cleanly as PDF via browser print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-cyan-500/20 hover:bg-slate-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-cyan-500/20 hover:bg-slate-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#00F3FF]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-[#00F3FF] rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode 1: PDF Document View */}
        {viewMode === 'pdf' ? (
          <div className="flex-1 min-h-[600px] p-4 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center">
            {pdfAvailable && pdfBlobUrl ? (
              <object
                data={pdfBlobUrl}
                type="application/pdf"
                className="w-full h-full min-h-[600px] rounded-lg border border-slate-300 dark:border-slate-800 shadow-inner"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600 dark:text-slate-400">
                  <p className="mb-4 text-sm font-medium">
                    Your browser does not support embedded PDF viewing.
                  </p>
                  <button
                    onClick={handleDownloadPdfFile}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Navaneeth_B_Resume.pdf</span>
                  </button>
                </div>
              </object>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600 dark:text-slate-400 max-w-md">
                <p className="mb-4 text-sm font-medium">
                  The static PDF resume file is kept private outside public version control. You can view the formatted resume or save it as a PDF using Print.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode('formatted')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-[#00F3FF] rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Formatted Resume</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 border border-cyan-500/30 rounded-lg"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* View Mode 2: Formatted ATS View (Secondary Education excluded) */
          <div className="overflow-y-auto p-6 sm:p-10 text-slate-900 dark:text-slate-100 print:text-black print:bg-white text-left font-sans">
            {/* Header */}
            <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white print:text-black">
                {portfolioData.personal.name.toUpperCase()}
              </h1>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400 print:text-slate-700 mt-2 font-mono">
                <span>{portfolioData.personal.location}</span>
                {portfolioData.personal.email && (
                  <>
                    <span>|</span>
                    <a href={`mailto:${portfolioData.personal.email}`} className="hover:underline">{portfolioData.personal.email}</a>
                  </>
                )}
                {portfolioData.personal.phone && (
                  <>
                    <span>|</span>
                    <span>{portfolioData.personal.phone}</span>
                  </>
                )}
                <span>|</span>
                <a href={portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {portfolioData.personal.socials.github}
                </a>
              </div>
            </div>

            {/* Summary */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                Summary
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed">
                {portfolioData.personal.bio}
              </p>
            </section>

            {/* Experience */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {portfolioData.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-slate-950 dark:text-white print:text-black">
                        {exp.role}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                    </div>
                    <div className="text-xs italic text-slate-600 dark:text-slate-400 mb-1.5">
                      {exp.company} ({exp.location})
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-slate-800">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="leading-relaxed">
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education - Only B.Tech (Secondary and Higher Secondary excluded per user instructions) */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                Education
              </h2>
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">{edu.degree}</span>
                    <span className="text-[11px] font-mono text-slate-500">{edu.period}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 italic">{edu.institution}</div>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-3.5">
                {portfolioData.projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-slate-950 dark:text-white print:text-black">
                        {p.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{p.year}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 mb-1">
                      {p.description}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">
                      {p.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                Skills
              </h2>
              <div className="space-y-1.5 text-xs">
                <div>
                  <strong className="text-slate-900 dark:text-white print:text-black">Languages: </strong>
                  <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">HTML, CSS, JavaScript, Python, SQL</span>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white print:text-black">Tools / Frameworks: </strong>
                  <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">React, React Native, Express.js, Node.js, FastAPI</span>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white print:text-black">Databases: </strong>
                  <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">MongoDB, MySQL</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

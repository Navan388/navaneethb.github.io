import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { downloadResumePdf } from '../data/resumeBase64';
import { Mail, Github, Copy, Check, Send, Phone, MapPin, Download, CheckCircle, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleInterest: 'Entry-level Full Stack Developer',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>('');
  const [submissionService, setSubmissionService] = useState<'web3forms' | 'formsubmit' | 'mailto'>('web3forms');
  const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
  const contactEmail = portfolioData.personal.email;
  const contactPhone = portfolioData.personal.phone;

  const handleCopyEmail = () => {
    if (!contactEmail) return;
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!contactPhone) return;
    navigator.clipboard.writeText(contactPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setFormError('');

    // 1. Try Web3Forms if an access key is configured in environment variables
    if (web3FormsKey !== '') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            subject: `Portfolio Inquiry from ${formData.name} (${formData.roleInterest})`,
            message: formData.message,
            role_interest: formData.roleInterest,
            from_name: `${formData.name} via Web3Forms`,
            replyto: formData.email,
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setSubmissionService('web3forms');
          setSubmitted(true);
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('Web3Forms request encountered an issue', err);
      }
    }

    // 2. Fallback: FormSubmit direct delivery only when VITE_CONTACT_EMAIL is configured
    if (contactEmail) {
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Portfolio Inquiry from ${formData.name} (${formData.roleInterest})`,
            name: formData.name,
            email: formData.email,
            role_interest: formData.roleInterest,
            message: formData.message,
            _captcha: 'false',
            _template: 'table',
          }),
        });

        const data = await response.json().catch(() => null);
        if (response.ok || (data && (data.success === 'true' || data.success === true))) {
          setSubmissionService('formsubmit');
          setSubmitted(true);
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('FormSubmit network error, falling back to mail client', err);
      }

      // 3. Ultimate fallback when contact email is configured: Mailto client
      triggerMailtoFallback();
      setSubmissionService('mailto');
      setSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    setFormError('Direct message delivery is not configured in this public repository build. Please connect via GitHub or configure VITE_WEB3FORMS_ACCESS_KEY in your private .env.');
    setIsSubmitting(false);
  };

  const triggerMailtoFallback = () => {
    if (!contactEmail) return;
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.roleInterest} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Navaneeth,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.roleInterest}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-[#00F3FF] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-[#00F3FF] shadow-[0_0_8px_#00F3FF]" />
            Contact & Opportunities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let’s connect regarding entry-level full stack roles and internships.
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed font-normal">
            I am actively seeking entry-level software development roles where I can contribute to impactful web and mobile projects.
            {contactEmail ? (
              <>
                {' '}Inquiries sent here are delivered directly to my inbox (<strong className="text-cyan-800 dark:text-[#00F3FF] font-mono font-bold">{contactEmail}</strong>).
              </>
            ) : (
              ' Use the form below or connect via GitHub regarding roles and collaborations.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Channels (Col span 5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Email Card */}
            {contactEmail && (
              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-cyan-500/25 shadow-sm hover:shadow-[0_0_25px_rgba(0,243,255,0.2)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <span className="text-xs font-bold text-cyan-800 dark:text-[#00F3FF] uppercase tracking-wider block mb-2">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-3 p-3 bg-slate-100/90 dark:bg-cyan-950/30 rounded-xl border border-slate-300/80 dark:border-cyan-500/30">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-cyan-700 dark:text-[#00F3FF] shrink-0" />
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-mono text-xs text-slate-900 dark:text-cyan-200 hover:text-cyan-700 dark:hover:text-[#00F3FF] truncate font-bold"
                    >
                      {contactEmail}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-[#00F3FF] bg-white dark:bg-[#030712] border border-slate-300 dark:border-cyan-500/30 rounded-lg transition-colors shrink-0 flex items-center gap-1 active:scale-95"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Direct Phone Card */}
            {contactPhone && (
              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-emerald-500/25 shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-2">
                  Phone Number
                </span>
                <div className="flex items-center justify-between gap-3 p-3 bg-slate-100/90 dark:bg-emerald-950/30 rounded-xl border border-slate-300/80 dark:border-emerald-500/30">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <a
                      href={portfolioData.personal.socials.phone || `tel:${contactPhone}`}
                      className="font-mono text-xs text-slate-900 dark:text-emerald-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-bold"
                    >
                      {contactPhone}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-[#030712] border border-slate-300 dark:border-emerald-500/30 rounded-lg transition-colors shrink-0 flex items-center gap-1 active:scale-95"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* GitHub & Location */}
            <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-[#D946EF]/25 shadow-sm hover:shadow-[0_0_25px_rgba(217,70,239,0.2)] space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 to-purple-600" />
              <div>
                <span className="text-xs font-bold text-fuchsia-800 dark:text-[#D946EF] uppercase tracking-wider block mb-2">
                  Location & GitHub
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-300 mb-3 font-semibold">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-[#00F3FF] shrink-0" />
                  <span>{portfolioData.personal.location}</span>
                </div>
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-300 dark:border-cyan-500/20 hover:border-cyan-500 hover:bg-slate-100 dark:hover:bg-cyan-500/10 transition-colors text-xs font-bold text-slate-900 dark:text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyan-700 dark:text-[#00F3FF]" />
                    <span className="font-mono">github.com/Navan388</span>
                  </div>
                  <span className="text-cyan-700 dark:text-[#00F3FF] text-[11px] font-bold">View Repositories →</span>
                </a>
              </div>

              {/* Direct PDF Download button in contact column */}
              <div className="pt-2">
                <button
                  onClick={() => downloadResumePdf('Navaneeth_B_Resume.pdf')}
                  className="w-full inline-flex items-center justify-center gap-2 p-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:shadow-lg rounded-xl transition-all active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Message Form (Col span 7) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl glass-card border border-slate-200 dark:border-cyan-500/25 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600" />

              <div className="mb-5">
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>

              {submitted ? (
                <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-[#00F3FF] mx-auto" />
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {contactEmail ? `Message Delivered to ${contactEmail}` : 'Message Delivered Successfully'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-cyan-200 max-w-md mx-auto leading-relaxed">
                    {submissionService === 'web3forms'
                      ? 'Your inquiry was sent via Web3Forms and delivered straight to Navaneeth B’s inbox.'
                      : 'Your message has been routed to Navaneeth B. You will receive a direct reply to your email.'}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          roleInterest: 'Entry-level Full Stack Developer',
                          message: '',
                        });
                      }}
                      className="text-xs font-bold text-cyan-700 hover:text-cyan-800 dark:text-[#00F3FF] underline"
                    >
                      Send another message
                    </button>
                    {contactEmail && (
                      <>
                        <span className="text-slate-400 dark:text-cyan-500/40">·</span>
                        <a
                          href={`mailto:${contactEmail}?subject=Follow-up for Navaneeth B`}
                          className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open in Mail App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Recruiter / Company Contact"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-cyan-500/25 bg-white dark:bg-[#030712]/70 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-600 dark:focus:ring-[#00F3FF]/40 dark:focus:border-[#00F3FF] transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@company.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-cyan-500/25 bg-white dark:bg-[#030712]/70 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-600 dark:focus:ring-[#00F3FF]/40 dark:focus:border-[#00F3FF] transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                      Opportunity / Role
                    </label>
                    <select
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-cyan-500/25 bg-white dark:bg-[#030712] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-600 dark:focus:ring-[#00F3FF]/40 dark:focus:border-[#00F3FF] transition-all font-semibold"
                    >
                      <option value="Entry-level Full Stack Developer">Entry-level Full Stack Developer</option>
                      <option value="Junior Software Engineer">Junior Software Engineer</option>
                      <option value="Frontend Developer (React)">Frontend Developer (React)</option>
                      <option value="Backend Developer (Node.js / Python)">Backend Developer (Node.js / Python)</option>
                      <option value="Mobile App Developer (React Native / Flutter)">Mobile App Developer (React Native / Flutter)</option>
                      <option value="Software Development Internship">Software Development Internship</option>
                      <option value="General Collaboration">General Networking / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, interview scheduling, team responsibilities, or technical questions..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-cyan-500/25 bg-white dark:bg-[#030712]/70 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-600 dark:focus:ring-[#00F3FF]/40 dark:focus:border-[#00F3FF] transition-all font-medium"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      {formError}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-[#00F3FF] via-cyan-400 to-[#38BDF8] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] rounded-xl transition-all duration-300 disabled:opacity-50 active:scale-95 shadow-md"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    {contactEmail && (
                      <button
                        type="button"
                        onClick={triggerMailtoFallback}
                        className="text-xs text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-[#00F3FF] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Prefer sending via your mail client?</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

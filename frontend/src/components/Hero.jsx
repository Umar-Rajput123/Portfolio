import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const Hero = () => {
  const roles = [
    'MERN Stack Developer',
    'Full-Stack Web Engineer',
    'React & Node.js Specialist',
    'MongoDB & REST API Architect',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === current) {
      // Pause at full text
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering Opportunities</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  Umar Rajpoot
                </span>
              </h1>
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-3xl font-semibold text-slate-300">
                  I build{' '}
                  <span className="font-mono text-cyan-400 border-r-2 border-cyan-400 pr-1 animate-pulse">
                    {displayText}
                  </span>
                </span>
              </div>
            </div>

            {/* Subtitle / Bio summary */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Passionate software engineer crafting resilient, scalable full-stack web applications with{' '}
              <span className="text-slate-200 font-medium">MongoDB, Express.js, React.js, and Node.js</span>.
              Committed to clean architecture, intuitive user interfaces, and robust REST APIs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Resume / Bio</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">Connect:</span>
              <a
                href="https://github.com/Umar-Rajput123"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 hover:scale-110 transition-all duration-200"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-umar-mern-developer/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 hover:scale-110 transition-all duration-200"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:umarsaleem0563@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800 hover:scale-110 transition-all duration-200"
                title="Send Email — umarsaleem0563@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 text-xs font-mono text-slate-400">developer.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>zsh</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-950/40">
                <div className="text-slate-500">// Welcome to Umar Rajpoot's Terminal</div>
                <div className="mt-2">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-yellow-300">softwareEngineer</span> = {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">name</span>:{' '}
                  <span className="text-emerald-400">'Umar Rajpoot'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">role</span>:{' '}
                  <span className="text-emerald-400">'MERN Stack Specialist'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">stack</span>: [
                  <span className="text-emerald-400">'MongoDB'</span>,{' '}
                  <span className="text-emerald-400">'Express'</span>,{' '}
                  <span className="text-emerald-400">'React'</span>,{' '}
                  <span className="text-emerald-400">'Node'</span>],
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">education</span>:{' '}
                  <span className="text-emerald-400">'BS Computer Science'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">passion</span>:{' '}
                  <span className="text-emerald-400">'Scalable Systems & Clean UI'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">coffeeToCodeRatio</span>:{' '}
                  <span className="text-orange-400">Infinity</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">readyToBuild</span>: () =&gt;{' '}
                  <span className="text-purple-400">true</span>
                </div>
                <div>{'}'};</div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Status: Ready for deployment
                  </span>
                  <span className="text-slate-500">Node v24.16</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Ribbon */}
        <div className="mt-16 pt-8 border-t border-slate-800/60">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            Core Technology Stack & Ecosystem
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-400 text-xs sm:text-sm font-medium">
            {['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Tailwind CSS', 'JWT Auth', 'REST APIs', 'Git & Docker'].map(
              (tech) => (
                <div
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

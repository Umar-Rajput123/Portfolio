import React from 'react';
import {
  Code,
  Layers,
  Zap,
  CheckCircle2,
  GraduationCap,
  Globe,
  Briefcase,
  HeartHandshake,
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Projects Built', value: '15+', icon: Code },
    { label: 'MERN Stack Focus', value: '100%', icon: Layers },
    { label: 'Clean Code Standard', value: 'A+', icon: Zap },
    { label: 'Dedication to Craft', value: '24/7', icon: HeartHandshake },
  ];

  const highlights = [
    'Specialized in end-to-end MERN Stack architecture with high performance.',
    'Designing secure RESTful APIs with JWT authentication, role guards, and data validation.',
    'Translating Figma / modern UI designs into fluid, responsive React components.',
    'Database modeling with Mongoose, schemas, indexing, and aggregation pipelines.',
    'Committed to agile practices, git workflows, and continuous integration.',
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            <span>GET TO KNOW ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-cyan-400">Umar Rajpoot</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Aspiring Software Engineer combining technical expertise in the MERN stack with a strong passion for solving real-world challenges through elegant software.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image/Card representation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl blur opacity-30"></div>
              <div className="relative glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/25">
                    UR
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Umar Rajpoot</h3>
                    <p className="text-xs font-mono text-cyan-400">Software Engineer & MERN Dev</p>
                    <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Open to Opportunities
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-cyan-400" /> Education:
                    </span>
                    <span className="font-medium text-slate-200">BS in Computer Science</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" /> Location:
                    </span>
                    <span className="font-medium text-slate-200">Pakistan (Remote Worldwide)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" /> Focus:
                    </span>
                    <span className="font-medium text-slate-200">Full-Stack Web Development</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-400" /> Primary Stack:
                    </span>
                    <span className="font-medium text-cyan-400">MongoDB, Express, React, Node</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center space-y-1 hover:border-slate-700 transition-colors"
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-1">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Bio Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-white leading-snug">
              Crafting Scalable Digital Experiences From Concept to Cloud.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              I am a dedicated MERN Stack Developer with an insatiable curiosity for modern web architectures and software engineering best practices. My journey started with a fascination for how logic turns into interactive software that millions of people can use effortlessly.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether building high-concurrency Node.js microservices, orchestrating MongoDB schemas, or designing silky-smooth user interfaces with React and Tailwind CSS, I focus on delivering code that is readable, tested, and maintainable.
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                What I Bring To Your Team:
              </h4>
              <div className="space-y-2.5">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini CTA banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-800/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-cyan-400 font-mono">Looking for a reliable developer?</p>
                <p className="text-sm font-semibold text-white">Let's discuss your next project today.</p>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                Hire Umar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

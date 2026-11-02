import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
} from 'lucide-react';

const EducationExperience = () => {
  const educationList = [
    {
      degree: 'Bachelor of Science in Computer Science (BSCS)',
      institution: 'Virtual University of Pakistan (VU)',
      period: '2021 - 2025',
      location: 'Johar Town, Lahore, Pakistan',
      description:
        'Focused on Software Engineering principles, Data Structures & Algorithms (DSA), Relational & NoSQL Database Design, Operating Systems, and Distributed Computing.',
      achievements: [
        'Dean’s Honor List for Academic Excellence.',
        'Final Year Project: High-concurrency MERN Stack Microservices Platform.',
        'Lead Organizer of University Tech Hackathons & Coding Club.',
      ],
    },
    {
      degree: 'Higher Secondary School Certificate (Pre-Engineering)',
      institution: 'Punjab Group of Colleges',
      period: '2019 - 2021',
      location: 'Johar Town, Lahore, Pakistan',
      description:
        'Graduated with distinction focusing on Advanced Mathematics, Physics, and Analytical Logic.',
      achievements: ['Ranked in top 5% of cohort in Mathematics and Computing fundamentals.'],
    },
  ];

  const experienceList = [
    {
      role: 'Full-Stack MERN Developer (Intern / Associate)',
      company: 'DevSphere Solutions',
      period: '2024 - Present',
      location: 'Remote',
      description:
        'Engineered responsive web applications and scalable REST APIs using React, Node.js, and MongoDB. Optimized database queries and streamlined client-server state synchronization.',
      highlights: [
        'Refactored legacy REST controllers into modular services, cutting API response times by 35%.',
        'Implemented JWT authentication with role-based access control (RBAC).',
        'Built interactive reusable UI component libraries using Tailwind CSS and React.',
      ],
    },
    {
      role: 'Freelance Software Developer',
      company: 'Upwork & Independent Clients',
      period: '2023 - 2024',
      location: 'Global Remote',
      description:
        'Delivered custom web applications, dynamic portfolio dashboards, and landing pages for international clients with 100% on-time delivery.',
      highlights: [
        'Delivered 8+ responsive client projects with seamless MongoDB backend integrations.',
        'Maintained 5-star customer ratings through transparent communication and clean documentation.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>MY BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="text-cyan-400">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A track record of academic dedication and hands-on software development experience.
          </p>
        </div>

        {/* Dual Track Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Track */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Academic Education</h3>
                <p className="text-xs text-slate-400 font-mono">Formal computer science foundation</p>
              </div>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
              {educationList.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform"></div>

                  <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.period}
                      </span>
                      <a
                        href="https://maps.google.com/?q=Johar+Town,+Lahore,+Pakistan"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                        title="View on Google Maps"
                      >
                        <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                      </a>
                    </div>

                    <h4 className="text-lg font-bold text-white">{item.degree}</h4>
                    <p className="text-sm font-medium text-cyan-300">{item.institution}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                    <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
                      {item.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Track */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Work Experience</h3>
                <p className="text-xs text-slate-400 font-mono">Software engineering & freelance</p>
              </div>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
              {experienceList.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-indigo-400 group-hover:scale-125 transition-transform"></div>

                  <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {item.period}
                      </span>
                      <a
                        href="https://maps.google.com/?q=Johar+Town,+Lahore,+Pakistan"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                        title="View on Google Maps"
                      >
                        <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                      </a>
                    </div>

                    <h4 className="text-lg font-bold text-white">{item.role}</h4>
                    <p className="text-sm font-medium text-indigo-300">{item.company}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                    <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
                      {item.highlights.map((high, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{high}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationExperience;

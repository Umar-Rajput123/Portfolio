import React, { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';
import {
  Code,
  Server,
  Database,
  Wrench,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Radio,
  FolderGit2,
  Table2,
  Flame,
  GitBranch,
  Send,
  Box,
  CloudUpload,
  Atom,
  FileCode2,
  Palette,
  Layout,
  Zap,
} from 'lucide-react';

const iconMap = {
  Atom,
  FileCode2,
  Palette,
  Layout,
  Layers,
  Zap,
  Server,
  Cpu,
  ShieldCheck,
  Radio,
  Database,
  FolderGit2,
  Table2,
  Flame,
  GitBranch,
  Send,
  Box,
  CloudUpload,
  Code,
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools & DevOps'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await skillsAPI.getAll();
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (error) {
      console.warn('API error, using cached skills:', error.message);
      // Fallback skills if backend unreachable
      setSkills([
        { name: 'React.js', category: 'Frontend', proficiency: 92, icon: 'Atom' },
        { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95, icon: 'FileCode2' },
        { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: 'Palette' },
        { name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'Server' },
        { name: 'Express.js', category: 'Backend', proficiency: 92, icon: 'Cpu' },
        { name: 'MongoDB & Mongoose', category: 'Database', proficiency: 90, icon: 'Database' },
        { name: 'RESTful API Design', category: 'Backend', proficiency: 94, icon: 'ShieldCheck' },
        { name: 'Git & GitHub', category: 'Tools & DevOps', proficiency: 92, icon: 'GitBranch' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-cyan-400">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Full-stack technologies I use daily to architect, engineer, and deploy production-ready web platforms.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <div
                  key={skill._id || skill.name}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800/80 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{skill.name}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{skill.category}</span>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                    <div
                      className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

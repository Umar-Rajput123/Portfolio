import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import ProjectModal from './ProjectModal';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Maximize2,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAll();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.warn('API error, using cached project list:', error.message);
      setProjects([
        {
          _id: '1',
          title: 'ShopZenith - Modern MERN E-Commerce Platform',
          description:
            'A full-featured multi-vendor e-commerce platform built with React, Node.js, Express, and MongoDB. Features secure Stripe payment processing, JWT authentication, and an extensive admin analytics dashboard.',
          category: 'Full Stack',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API'],
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
          githubUrl: 'https://github.com/umarrajpoot/shopzenith-mern-ecommerce',
          liveUrl: 'https://shopzenith-demo.vercel.app',
        },
        {
          _id: '2',
          title: 'DevPulse - AI-Powered Code Reviewer & Assistant',
          description:
            'An intelligent developer platform that analyzes code repositories for vulnerabilities, performance bottlenecks, and style conformity.',
          category: 'Full Stack',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API'],
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
          githubUrl: 'https://github.com/umarrajpoot/devpulse-code-review',
          liveUrl: 'https://devpulse-preview.vercel.app',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world full-stack web applications engineered with modern technologies and clean architecture.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
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

        {/* Projects Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-slate-900/30 rounded-2xl border border-slate-800">
            <Code2 className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800/80 flex flex-col group"
              >
                {/* Project Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-transparent to-transparent opacity-80"></div>

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                    {project.category}
                  </span>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick Preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Body */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                          title="GitHub Source"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;

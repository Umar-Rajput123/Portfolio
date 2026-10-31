import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  projectsAPI,
  skillsAPI,
  messagesAPI,
  statsAPI,
} from '../services/api';
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  Mail,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  ExternalLink,
  Github,
  AlertCircle,
  RefreshCw,
  Home,
  Layers,
  Upload,
  Eye,
  X,
  Loader2,
  Check,
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'skills' | 'messages'
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text: '' }

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    technologies: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });
  const [projectImageFile, setProjectImageFile] = useState(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 80,
    icon: 'Code',
    featured: true,
    order: 0,
  });

  const [messageViewModal, setMessageViewModal] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, projectsRes, skillsRes, messagesRes] = await Promise.all([
        statsAPI.getStats(),
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        messagesAPI.getAll(),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
      if (skillsRes.data.success) setSkills(skillsRes.data.data);
      if (messagesRes.data.success) setMessages(messagesRes.data.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      showToast('error', 'Error refreshing data. Please check backend connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- PROJECT CRUD HANDLERS ---
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      category: 'Full Stack',
      technologies: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      order: 0,
    });
    setProjectImageFile(null);
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
      image: proj.image,
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: proj.featured || false,
      order: proj.order || 0,
    });
    setProjectImageFile(null);
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('category', projectForm.category);
      formData.append('technologies', projectForm.technologies);
      formData.append('githubUrl', projectForm.githubUrl);
      formData.append('liveUrl', projectForm.liveUrl);
      formData.append('featured', projectForm.featured);
      formData.append('order', projectForm.order);

      if (projectImageFile) {
        formData.append('image', projectImageFile);
      } else if (projectForm.image) {
        formData.append('image', projectForm.image);
      }

      if (editingProject) {
        await projectsAPI.update(editingProject._id, formData);
        showToast('success', 'Project updated successfully');
      } else {
        await projectsAPI.create(formData);
        showToast('success', 'New project created successfully');
      }

      setProjectModalOpen(false);
      loadAllData();
    } catch (error) {
      console.error('Save project error:', error);
      showToast('error', error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      try {
        await projectsAPI.delete(id);
        showToast('success', 'Project deleted');
        loadAllData();
      } catch (error) {
        showToast('error', 'Failed to delete project');
      }
    }
  };

  // --- SKILL CRUD HANDLERS ---
  const openNewSkillModal = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Frontend',
      proficiency: 80,
      icon: 'Code',
      featured: true,
      order: 0,
    });
    setSkillModalOpen(true);
  };

  const openEditSkillModal = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Code',
      featured: skill.featured !== undefined ? skill.featured : true,
      order: skill.order || 0,
    });
    setSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, skillForm);
        showToast('success', 'Skill updated successfully');
      } else {
        await skillsAPI.create(skillForm);
        showToast('success', 'New skill added successfully');
      }

      setSkillModalOpen(false);
      loadAllData();
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      try {
        await skillsAPI.delete(id);
        showToast('success', 'Skill deleted');
        loadAllData();
      } catch (error) {
        showToast('error', 'Failed to delete skill');
      }
    }
  };

  // --- MESSAGE ACTIONS ---
  const handleToggleRead = async (id, currentRead) => {
    try {
      await messagesAPI.toggleRead(id, !currentRead);
      loadAllData();
    } catch (error) {
      showToast('error', 'Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this contact message permanently?')) {
      try {
        await messagesAPI.delete(id);
        showToast('success', 'Message deleted');
        if (messageViewModal?._id === id) setMessageViewModal(null);
        loadAllData();
      } catch (error) {
        showToast('error', 'Failed to delete message');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">Admin Console</h1>
              <p className="text-[11px] font-mono text-cyan-400">
                {admin?.email || 'umarsaleem0563@gmail.com'} &bull; Full-Access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-16 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2.5 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-700/80'
                : 'bg-red-950/90 text-red-200 border-red-700/80'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>PROJECTS</span>
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {stats?.totalProjects ?? projects.length}
            </div>
            <p className="text-[11px] text-slate-500">Active showcase projects</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>SKILLS</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {stats?.totalSkills ?? skills.length}
            </div>
            <p className="text-[11px] text-slate-500">Technical proficiencies</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>MESSAGES</span>
              <Mail className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {stats?.totalMessages ?? messages.length}
            </div>
            <p className="text-[11px] text-slate-500">Received inquiries</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>UNREAD</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
            </div>
            <div className="text-3xl font-black text-white">
              {stats?.unreadMessages ?? messages.filter((m) => !m.read).length}
            </div>
            <p className="text-[11px] text-slate-500">Awaiting your response</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
            { id: 'skills', label: `Skills (${skills.length})`, icon: Sparkles },
            { id: 'messages', label: `Messages (${messages.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Inquiries List */}
              <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Recent Inquiries</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    View All &rarr;
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-sm text-slate-500 py-6 text-center">No messages received yet.</p>
                ) : (
                  <div className="divide-y divide-slate-800/80">
                    {messages.slice(0, 4).map((msg) => (
                      <div
                        key={msg._id}
                        className="py-3.5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-900/40 p-2 rounded-xl transition-colors"
                        onClick={() => setMessageViewModal(msg)}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{msg.name}</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 font-medium">{msg.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions & System Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white">Quick Administration Actions</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={openNewProjectModal}
                      className="w-full inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-semibold transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyan-400" /> Add New Project
                      </span>
                      <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>

                    <button
                      onClick={openNewSkillModal}
                      className="w-full inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 text-xs font-semibold transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" /> Add Technical Skill
                      </span>
                      <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3 text-xs text-slate-400 font-mono">
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="text-emerald-400">MongoDB Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backend Server:</span>
                    <span className="text-cyan-400">Express v4 / Node v24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authentication:</span>
                    <span className="text-purple-400">JWT Bearer (7-day validity)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PROJECTS MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Project Showcase Management</h3>
                <p className="text-xs text-slate-400">
                  Add, update, or remove projects displayed on the public portfolio.
                </p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/80 text-cyan-400 border border-cyan-500/30">
                        {proj.category}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white line-clamp-1">{proj.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {proj.technologies?.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-cyan-400"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white"
                          title="GitHub Repo"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        title="Edit Project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteProject(proj._id, proj.title)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: SKILLS MANAGEMENT --- */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Technical Skills Management</h3>
                <p className="text-xs text-slate-400">
                  Add, update, or remove technical skills and proficiency percentages.
                </p>
              </div>
              <button
                onClick={openNewSkillModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                    <tr>
                      <th className="px-6 py-4">Skill Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Proficiency</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {skills.map((skill) => (
                      <tr key={skill._id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{skill.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-cyan-400">
                            {skill.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full"
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-xs">{skill.proficiency}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => openEditSkillModal(skill)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill._id, skill.name)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: MESSAGES MANAGEMENT --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Client Messages & Inquiries</h3>
              <p className="text-xs text-slate-400">
                Review messages received from visitors through the portfolio contact form.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-2 border border-slate-800">
                <Mail className="w-8 h-8 mx-auto text-slate-600" />
                <p>No messages in your inbox.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`glass-card rounded-2xl p-5 border transition-all ${
                      msg.read
                        ? 'border-slate-800/80 bg-slate-950/40'
                        : 'border-cyan-500/30 bg-cyan-950/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-white">{msg.name}</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs font-mono text-cyan-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                              Unread
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200">{msg.subject}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(msg._id, msg.read)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300"
                        >
                          {msg.read ? 'Mark Unread' : 'Mark Read'}
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20"
                        >
                          Reply
                        </a>

                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {msg.message}
                    </div>

                    <div className="mt-3 text-[11px] font-mono text-slate-500">
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL: CREATE / EDIT PROJECT --- */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-mono text-slate-300">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. ShopZenith E-Commerce"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300">Display Order</label>
                  <input
                    type="number"
                    value={projectForm.order}
                    onChange={(e) => setProjectForm({ ...projectForm, order: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-300">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-300">Project Description *</label>
                <textarea
                  rows="4"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Provide detailed description of features, stack, and architecture..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Image URL or File Upload */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="font-mono text-slate-300">Project Thumbnail Image</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Image URL:</span>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Or Upload File:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProjectImageFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT SKILL --- */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSkillModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingSkill ? 'Edit Technical Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-mono text-slate-300">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Next.js, Redis, Docker"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-300">Category *</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools & DevOps">Tools & DevOps</option>
                  <option value="Languages">Languages</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="font-mono text-slate-300">Proficiency: {skillForm.proficiency}%</label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: QUICK VIEW MESSAGE --- */}
      {messageViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setMessageViewModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">{messageViewModal.subject}</h3>
            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div>From: <span className="text-white">{messageViewModal.name}</span> ({messageViewModal.email})</div>
              <div>Date: {new Date(messageViewModal.createdAt).toLocaleString()}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm whitespace-pre-line leading-relaxed">
              {messageViewModal.message}
            </div>

            <div className="pt-3 flex items-center justify-between">
              <a
                href={`mailto:${messageViewModal.email}?subject=Re: ${encodeURIComponent(messageViewModal.subject)}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setMessageViewModal(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

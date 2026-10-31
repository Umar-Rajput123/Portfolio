import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving projects',
      error: error.message,
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving project details',
      error: error.message,
    });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, githubUrl, liveUrl, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // Process technologies array (could be sent as JSON string or comma-separated string)
    let parsedTech = [];
    if (typeof technologies === 'string') {
      try {
        parsedTech = JSON.parse(technologies);
      } catch {
        parsedTech = technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(technologies)) {
      parsedTech = technologies;
    }

    if (!parsedTech || parsedTech.length === 0) {
      parsedTech = ['React', 'Node.js', 'Express', 'MongoDB'];
    }

    // Determine image: uploaded file or imageUrl in body or default fallback
    let image = req.body.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create({
      title,
      description,
      category: category || 'Full Stack',
      technologies: parsedTech,
      image,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: featured === 'true' || featured === true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project',
      error: error.message,
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const { title, description, category, technologies, githubUrl, liveUrl, featured, order, image } = req.body;

    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (order !== undefined) project.order = Number(order);

    if (technologies) {
      if (typeof technologies === 'string') {
        try {
          project.technologies = JSON.parse(technologies);
        } catch {
          project.technologies = technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
      } else if (Array.isArray(technologies)) {
        project.technologies = technologies;
      }
    }

    // Check if new file was uploaded
    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      project.image = image;
    }

    const updatedProject = await project.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating project',
      error: error.message,
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // If local file in uploads, attempt removal safely
    if (project.image && project.image.startsWith('/uploads/')) {
      try {
        const filePath = path.join(process.cwd(), project.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.warn('Failed to clean up uploaded file:', err.message);
      }
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting project',
      error: error.message,
    });
  }
};

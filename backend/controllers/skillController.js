import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    const skills = await Skill.find(filter).sort({ order: 1, proficiency: -1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving skills',
      error: error.message,
    });
  }
};

// @desc    Get single skill by ID
// @route   GET /api/skills/:id
// @access  Public
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving skill',
      error: error.message,
    });
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, icon, featured, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required',
      });
    }

    const skill = await Skill.create({
      name,
      category: category || 'Frontend',
      proficiency: Number(proficiency) || 80,
      icon: icon || 'Code',
      featured: featured !== undefined ? Boolean(featured) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating skill',
      error: error.message,
    });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    const { name, category, proficiency, icon, featured, order } = req.body;

    if (name) skill.name = name;
    if (category) skill.category = category;
    if (proficiency !== undefined) skill.proficiency = Number(proficiency);
    if (icon) skill.icon = icon;
    if (featured !== undefined) skill.featured = Boolean(featured);
    if (order !== undefined) skill.order = Number(order);

    const updatedSkill = await skill.save();

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating skill',
      error: error.message,
    });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting skill',
      error: error.message,
    });
  }
};

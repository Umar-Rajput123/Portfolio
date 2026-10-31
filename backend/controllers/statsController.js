import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';

// @desc    Get dashboard metrics & statistics
// @route   GET /api/stats
// @access  Private (Admin)
export const getAdminStats = async (req, res) => {
  try {
    const [totalProjects, totalSkills, totalMessages, unreadMessages, recentMessages] =
      await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Message.countDocuments(),
        Message.countDocuments({ read: false }),
        Message.find().sort({ createdAt: -1 }).limit(5),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        totalSkills,
        totalMessages,
        unreadMessages,
        recentMessages,
      },
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving statistics',
      error: error.message,
    });
  }
};

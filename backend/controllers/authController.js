import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Helper to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_jwt_token_key_for_umar_portfolio_2026',
    { expiresIn: '7d' }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find admin by email
    let admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // If no admin exists in DB yet, auto-create default admin from .env
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@umarrajpoot.dev').toLowerCase().trim();
      const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

      admin = await Admin.create({
        name: 'Umar Rajpoot',
        email: defaultEmail,
        password: defaultPassword,
        role: 'admin',
      });
      console.log(`ℹ️ Auto-seeded default admin account: ${defaultEmail}`);
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving admin profile',
      error: error.message,
    });
  }
};

// @desc    Update admin profile/password
// @route   PUT /api/auth/profile
// @access  Private (Admin)
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin profile updated successfully',
      admin: {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      },
      token: generateToken(updatedAdmin._id, updatedAdmin.role),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating admin profile',
      error: error.message,
    });
  }
};

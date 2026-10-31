import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);

export default router;

import express from 'express';
import {
  submitMessage,
  getMessages,
  toggleMessageRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitMessage);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, toggleMessageRead);
router.delete('/:id', protect, deleteMessage);

export default router;

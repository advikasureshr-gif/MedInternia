import express from 'express';
import { getNotifications } from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get notifications for logged-in user
router.get('/', authenticate, getNotifications);

// Mark all notifications as read
import { markAllRead, markRead } from '../controllers/notificationController';
router.post('/mark-all-read', authenticate, markAllRead);

// Mark a single notification as read
router.post('/mark-read', authenticate, markRead);

export default router;

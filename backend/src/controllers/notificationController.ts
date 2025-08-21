import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Notification from '../models/Notification';
import Webinar from '../models/Webinar';
import User from '../models/User';

// Send notification to all interns about a new webinar
export const notifyInternsWebinar = async (webinar: any) => {
  const interns = await User.find({ userType: 'intern' });
  const notifications = interns.map(intern => ({
    recipient: intern._id,
    message: `New webinar scheduled: ${webinar.title} by Dr. ${webinar.host.firstName} ${webinar.host.lastName}`,
    type: 'webinar',
    link: `/webinars/${webinar._id}`
  }));
  await Notification.insertMany(notifications);
};
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }
    const userId = req.user._id;
    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notifications' });
  }
};
// Mark all notifications as read for the logged-in user
export const markAllRead = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking all as read' });
  }
};

// Mark a single notification as read
export const markRead = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }
    const { id } = req.body;
    await Notification.updateOne({ _id: id, recipient: req.user._id }, { isRead: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking notification as read' });
  }
};


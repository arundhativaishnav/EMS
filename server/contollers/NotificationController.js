import express from 'express';
import Notification from '../Models/Notifications.js';
import User from '../Models/User.js';

export const createNotification = async (req, res) => {
  try {
    const { title, message, isGlobal, recipients } = req.body;

    const notification = new Notification({
      title,
      message,
      isGlobal,
      recipients: isGlobal ? [] : recipients,
    });

    await notification.save();
    res.status(201).json({ success: true, message: 'Notification sent successfully.' });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({
      $or: [
        { isGlobal: true },
        { recipients: userId }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

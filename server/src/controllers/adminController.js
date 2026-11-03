import mongoose from 'mongoose';
import User from '../models/User.js';
import Enquiry from '../models/Enquiry.js';
import Contact from '../models/Contact.js';
import Plan from '../models/Plan.js';

let inMemoryUsers = [
  { _id: 'u-1', name: 'Grandmaster Admin', email: 'admin@dragonballgym.com', role: 'admin', preferredLocation: 'The Citadel (Flagship Downtown)', createdAt: '2026-01-10T10:00:00Z' },
  { _id: 'u-2', name: 'Goku Athlete', email: 'member@dragonballgym.com', role: 'member', preferredLocation: 'Gravity Heights (Uptown District)', createdAt: '2026-02-14T12:30:00Z' },
  { _id: 'u-3', name: 'Vegeta Prince', email: 'vegeta@dragonballgym.com', role: 'member', preferredLocation: 'The Citadel (Flagship Downtown)', createdAt: '2026-02-18T09:15:00Z' },
  { _id: 'u-4', name: 'Trunks Briefs', email: 'trunks@dragonballgym.com', role: 'member', preferredLocation: 'Kame Sanctuary (West Coast)', createdAt: '2026-03-01T14:45:00Z' },
];

// @desc    Get aggregated admin metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalUsers = await User.countDocuments();
      const totalEnquiries = await Enquiry.countDocuments();
      const pendingEnquiries = await Enquiry.countDocuments({ status: 'pending' });
      const totalContacts = await Contact.countDocuments();
      const unreadContacts = await Contact.countDocuments({ read: false });
      const totalPlans = await Plan.countDocuments();

      return res.status(200).json({
        success: true,
        stats: {
          totalUsers,
          totalEnquiries,
          pendingEnquiries,
          totalContacts,
          unreadContacts,
          totalPlans,
        },
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: inMemoryUsers.length,
        totalEnquiries: 8,
        pendingEnquiries: 3,
        totalContacts: 5,
        unreadContacts: 2,
        totalPlans: 3,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    }

    res.status(200).json({
      success: true,
      count: inMemoryUsers.length,
      data: inMemoryUsers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['member', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role value.',
      });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    }

    const item = inMemoryUsers.find(u => u._id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    item.role = role;
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

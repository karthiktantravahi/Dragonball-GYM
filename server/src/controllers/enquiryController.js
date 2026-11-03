import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

let inMemoryEnquiries = [
  {
    _id: 'enq-101',
    name: 'Gohan Son',
    email: 'gohan@dragonballgym.com',
    phone: '+1 (555) 349-2810',
    preferredPlan: 'Super Saiyan',
    preferredLocation: 'The Citadel (Flagship Downtown)',
    fitnessGoal: 'Hypertrophy & Strength',
    notes: 'Preparing for regional tournaments.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    _id: 'enq-102',
    name: 'Vegeta Prince',
    email: 'vegeta@dragonballgym.com',
    phone: '+1 (555) 992-1200',
    preferredPlan: 'Ultra Instinct VIP',
    preferredLocation: 'Gravity Heights (Uptown District)',
    fitnessGoal: 'Combat Sports & Striking',
    notes: 'Requires 400x gravity chamber simulation.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

// @desc    Submit new membership enquiry or day pass request
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, preferredPlan, preferredLocation, fitnessGoal, notes } = req.body;

    if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.',
      });
    }

    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.create({
        name,
        email,
        phone,
        preferredPlan: preferredPlan || 'Super Saiyan',
        preferredLocation: preferredLocation || 'The Citadel (Flagship Downtown)',
        fitnessGoal: fitnessGoal || 'Hypertrophy & Strength',
        notes: notes || '',
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully. A concierge will reach out promptly.',
        data: enquiry,
      });
    }

    // In-memory fallback
    const newEnquiry = {
      _id: 'enq-' + Date.now(),
      name,
      email,
      phone,
      preferredPlan: preferredPlan || 'Super Saiyan',
      preferredLocation: preferredLocation || 'The Citadel (Flagship Downtown)',
      fitnessGoal: fitnessGoal || 'Hypertrophy & Strength',
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    inMemoryEnquiries.unshift(newEnquiry);

    res.status(201).json({
      success: true,
      message: 'Enquiry received successfully. A concierge will reach out promptly.',
      data: newEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all membership enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
export const getEnquiries = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    }

    res.status(200).json({
      success: true,
      count: inMemoryEnquiries.length,
      data: inMemoryEnquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id/status
// @access  Private/Admin
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'contacted', 'converted', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.',
      });
    }

    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
      }

      return res.status(200).json({
        success: true,
        data: enquiry,
      });
    }

    const item = inMemoryEnquiries.find(e => e._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    item.status = status;
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
export const deleteEnquiry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry record deleted successfully.',
      });
    }

    inMemoryEnquiries = inMemoryEnquiries.filter(e => e._id !== req.params.id);
    res.status(200).json({
      success: true,
      message: 'Enquiry record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

let inMemoryContacts = [
  {
    _id: 'con-201',
    name: 'Bulma Briefs',
    email: 'bulma@capsulecorp.com',
    phone: '+1 (800) 555-CAPS',
    subject: 'Corporate Partnerships',
    message: 'We want to sponsor corporate wellness memberships for 250 engineers and researchers at Capsule Corp.',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    _id: 'con-202',
    name: 'Krillin Monk',
    email: 'krillin@dragonballgym.com',
    phone: '+1 (555) 438-9921',
    subject: 'Personal Trainer Consult',
    message: 'Interested in 1-on-1 coaching with Coach Kenji to prepare for our regional athletic championship.',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  }
];

// @desc    Submit new contact inquiry
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
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
      const contact = await Contact.create({
        name,
        email,
        phone: phone || '',
        subject: subject || 'Membership Inquiry',
        message,
      });

      return res.status(201).json({
        success: true,
        message: 'Contact message received. Our concierge will follow up promptly.',
        data: contact,
      });
    }

    const newContact = {
      _id: 'con-' + Date.now(),
      name,
      email,
      phone: phone || '',
      subject: subject || 'Membership Inquiry',
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    inMemoryContacts.unshift(newContact);

    res.status(201).json({
      success: true,
      message: 'Contact message received. Our concierge will follow up promptly.',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    }

    res.status(200).json({
      success: true,
      count: inMemoryContacts.length,
      data: inMemoryContacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact message as read
// @route   PATCH /api/contacts/:id/read
// @access  Private/Admin
export const markAsRead = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact record not found.',
        });
      }

      return res.status(200).json({
        success: true,
        data: contact,
      });
    }

    const item = inMemoryContacts.find(c => c._id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Contact record not found.' });
    }
    item.read = true;
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact inquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findByIdAndDelete(req.params.id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact record not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Contact message deleted.',
      });
    }

    inMemoryContacts = inMemoryContacts.filter(c => c._id !== req.params.id);
    res.status(200).json({
      success: true,
      message: 'Contact message deleted.',
    });
  } catch (error) {
    next(error);
  }
};

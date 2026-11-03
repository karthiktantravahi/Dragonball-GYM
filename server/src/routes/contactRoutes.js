import express from 'express';
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, adminOnly, getContacts);
router.patch('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;

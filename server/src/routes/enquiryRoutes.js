import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', protect, adminOnly, getEnquiries);
router.patch('/:id/status', protect, adminOnly, updateEnquiryStatus);
router.delete('/:id', protect, adminOnly, deleteEnquiry);

export default router;

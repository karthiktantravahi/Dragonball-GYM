import express from 'express';
import { getStats, getAllUsers, updateUserRole } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);

export default router;

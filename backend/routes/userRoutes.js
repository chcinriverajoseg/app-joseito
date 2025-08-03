// backend/routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  likeUser,
  getMatches,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getCurrentUser);
router.post('/like/:id', authenticateToken, likeUser);
router.get('/matches', authenticateToken, getMatches);

export default router;

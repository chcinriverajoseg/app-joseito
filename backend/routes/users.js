
import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  likeUser,
  getUserMatches
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getUsers);
router.post('/like', authMiddleware, likeUser);
router.get('/matches', authMiddleware, getUserMatches);

export default router;

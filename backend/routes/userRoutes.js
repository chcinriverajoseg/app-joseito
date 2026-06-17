import express from 'express'
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getExploreUsers,
  likeUser,
  getMatches,
  getMessagesByChatId,
  sendMessageByChatId,
  updateUserProfile,
  getConversations   // 👈 AQUÍ
} from '../controllers/userController.js'

import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authenticateToken, getCurrentUser)
router.get('/explore', authenticateToken, getExploreUsers) // 👈 AGREGA ESTO

router.post('/like/:id', authenticateToken, likeUser)
router.get('/matches', authenticateToken, getMatches)
router.get('/messages/:chatId', authenticateToken, getMessagesByChatId)
router.post('/messages/:chatId', authenticateToken, sendMessageByChatId)
router.get('/conversations', authenticateToken, getConversations)
router.put('/me', authenticateToken, updateUserProfile)


export default router

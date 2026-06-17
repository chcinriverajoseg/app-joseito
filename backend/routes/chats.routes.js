import express from 'express'
import { authenticateToken as protect } from '../middleware/authMiddleware.js'
import {
  getConversations,
  getMessagesByChatId,
  sendMessageByChatId
} from '../controllers/userController.js'

const router = express.Router()
router.use(protect)

router.get('/', getConversations)
router.get('/:chatId', getMessagesByChatId)
router.post('/:chatId', sendMessageByChatId)

export default router
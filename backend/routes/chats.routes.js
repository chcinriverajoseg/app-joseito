// routes/chats.routes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  listMyChats, getOrCreateWith, getChat, listMessages, sendMessage
} from "../controllers/chats.controller.js";

const router = express.Router();
router.use(protect);
router.get("/", listMyChats);
router.post("/with/:userId", getOrCreateWith);
router.get("/:chatId", getChat);
router.get("/:chatId/messages", listMessages);
router.post("/:chatId/messages", sendMessage);
export default router;

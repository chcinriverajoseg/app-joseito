import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chats.routes.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
})

io.on('connection', (socket) => {
  socket.on('join_chat', (chatId) => {
    socket.join(chatId)
  })
  socket.on('disconnect', () => {})
})

app.use(cors({
  origin: 'https://app-joseito.vercel.app',
  credentials: true
}))
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error al conectar a MongoDB', err))

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
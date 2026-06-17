import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Match from '../models/Match.js'
import Message from '../models/Message.js'

console.log('UserController cargado')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

/* =============================
   REGISTER
============================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, interests } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      interests,
    })

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

/* =============================
   LOGIN
============================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

/* =============================
   LIKE USER
============================= */
export const likeUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id)
    const targetUser = await User.findById(req.params.id)

    if (!currentUser) {
      return res.status(404).json({ message: 'Usuario actual no encontrado' })
    }

    if (!targetUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (currentUser._id.toString() === targetUser._id.toString()) {
      return res.status(400).json({ message: 'No puedes darte like a ti mismo' })
    }

    const alreadyLiked = currentUser.likesGiven.some(
      id => id.toString() === targetUser._id.toString()
    )

    if (alreadyLiked) {
      return res.status(400).json({ message: 'Ya le diste like' })
    }

    currentUser.likesGiven.push(targetUser._id)
    targetUser.likesReceived.push(currentUser._id)

    await currentUser.save()
    await targetUser.save()

    const isMutual = targetUser.likesGiven.some(
      id => id.toString() === currentUser._id.toString()
    )

    if (isMutual) {
      const existingMatch = await Match.findOne({
        users: { $all: [currentUser._id, targetUser._id] }
      })

      if (!existingMatch) {
        const match = await Match.create({
          users: [currentUser._id, targetUser._id]
        })

        currentUser.matches.push(match._id)
        targetUser.matches.push(match._id)

        await currentUser.save()
        await targetUser.save()

        return res.json({ match: true, matchId: match._id })
      }

      return res.json({ match: true, matchId: existingMatch._id })
    }

    res.json({ match: false })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error dando like' })
  }
}

/* =============================
   GET MATCHES
============================= */
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.user.id
    }).populate('users', 'name profileImage bio')

    const formatted = matches.map(m => {
      const partner = m.users.find(
        u => u._id.toString() !== req.user.id
      )
      return {
        chatId: m._id,
        ...partner.toObject()
      }
    })

    res.json(formatted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo matches' })
  }
}

/* =============================
   GET CONVERSATIONS
============================= */
export const getConversations = async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.user.id
    }).populate('users', 'name profileImage')

    const conversations = await Promise.all(
      matches.map(async (match) => {
        const partner = match.users.find(
          u => u._id.toString() !== req.user.id
        )

        const lastMessage = await Message.findOne({
          match: match._id
        }).sort({ createdAt: -1 })

        return {
          chatId: match._id,
          partner,
          lastMessage: lastMessage
            ? { text: lastMessage.text }
            : null
        }
      })
    )

    res.json(conversations)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo conversaciones' })
  }
}

/* =============================
   GET MESSAGES
============================= */
export const getMessagesByChatId = async (req, res) => {
  try {
    const messages = await Message.find({
      match: req.params.chatId
    }).sort({ createdAt: 1 })

    const formatted = messages.map(m => ({
      _id: m._id,
      text: m.text,
      me: m.sender.toString() === req.user.id,
      createdAt: m.createdAt
    }))

    res.json(formatted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo mensajes' })
  }
}

/* =============================
   SEND MESSAGE
============================= */
export const sendMessageByChatId = async (req, res) => {
  try {
    const message = await Message.create({
      match: req.params.chatId,
      sender: req.user.id,
      text: req.body.text
    })

    const payload = {
      _id: message._id,
      text: message.text,
      me: true,
      createdAt: message.createdAt
    }

    // Emitir a todos en la sala del chat
    const { io } = await import('../index.js')
    io.to(req.params.chatId).emit('new_message', {
      ...payload,
      me: false
    })

    res.json(payload)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error enviando mensaje' })
  }
}

/* =============================
   GET CURRENT USER
============================= */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

/* =============================
   UPDATE PROFILE
============================= */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.name = req.body.name ?? user.name
    user.age = req.body.age ?? user.age
    user.gender = req.body.gender ?? user.gender
    user.interests = req.body.interests ?? user.interests
    user.bio = req.body.bio ?? user.bio
    user.profileImage = req.body.profileImage ?? user.profileImage

    const updated = await user.save()

    res.json(updated)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error actualizando perfil' })
  }
}

/* =============================
   GET EXPLORE USERS
============================= */
export const getExploreUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id)

    const users = await User.find({
      _id: { 
        $ne: req.user.id,
        $nin: currentUser.likesGiven
      }
    }).select('-password')

    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo usuarios' })
  }
}

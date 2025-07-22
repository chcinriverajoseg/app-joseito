// backend/controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ... resto del código igual ...

// REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, interests, bio, profileImage } = req.body;

    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: 'Los intereses deben estar en un arreglo' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      interests,
      bio,
      profileImage,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// OBTENER TODOS LOS USUARIOS (excepto el actual)
export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const users = await User.find({ _id: { $ne: currentUserId } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// DAR LIKE
export const likeUser = async (req, res) => {
  try {
    const { likedUserId } = req.body;
    const currentUserId = req.userId;

    const currentUser = await User.findById(currentUserId);
    const likedUser = await User.findById(likedUserId);

    if (!currentUser || !likedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (currentUser.likes.includes(likedUserId)) {
      return res.status(400).json({ message: 'Ya diste like a este usuario' });
    }

    currentUser.likes.push(likedUserId);
    await currentUser.save();

    // Verificar si es un match
    if (likedUser.likes.includes(currentUserId)) {
      currentUser.matches.push(likedUserId);
      likedUser.matches.push(currentUserId);
      await currentUser.save();
      await likedUser.save();
      return res.json({ message: '¡Es un match!', match: true });
    }

    res.json({ message: 'Like registrado', match: false });
  } catch (error) {
    res.status(500).json({ message: 'Error al dar like', error });
  }
};

// OBTENER MATCHES
export const getUserMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).populate('matches', 'name email profileImage');
    res.json(currentUser.matches);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener matches', error });
  }
};

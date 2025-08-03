// backend/controllers/userController.js
import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Asegúrate de también exportar aquí los otros controladores que uses
export const registerUser = async (req, res) => { /* tu lógica */ };
export const loginUser = async (req, res) => { /* tu lógica */ };
export const likeUser = async (req, res) => { /* tu lógica */ };
export const getMatches = async (req, res) => { /* tu lógica */ };

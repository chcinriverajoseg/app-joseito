// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Aquí asegúrate que la propiedad sea igual que usas en controller
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;

// src/api/user.js
import axios from './axios'; // Asegúrate que este sea el axios configurado con baseURL

// ✅ Obtener perfiles para explorar
export const fetchExploreProfiles = async (token) => {
  const response = await axios.get('/explore', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// (aquí puedes agregar más funciones luego, como enviar likes, obtener matches, etc.)

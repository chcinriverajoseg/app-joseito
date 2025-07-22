import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(formData);
      login(userData); // guarda token y usuario
      navigate('/matches'); // redireccionar tras login
    } catch (err) {
      console.error('Login fallido:', err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Correo"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;

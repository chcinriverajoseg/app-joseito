import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/api/axios';
import { useUser } from '@/context/UserContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/users/login', form);
    login(res.data.user);
    navigate('/explore');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="border p-2" />
      <button type="submit" className="bg-green-500 text-white p-2">Iniciar sesión</button>
    </form>
  );
};

export default Login;

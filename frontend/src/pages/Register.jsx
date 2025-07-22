import { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', gender: '', interests: '', bio: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interestsArray = form.interests.split(',').map(i => i.trim());
    try {
      await axios.post('/users/register', { ...form, interests: interestsArray });
      alert('Usuario registrado correctamente');
    } catch (error) {
      console.error(error.response.data);
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Nombre" />
      <input name="email" onChange={handleChange} placeholder="Correo" />
      <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" />
      <input name="age" onChange={handleChange} placeholder="Edad" />
      <input name="gender" onChange={handleChange} placeholder="Género" />
      <input name="interests" onChange={handleChange} placeholder="Intereses (coma)" />
      <textarea name="bio" onChange={handleChange} placeholder="Biografía" />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;

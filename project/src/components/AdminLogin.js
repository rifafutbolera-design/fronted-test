import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email === 'yoelrobaina96@gmail.com' && password === 'LaJuanita*00') {
      onLogin(true);
      navigate('/admin-panel');
    } else {
      setError('Credenciales incorrectas. ¡Intenta de nuevo, genio!');
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-10">
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Inicio
          </motion.button>
        </Link>
        <h2 className="text-4xl font-bold text-center text-black flex-grow">Acceso Admin</h2>
        <div className="w-24"></div>
      </div>

      <motion.form
        onSubmit={handleLogin}
        className="bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 p-8 space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-black mb-2">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-black mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        {error && (
          <motion.p
            className="text-red-600 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignInAlt /> Iniciar Sesión
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AdminLogin;
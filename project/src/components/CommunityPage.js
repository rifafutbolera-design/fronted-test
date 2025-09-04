import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaWhatsapp, FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CommunityPage = ({ onShare }) => { // Recibir onShare como prop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shareUrl = window.location.origin; // URL de la web para compartir
  const shareTitle = "Échate Camiseta - ¡Tu pasión, tu camiseta!";
  const shareText = "¡Descubre las mejores camisetas de fútbol en Échate Camiseta!";

  const handleShareFacebook = () => {
    if (typeof window !== 'undefined') { // Verificar si window está disponible
      try {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        onShare(); // Incrementar contador al compartir
      } catch (error) {
        console.error("Error al compartir en Facebook:", error);
        alert("No se pudo compartir en Facebook. Por favor, intenta más tarde.");
      }
    } else {
      alert("El entorno actual no permite compartir en Facebook.");
    }
  };

  const handleShareInstagram = () => {
    // Instagram no permite compartir directamente a través de URL como Facebook/WhatsApp
    // Lo más cercano es abrir la app o web de Instagram para que el usuario suba una historia/post
    alert("Para compartir en Instagram, por favor, copia el enlace de la web y pégalo en tu historia o publicación: " + shareUrl);
    if (typeof window !== 'undefined') { // Verificar si window está disponible
      try {
        window.open("https://www.instagram.com/", '_blank');
        onShare(); // Incrementar contador al compartir
      } catch (error) {
        console.error("Error al abrir Instagram:", error);
        alert("No se pudo abrir Instagram. Por favor, asegúrate de tener la aplicación instalada o intenta más tarde.");
      }
    } else {
      alert("El entorno actual no permite abrir Instagram.");
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') { // Verificar si window está disponible
      try {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
        onShare(); // Incrementar contador al compartir
      } catch (error) {
        console.error("Error al compartir en WhatsApp:", error);
        alert("No se pudo abrir WhatsApp. Por favor, asegúrate de tener la aplicación instalada o intenta más tarde.");
      }
    } else {
      alert("El entorno actual no permite abrir enlaces de WhatsApp.");
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-3xl text-center"
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
        <h2 className="text-4xl font-bold text-center text-black flex-grow">Únete a la Comunidad</h2>
        <div className="w-24"></div>
      </div>

      <motion.div
        className="bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 p-8 space-y-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-lg text-gray-800">
          ¡Conéctate con otros fans y comparte tu pasión por el fútbol!
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            href="https://www.instagram.com/echatecamiseta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs"
          >
            <motion.button
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram className="text-2xl" /> Síguenos
            </motion.button>
          </a>

          <div className="w-full max-w-xs text-black text-xl font-bold mt-8">
            <p className="mb-4 flex items-center justify-center gap-2">
              <FaShareAlt /> ¡Comparte la web!
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={handleShareFacebook}
                className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook className="text-2xl" />
              </motion.button>
              <motion.button
                onClick={handleShareInstagram}
                className="p-4 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transform hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram className="text-2xl" />
              </motion.button>
              <motion.button
                onClick={handleShareWhatsApp}
                className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transform hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaWhatsapp className="text-2xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommunityPage;
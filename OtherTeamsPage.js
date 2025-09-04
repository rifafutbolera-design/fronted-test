import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OtherTeamsPage = ({ products, onProductView }) => {
  useEffect(() => {
    // Asegurarse de que el scroll se ejecute después del renderizado inicial
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppQuery = () => {
    const phoneNumber = "+5363832575";
    const whatsappMessage = `¡Hola Échate Camiseta! Estoy interesado en saber qué otros equipos tienen disponibles.`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    if (typeof window !== 'undefined') {
      try {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      } catch (error) {
        console.error("Error al abrir WhatsApp:", error);
        alert("No se pudo abrir WhatsApp. Por favor, asegúrate de tener la aplicación instalada o intenta más tarde.");
      }
    } else {
      alert("El entorno actual no permite abrir enlaces de WhatsApp.");
    }
  };

  // Filtrar productos que no son del Barcelona
  const otherTeamProducts = products.filter(product => product.team !== 'Barcelona');

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-5xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-10">
        <Link to="/productos">
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver a Productos Barça
          </motion.button>
        </Link>
        <h2 className="text-4xl font-bold text-center text-black flex-grow">Otros Equipos</h2>
        <div className="w-24"></div>
      </div>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherTeamProducts.length > 0 ? (
          otherTeamProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 p-6 flex flex-col items-center text-center w-full cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onViewportEnter={() => onProductView(product.id)}
            >
              <Link to={`/producto/${product.id}`} className="block w-full">
                <img src={product.image} alt={product.name} className="w-full h-auto rounded-2xl mb-4 object-cover" />
                <h3 className="text-2xl font-bold text-black mb-2">{product.name}</h3>
                <p className="text-xl font-semibold text-black mb-4">${product.price} USD</p>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-800 text-xl col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No se encontraron productos para otros equipos.
          </motion.p>
        )}
      </section>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          onClick={handleWhatsAppQuery}
          className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="inline-block mr-2" /> Consultar por otros equipos
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OtherTeamsPage;
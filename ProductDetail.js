import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft, FaUser, FaDollarSign } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  const [selectedPlayerImage, setSelectedPlayerImage] = useState(product?.image);
  const [selectedPlayerName, setSelectedPlayerName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.players && product.players.length > 0) {
      // Seleccionar el primer jugador por defecto si hay jugadores
      setSelectedPlayerName(product.players[0].name);
      setSelectedPlayerImage(product.players[0].image);
    } else if (product) {
      // Si no hay jugadores, usar la imagen principal del producto
      setSelectedPlayerImage(product.image);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 max-w-5xl text-center text-red-600 text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Producto no encontrado. ¡Parece que se fue a calentar al banquillo!</p>
        <Link to="/productos">
          <motion.button
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver a Productos
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  const handlePlayerSelect = (player) => {
    setSelectedPlayerName(player.name);
    setSelectedPlayerImage(player.image);
  };

  const handleBuyClick = () => {
    const phoneNumber = "+5363832575";
    // Asegurarse de que playerText sea una cadena vacía si no hay jugador seleccionado
    const playerText = selectedPlayerName ? ` (Jugador: ${selectedPlayerName})` : '';
    const whatsappMessage = `¡Hola Échate Camiseta! Estoy interesado en comprar el producto: ${product.name}${playerText} con un precio de $${product.price} USD.`;
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
            <FaArrowLeft /> Volver a Productos
          </motion.button>
        </Link>
        <h2 className="text-4xl font-bold text-center text-black flex-grow">{product.name}</h2>
        <div className="w-24"></div>
      </div>

      <div className="bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 p-8 flex flex-col lg:flex-row gap-8">
        <motion.div
          className="lg:w-1/2 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={selectedPlayerImage} alt={product.name} className="w-full h-auto rounded-2xl object-cover shadow-lg" />
        </motion.div>

        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-4xl font-bold text-black mb-4">{product.name}</h3>
            <p className="text-3xl font-semibold text-black mb-6 flex items-center gap-2">
              <FaDollarSign /> {product.price} USD
            </p>
            <p className="text-lg text-gray-800 mb-6">
              {product.description || "¡Este producto es tan increíble que las palabras no le hacen justicia! Calidad premium para los verdaderos fans del fútbol."}
            </p>

            {product.players && product.players.length > 0 && (
              <div className="mb-6">
                <p className="text-xl font-semibold text-black mb-3 flex items-center gap-2">
                  <FaUser /> Selecciona tu Jugador:
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.players.map((player, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handlePlayerSelect(player)}
                      className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedPlayerName === player.name
                          ? 'bg-black text-white shadow-md'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {player.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <motion.button
            onClick={handleBuyClick}
            className="mt-8 flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="text-xl" /> Comprar por WhatsApp
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
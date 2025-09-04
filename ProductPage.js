import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductPage = ({ products, onProductView }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrar solo los productos del Barcelona
  const barcelonaProducts = products.filter(product => product.team === 'Barcelona');

  // Ordenar los productos del Barcelona: primero "Jersey Local", luego "Jersey Visitante"
  const sortedBarcelonaProducts = [...barcelonaProducts].sort((a, b) => {
    const order = {
      "Jersey Local 25/26": 1,
      "Jersey Visitante 25/26": 2
    };
    const orderA = order[a.name] || 99;
    const orderB = order[b.name] || 99;
    return orderA - orderB;
  });

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-5xl"
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
        <h2 className="text-4xl font-bold text-center text-black flex-grow">Productos del Barça</h2>
        <div className="w-24"></div>
      </div>
      
      <section className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {sortedBarcelonaProducts.length > 0 ? (
          sortedBarcelonaProducts.map((product, index) => (
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
                <p className="text-xl font-semibold text-black mb-4">${product.price} USD</p> {/* Color de precio a negro */}
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
            No se encontraron productos del Barça.
          </motion.p>
        )}
      </section>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link to="/otros-equipos">
          <motion.button
            className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver más equipos
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;
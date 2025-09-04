import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BannerRotator = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl aspect-video">
      <AnimatePresence initial={false}> {/* Eliminado mode="wait" para superposición */}
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ x: '100%' }} // Inicia fuera de la vista a la derecha
          animate={{ x: '0%' }} // Se mueve a la posición central
          exit={{ x: '-100%' }} // Sale por la izquierda
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
};

export default BannerRotator;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaPlusCircle, FaEye, FaDollarSign, FaTag, FaImage, FaArrowLeft, FaUserPlus, FaTrash, FaAd, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminPanel = ({ products, setProducts, visits, setVisits, appBanners, setAppBanners, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'addProduct', 'manageBanners'
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPlayers, setNewProductPlayers] = useState([]); // Para jugadores
  const [currentPlayerName, setCurrentPlayerName] = useState('');
  const [currentPlayerImage, setCurrentPlayerImage] = useState('');
  const [newProductTeam, setNewProductTeam] = useState(''); // Nuevo campo para el equipo
  const teams = ['Barcelona', 'Real Madrid', 'PSG', 'Bayern Múnich', 'AC Milán', 'Arsenal', 'Otro']; // Lista de equipos

  const [newBannerImage, setNewBannerImage] = useState('');
  const [bannerAddMessage, setBannerAddMessage] = useState('');

  const [productAddMessage, setProductAddMessage] = useState('');

  // Simulación de visitas (esto se perdería sin base de datos)
  useEffect(() => {
    // Inicializar visitas si no existen (solo para simulación)
    if (Object.keys(visits).length === 0 || !visits.products) { // Añadido !visits.products
      const initialVisits = {};
      products.forEach(p => {
        initialVisits[p.id] = Math.floor(Math.random() * 100) + 10; // Visitas aleatorias
      });
      setVisits({ total: Object.values(initialVisits).reduce((sum, v) => sum + v, 0), products: initialVisits });
    }
  }, [products, visits, setVisits]);

  const handleAddPlayer = () => {
    if (currentPlayerName && currentPlayerImage) {
      setNewProductPlayers([...newProductPlayers, { name: currentPlayerName, image: currentPlayerImage }]);
      setCurrentPlayerName('');
      setCurrentPlayerImage('');
    }
  };

  const handleRemovePlayer = (index) => {
    setNewProductPlayers(newProductPlayers.filter((_, i) => i !== index));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProductName && newProductPrice && newProductImage && newProductTeam) {
      const newProduct = {
        id: Date.now(), // ID simple basado en tiempo (no único en producción)
        name: newProductName,
        price: parseFloat(newProductPrice),
        image: newProductImage,
        description: newProductDescription,
        players: newProductPlayers.length > 0 ? newProductPlayers : undefined, // Solo si hay jugadores
        team: newProductTeam,
        category: "Jersey" // Categoría por defecto, ya que no hay selección
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setVisits((prevVisits) => ({
        ...prevVisits,
        total: prevVisits.total + 0, // No suma visitas al agregar
        products: { ...prevVisits.products, [newProduct.id]: 0 },
      }));
      setNewProductName('');
      setNewProductPrice('');
      setNewProductImage('');
      setNewProductDescription('');
      setNewProductPlayers([]);
      setNewProductTeam('');
      setProductAddMessage('¡Producto agregado con éxito! (Recuerda: esto no es permanente sin base de datos)');
      setTimeout(() => setProductAddMessage(''), 5000);
    } else {
      setProductAddMessage('¡Por favor, completa todos los campos obligatorios (Nombre, Precio, Imagen, Equipo)!');
    }
  };

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (newBannerImage) {
      setAppBanners((prevBanners) => [...prevBanners, newBannerImage]); // Usar setAppBanners
      setNewBannerImage('');
      setBannerAddMessage('¡Banner agregado con éxito! (Recuerda: esto no es permanente sin base de datos)');
      setTimeout(() => setBannerAddMessage(''), 5000);
    } else {
      setBannerAddMessage('¡Por favor, ingresa la URL de la imagen del banner!');
    }
  };

  const handleRemoveBanner = (index) => {
    setAppBanners((prevBanners) => prevBanners.filter((_, i) => i !== index)); // Usar setAppBanners
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-10 flex-wrap">
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Inicio
          </motion.button>
        </Link>
        <h2 className="text-4xl font-bold text-center text-black flex-grow md:flex-grow-0 md:mx-auto">Panel de Administración</h2>
        <motion.button
          onClick={onLogout}
          className="px-6 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 mt-4 md:mt-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt className="inline-block mr-2" /> Cerrar Sesión
        </motion.button>
      </div>

      <div className="bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 p-6">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <motion.button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChartBar className="inline-block mr-2" /> Resumen
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('addProduct')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
              activeTab === 'addProduct'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlusCircle className="inline-block mr-2" /> Agregar Producto
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('manageBanners')}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
              activeTab === 'manageBanners'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaAd className="inline-block mr-2" /> Banners
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-black mb-6 text-center">Estadísticas de la Tienda</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-200/50 p-6 rounded-2xl border border-gray-300 shadow-md">
                  <p className="text-gray-800 text-lg flex items-center gap-2 mb-2"><FaEye /> Visitas Totales:</p>
                  <p className="text-5xl font-extrabold text-black">{visits.total}</p>
                </div>
                <div className="bg-gray-200/50 p-6 rounded-2xl border border-gray-300 shadow-md">
                  <p className="text-gray-800 text-lg flex items-center gap-2 mb-2"><FaChartBar /> Productos en Venta:</p>
                  <p className="text-5xl font-extrabold text-black">{products.length}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-black mb-4">Visitas por Producto:</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center bg-gray-200/50 p-4 rounded-xl border border-gray-300 shadow-sm">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-black">{product.name}</p>
                      <p className="text-gray-800">${product.price} USD</p>
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold text-black">
                      <FaEye /> {visits.products[product.id] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'addProduct' && (
            <motion.div
              key="addProduct"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-black mb-6 text-center">Agregar Nuevo Producto</h3>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div>
                  <label htmlFor="productName" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaTag /> Nombre del Producto:
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ej: Balón Oficial La Liga"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productPrice" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaDollarSign /> Precio (USD):
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ej: 35.00"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productImage" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaImage /> URL de la Imagen Principal:
                  </label>
                  <input
                    type="url"
                    id="productImage"
                    value={newProductImage}
                    onChange={(e) => setNewProductImage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ej: https://ejemplo.com/imagen.jpg"
                    required
                  />
                  {newProductImage && (
                    <div className="mt-4 text-center">
                      <p className="text-gray-800 mb-2">Vista previa:</p>
                      <img src={newProductImage} alt="Vista previa" className="max-w-full h-48 object-contain mx-auto rounded-lg border border-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="productDescription" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaTag /> Descripción del Producto (Opcional):
                  </label>
                  <textarea
                    id="productDescription"
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Una breve descripción de tu producto..."
                  ></textarea>
                </div>

                {/* Selección de Equipo */}
                <div>
                  <label htmlFor="productTeam" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaTag /> Equipo:
                  </label>
                  <select
                    id="productTeam"
                    value={newProductTeam}
                    onChange={(e) => setNewProductTeam(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="">Selecciona un equipo</option>
                    {teams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-300 pt-6 mt-6">
                  <h4 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <FaUserPlus /> Jugadores (Opcional):
                  </h4>
                  <div className="space-y-4">
                    {newProductPlayers.map((player, index) => (
                      <div key={index} className="flex items-center bg-gray-200/50 p-3 rounded-xl border border-gray-300">
                        <img src={player.image} alt={player.name} className="w-12 h-12 object-cover rounded-full mr-4" />
                        <span className="flex-1 text-black font-medium">{player.name}</span>
                        <motion.button
                          type="button"
                          onClick={() => handleRemovePlayer(index)}
                          className="p-2 bg-black rounded-full text-white hover:bg-gray-800 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="playerName" className="block text-lg font-medium text-black mb-2">
                        Nombre del Jugador:
                      </label>
                      <input
                        type="text"
                        id="playerName"
                        value={currentPlayerName}
                        onChange={(e) => setCurrentPlayerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Ej: Raphinha"
                      />
                    </div>
                    <div>
                      <label htmlFor="playerImage" className="block text-lg font-medium text-black mb-2">
                        URL de la Imagen del Jugador:
                      </label>
                      <input
                        type="url"
                        id="playerImage"
                        value={currentPlayerImage}
                        onChange={(e) => setCurrentPlayerImage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Ej: https://ejemplo.com/raphinha.jpg"
                      />
                      {currentPlayerImage && (
                        <div className="mt-4 text-center">
                          <p className="text-gray-800 mb-2">Vista previa:</p>
                          <img src={currentPlayerImage} alt="Vista previa jugador" className="max-w-full h-32 object-contain mx-auto rounded-lg border border-gray-300" />
                        </div>
                      )}
                    </div>
                    <motion.button
                      type="button"
                      onClick={handleAddPlayer}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaUserPlus /> Añadir Jugador
                    </motion.button>
                  </div>
                </div>

                {productAddMessage && (
                  <motion.p
                    className="text-center font-medium text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {productAddMessage}
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlusCircle /> Agregar Producto
                </motion.button>
              </form>
            </motion.div>
          )}

          {activeTab === 'manageBanners' && (
            <motion.div
              key="manageBanners"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-black mb-6 text-center">Administrar Banners</h3>
              <form onSubmit={handleAddBanner} className="space-y-4 mb-8">
                <div>
                  <label htmlFor="newBannerImage" className="block text-lg font-medium text-black mb-2 flex items-center gap-2">
                    <FaImage /> URL de la Nueva Imagen de Banner:
                  </label>
                  <input
                    type="url"
                    id="newBannerImage"
                    value={newBannerImage}
                    onChange={(e) => setNewBannerImage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200/50 border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Ej: https://ejemplo.com/nuevo-banner.jpg"
                    required
                  />
                  {newBannerImage && (
                    <div className="mt-4 text-center">
                      <p className="text-gray-800 mb-2">Vista previa:</p>
                      <img src={newBannerImage} alt="Vista previa banner" className="max-w-full h-32 object-contain mx-auto rounded-lg border border-gray-300" />
                    </div>
                  )}
                </div>
                {bannerAddMessage && (
                  <motion.p
                    className="text-center font-medium text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {bannerAddMessage}
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlusCircle /> Agregar Banner
                </motion.button>
              </form>

              <h4 className="text-2xl font-bold text-black mb-4">Banners Actuales:</h4>
              <div className="space-y-4">
                {appBanners.length > 0 ? ( // Usar appBanners de las props
                  appBanners.map((banner, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-gray-200/50 p-3 rounded-xl border border-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <img src={banner} alt={`Banner ${index + 1}`} className="w-24 h-16 object-cover rounded-lg mr-4" />
                      <span className="flex-1 text-black font-medium truncate">{banner}</span>
                      <motion.button
                        type="button"
                        onClick={() => handleRemoveBanner(index)}
                        className="p-2 bg-black rounded-full text-white hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-800 text-center">No hay banners para mostrar. ¡Agrega uno!</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFutbol, FaEye, FaShareAlt } from 'react-icons/fa'; // Importar FaEye y FaShareAlt
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BannerRotator from './components/BannerRotator';
import ProductPage from './components/ProductPage';
import CommunityPage from './components/CommunityPage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import ProductDetail from './components/ProductDetail';
import OtherTeamsPage from './components/OtherTeamsPage';

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Jersey Visitante 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0lRLM5VXbcAaSYNqKr0LMw3z9nWTuy4eIjixU",
      description: "La camiseta de visitante para la temporada 25/26. ¡Lleva los colores del Barça a donde vayas!",
      players: [
        { name: "Pedri", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0N38n9Sd8ASzOYnuUx9evHl1k3cs0iWKGPRJ7" },
        { name: "De Jong", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0pXbc4h89LiV6g1FsuhvBa0wlA7EzOrDJYMmS" },
        { name: "Yamal", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc09l5Pzt7T8xb3WM2EovYqBk0PZh6iezOHjnwf" },
        { name: "Cubarsí", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0FsMwUYDzTWwmhl5UyNfsFj9RSnotvEAKeiMb" }
      ],
      team: "Barcelona",
      category: "Jersey"
    },
    {
      id: 2,
      name: "Jersey Local 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc01DzUAzcZ9EqsBCgLaIcfUlJ8T30Vwty5SXnr",
      description: "La icónica camiseta local del FC Barcelona para la temporada 25/26. ¡Siente la pasión blaugrana!",
      players: [
        { name: "Pedri", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0N02LHsd8ASzOYnuUx9evHl1k3cs0iWKGPRJ7" },
        { name: "Fermín", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0UPHccz4lpN4OwGAX7ky90Ihqt2Z5MKWHdTfQ" },
        { name: "Raphinha", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0ornR9EgDjdvqUQH6XhKYIiaSc3LCtrM1fen0" },
        { name: "Rashford", image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0OluZCoWwHMo3kKrdGO2gqByb0CvhnIYi8Pxl" }
      ],
      team: "Barcelona",
      category: "Jersey"
    },
    // Nuevos productos
    {
      id: 3,
      name: "Jersey Real Madrid Visitante 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0AaXW08rjBTv6ks7D2p0aEUqiwPFcNd9VLHQ8",
      description: "La camiseta de visitante del eterno rival. ¡Para los que se atreven a cruzar la línea!",
      players: [],
      team: "Real Madrid",
      category: "Jersey"
    },
    {
      id: 4,
      name: "Jersey PSG Local 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0orz5KFgDjdvqUQH6XhKYIiaSc3LCtrM1fen0",
      description: "La camiseta local del Paris Saint-Germain. ¡Estilo y elegancia parisina en el campo!",
      players: [],
      team: "PSG",
      category: "Jersey"
    },
    {
      id: 5,
      name: "Jersey Bayern Múnich Visitante 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0TquEDn5OC5NA8gnBVpXH1xYGvSUuPebwsFoR",
      description: "La camiseta de visitante del gigante bávaro. ¡Poder y tradición alemana!",
      players: [],
      team: "Bayern Múnich",
      category: "Jersey"
    },
    {
      id: 6,
      name: "Jersey Bayern Múnich Local 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc09UnypWT8xb3WM2EovYqBk0PZh6iezOHjnwfQ",
      description: "La camiseta local del Bayern Múnich. ¡La fuerza de Baviera en cada hilo!",
      players: [],
      team: "Bayern Múnich",
      category: "Jersey"
    },
    {
      id: 7,
      name: "Jersey AC Milán Local 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0wWDHzCbxP1T5XDmuZkHCc9hBg6RVIbyjU7Fs",
      description: "La camiseta local del AC Milán. ¡La elegancia y la historia del fútbol italiano!",
      players: [],
      team: "AC Milán",
      category: "Jersey"
    },
    {
      id: 8,
      name: "Jersey Arsenal Local 25/26",
      price: 20,
      image: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0j3xmnJzprvgIPmTtsSNY2ecybAh5LloqCaQw",
      description: "La camiseta local del Arsenal. ¡Los Gunners listos para la batalla!",
      players: [],
      team: "Arsenal",
      category: "Jersey"
    }
  ]);
  const [visits, setVisits] = useState({ total: 0, products: {} });
  const [sharedCount, setSharedCount] = useState(0); // Nuevo estado para el contador de compartidos

  // Banners actuales (simulados, se perderán al recargar)
  const [appBanners, setAppBanners] = useState([
    "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc08NSv0bn7xHOTFQ3jrBEd0VGzfS9yKokWuAem",
    "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0VapDMAJrFC0J7K5LhXEI2tlBemYwSTjsNOpD",
    "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0qVCVsnvUMgOfLW4S62w7etx01aYAN8bRycsz"
  ]);

  // Simulación de incremento de visitas (se perderá al recargar)
  useEffect(() => {
    setVisits(prevVisits => {
      const newTotal = prevVisits.total + 1;
      return { ...prevVisits, total: newTotal };
    });
  }, []); // Se ejecuta una vez al cargar la app

  const handleProductView = (productId) => {
    setVisits(prevVisits => {
      const newProductVisits = {
        ...prevVisits.products,
        [productId]: (prevVisits.products[productId] || 0) + 1
      };
      return { ...prevVisits, products: newProductVisits };
    });
  };

  // Nuevo logo para "Échate Camiseta"
  const logoImage = "https://utfs.io/f/2vMRHqOYUHc0kidN647fYZlcpNaeLVjJvm95wniIQo8GFd7H";

  // Función para incrementar el contador de compartidos
  const handleShareIncrement = () => {
    setSharedCount(prevCount => prevCount + 1);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#FFC107] text-black font-sans">
        <header className="py-6 px-4 text-center">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight mb-2 text-black flex items-center justify-center gap-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* <img src={logoImage} alt="Échate Camiseta Logo" className="h-12 w-auto" /> Eliminado el logo del encabezado */}
            Échate Camiseta
          </motion.h1>
          <motion.p
            className="text-xl font-light text-gray-800 flex items-center justify-center gap-2"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            ¡Tu pasión, tu camiseta! <FaFutbol className="text-red-600" />
          </motion.p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <motion.section
                  className="mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <BannerRotator images={appBanners} interval={2500} />
                </motion.section>

                {/* Contadores de visitas y compartidos */}
                <motion.section
                  className="text-center py-6 bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 mb-12 flex justify-around items-center flex-wrap gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 text-black text-2xl font-bold">
                    <FaEye className="text-gray-800" />
                    <span>Visitas: {visits.total}</span>
                  </div>
                  <div className="flex items-center gap-2 text-black text-2xl font-bold">
                    <FaShareAlt className="text-gray-800" />
                    <span>Compartidos: {sharedCount}</span>
                  </div>
                </motion.section>

                <motion.section
                  className="text-center py-12 bg-black/10 backdrop-blur-sm rounded-3xl shadow-xl border border-black/20 mb-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h2 className="text-4xl font-bold mb-4 text-black">
                    ¡Bienvenido a tu pasión!
                  </h2>
                  <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                    Explora nuestra colección exclusiva y lleva la esencia del fútbol a tu hogar.
                    Porque tu camiseta es más que una prenda, ¡es un sentimiento!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link to="/productos">
                      <motion.button
                        className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver Productos
                      </motion.button>
                    </Link>
                    <Link to="/comunidad">
                      <motion.button
                        className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Comunidad
                      </motion.button>
                    </Link>
                    {isAdminLoggedIn && (
                      <Link to="/admin-panel">
                        <motion.button
                          className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Administrar
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </motion.section>
              </>
            } />
            <Route path="/productos" element={<ProductPage products={products} onProductView={handleProductView} />} />
            <Route path="/otros-equipos" element={<OtherTeamsPage products={products} onProductView={handleProductView} />} />
            <Route path="/producto/:productId" element={<ProductDetail products={products} />} />
            <Route path="/comunidad" element={<CommunityPage onShare={handleShareIncrement} />} /> {/* Pasar la función de incremento */}
            <Route path="/admin" element={<AdminLogin onLogin={setIsAdminLoggedIn} />} />
            {isAdminLoggedIn ? (
              <Route path="/admin-panel" element={<AdminPanel products={products} setProducts={setProducts} visits={visits} setVisits={setVisits} appBanners={appBanners} setAppBanners={setAppBanners} onLogout={() => setIsAdminLoggedIn(false)} />} />
            ) : (
              <Route path="/admin-panel" element={<AdminLogin onLogin={setIsAdminLoggedIn} />} />
            )}
          </Routes>
        </main>

        <footer className="py-6 px-4 text-center text-gray-800 text-sm mt-12 flex flex-col items-center">
          <img src={logoImage} alt="Échate Camiseta Logo" className="h-20 w-20 rounded-full object-cover mb-4" />
          <p>&copy; {new Date().getFullYear()} Échate Camiseta. Todos los derechos reservados. ¡Tu pasión, tu camiseta!</p>
          {!isAdminLoggedIn && (
            <Link to="/admin">
              <motion.button
                className="mt-4 px-6 py-2 bg-black text-white font-medium rounded-full text-sm hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Administración
              </motion.button>
            </Link>
          )}
        </footer>
      </div>
    </Router>
  );
};

export default App;
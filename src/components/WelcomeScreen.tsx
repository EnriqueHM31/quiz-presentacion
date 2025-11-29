import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import logo from '../assets/logo.png';

interface WelcomeScreenProps {
  onStart: (userName: string) => void;
  hasExistingUser: boolean;
}

export const WelcomeScreen = ({ onStart, hasExistingUser }: WelcomeScreenProps) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    console.log(userName);
    console.log(hasExistingUser);
    e.preventDefault();
    if (userName.trim() && !hasExistingUser) {
      console.log('Starting quiz for user:', userName.trim());
      onStart(userName.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-blue-900 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-900 border-2 border-blue-500 rounded-2xl shadow-2xl shadow-blue-500/20 p-8 md:px-12 py-8 max-w-[500px] w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="">
            <img src={logo} alt="Logo" className="size-45 object-cover bg-linear-to-br from-blue-500 to-blue-600 rounded-full  border-2 border-blue-400 shadow-lg shadow-blue-500/50" />
          </div>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-2">
          Bienvenido al Quiz
        </h1>

        <span className='text-center text-gray-100 font-bold text-lg w-full mx-auto  flex items-center justify-center'>Clausulas de Horn y Resolución SLD</span>

        {hasExistingUser ? (
          <div className="space-y-4">
            <div className="bg-blue-900/30 border-2 border-blue-500 rounded-lg p-4 mb-4">
              <p className="text-center text-blue-200 font-medium">
                Ya existe una sesión activa en este dispositivo.
              </p>
              <p className="text-center text-blue-300 text-sm mt-2">
                Recargando tu progreso...
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-400 mb-8">
              Ingresa tu nombre para comenzar
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
                  Tu nombre
                </label>
                <input
                  id="userName"
                  type="text"
                  autoComplete='on'
                  autoCorrect='on'
                  autoCapitalize='on'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Escribe tu nombre aquí"
                  className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  autoFocus
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!userName.trim()}
                className="w-full bg-linear-to-br from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/50 transition-all border border-blue-400"
              >
                <FaPlay className="text-sm" />
                Comenzar Quiz
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};


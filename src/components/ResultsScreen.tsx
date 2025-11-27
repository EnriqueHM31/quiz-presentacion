import { motion } from 'framer-motion';
import { FaTrophy, FaHome } from 'react-icons/fa';
import { UserQuiz } from '../types';
import { clearCurrentUser } from '../utils/storage';

interface ResultsScreenProps {
  userQuiz: UserQuiz;
  onReset: () => void;
}

export const ResultsScreen = ({ userQuiz, onReset }: ResultsScreenProps) => {
  const correctAnswers = userQuiz.questions.filter((q) => {
    const userAnswer = userQuiz.answers[q.id];
    const correctIndex = q.answers.findIndex((a) => a.isCorrect);
    return userAnswer === correctIndex;
  }).length;

  const totalQuestions = userQuiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const handleReset = () => {
    clearCurrentUser();
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-blue-900 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 border-2 border-blue-500 rounded-2xl shadow-2xl shadow-blue-500/20 p-8 md:p-12 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-full p-6 border-2 border-blue-400 shadow-lg shadow-blue-500/50">
            <FaTrophy className="text-white text-4xl" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Quiz Completado!
        </h2>
        <p className="text-gray-400 mb-6">
          {userQuiz.userName}, has completado todas las preguntas
        </p>

        <div className="bg-linear-to-br from-blue-600 to-blue-700 border-2 border-blue-400 rounded-lg p-6 mb-6 shadow-lg shadow-blue-500/30">
          <div className="text-5xl font-bold text-white mb-2">{percentage}%</div>
          <div className="text-blue-200">
            {correctAnswers} de {totalQuestions} correctas
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="w-full bg-linear-to-br from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all border border-blue-400"
        >
          <FaHome />
          Volver al Inicio
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


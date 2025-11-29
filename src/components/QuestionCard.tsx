import { motion } from 'framer-motion';
import { type Question } from '../types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult: boolean;
  questionNumber: number;
}

const answerLetters = ['A', 'B', 'C', 'D'];

export const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  questionNumber,
}: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col lg:flex-row gap-16 "
    >
      {/* Pregunta - Lado Izquierdo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-gray-900 border-2 border-blue-500 rounded-2xl shadow-xl shadow-blue-500/30 p-8 flex flex-col justify-center min-h-[300px] flex-3"
      >
        {/* Badge con número de pregunta */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg shadow-blue-500/50 z-10">
          <span className="text-white font-bold text-xl">{questionNumber}</span>
        </div>

        {/* Imagen si existe */}
        {question.type === 'image' && question.imageUrl && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 rounded-lg overflow-hidden border-2 border-blue-500/50 w-fullmx-auto"
          >
            <img
              src={question.imageUrl}
              alt="Question"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Texto de la pregunta */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-center">
          {question.question}
        </h2>
      </motion.div>

      {/* Respuestas - Lado Derecho */}
      <div className="space-y-4 flex flex-col justify-center flex-2">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = answer.isCorrect;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;
          const letter = answerLetters[index];

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: showResult && (showCorrect || showIncorrect) ? 1.02 : 1,
              }}
              transition={{ delay: 0.15 * index }}
              whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
              className={`relative w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${showCorrect
                ? 'bg-blue-900/50 border-blue-400 text-blue-200 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                : showIncorrect
                  ? 'bg-red-900/30 border-red-500 text-red-300 shadow-lg shadow-red-500/20 ring-2 ring-red-500'
                  : isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-lg shadow-blue-500/30'
                    : 'bg-black border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-gray-800'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* Badge circular con letra */}
              <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${showCorrect || (isSelected && !showIncorrect)
                  ? 'bg-blue-500 border-blue-400 text-white'
                  : showIncorrect
                    ? 'bg-red-500 border-red-400 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300'
                  }`}
              >
                {letter}
              </div>

              {/* Texto de la respuesta */}
              <span className="font-medium text-lg flex-1 ">{answer.text}</span>

              {/* Icono de resultado */}
              {showResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="shrink-0"
                >
                  {isCorrect ? (
                    <FaCheckCircle className="text-blue-400 text-2xl" />
                  ) : showIncorrect ? (
                    <FaTimesCircle className="text-red-400 text-2xl" />
                  ) : null}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};


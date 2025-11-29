import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaTrophy, FaHome } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { QuestionCard } from './QuestionCard';
import { type UserQuiz, type Question } from '../types';
import { getCurrentUser, updateUserQuiz, createUserQuiz } from '../utils/storage';

interface QuizProps {
  userName: string;
  questions: Question[];
  onReset: () => void;
  onComplete?: () => void;
  onUserCreated?: (user: UserQuiz) => void;
}

export const Quiz = ({ userName, questions, onReset, onComplete, onUserCreated }: QuizProps) => {
  const confettiTriggered = useRef(false);

  const [userQuiz, setUserQuiz] = useState<UserQuiz | null>(() => {
    // Cargar el usuario actual
    let quiz = getCurrentUser();
    let isNewUser = false;

    // Si no hay usuario o el nombre no coincide, crear uno nuevo
    if (!quiz || quiz.userName !== userName) {
      // Mezclar las preguntas para que cada usuario tenga un orden diferente
      quiz = createUserQuiz(userName, questions);
      updateUserQuiz(quiz);
      isNewUser = true;
    } else {
      // Asegurar que answeredQuestions existe (para compatibilidad con datos antiguos)
      if (!quiz.answeredQuestions) {
        quiz.answeredQuestions = {};
      }
    }

    // Notificar a App si se creó un nuevo usuario
    if (isNewUser && onUserCreated) {
      // Usar setTimeout para evitar problemas de renderizado
      setTimeout(() => onUserCreated(quiz), 0);
    }

    return quiz;
  });

  // Encontrar la primera pregunta no contestada
  const findFirstUnansweredQuestion = (quiz: UserQuiz): number => {
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      if (!quiz.answeredQuestions?.[question.id]) {
        return i;
      }
    }
    return quiz.currentQuestionIndex;
  };

  const getInitialIndex = (quiz: UserQuiz | null): number => {
    if (!quiz) return 0;
    return findFirstUnansweredQuestion(quiz);
  };

  const initialIndex = getInitialIndex(userQuiz);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(() => {
    if (!userQuiz || !userQuiz.questions[initialIndex]) return null;
    const questionId = userQuiz.questions[initialIndex].id;
    return userQuiz.answers[questionId] ?? null;
  });

  const [showResult, setShowResult] = useState(() => {
    if (!userQuiz || !userQuiz.questions[initialIndex]) return false;
    const questionId = userQuiz.questions[initialIndex].id;
    return userQuiz.answeredQuestions?.[questionId] ?? false;
  });

  useEffect(() => {
    // Actualizar cuando cambie el usuario o al cargar
    const quiz = getCurrentUser();
    if (quiz && quiz.userName === userName) {
      // Asegurar que answeredQuestions existe
      if (!quiz.answeredQuestions) {
        quiz.answeredQuestions = {};
      }

      // Si es un quiz diferente o es la primera carga, actualizar
      if (!userQuiz || quiz.userName !== userQuiz.userName) {
        setUserQuiz(quiz);
        const firstUnanswered = findFirstUnansweredQuestion(quiz);
        setCurrentIndex(firstUnanswered);
      } else {
        // Si es el mismo quiz, verificar si hay una pregunta no contestada antes de la actual
        const firstUnanswered = findFirstUnansweredQuestion(quiz);
        if (firstUnanswered < currentIndex) {
          setCurrentIndex(firstUnanswered);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  // Actualizar estado cuando cambia la pregunta actual
  useEffect(() => {
    if (!userQuiz || !userQuiz.questions[currentIndex]) return;
    const questionId = userQuiz.questions[currentIndex].id;
    const answer = userQuiz.answers[questionId] ?? null;
    const answered = userQuiz.answeredQuestions?.[questionId] ?? false;

    setSelectedAnswer(answer);
    setShowResult(answered);
    confettiTriggered.current = false;
  }, [currentIndex, userQuiz]);

  const currentQuestion = userQuiz?.questions[currentIndex];

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!userQuiz || showResult || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Verificar si la respuesta es correcta
    const isCorrect = currentQuestion.answers[answerIndex]?.isCorrect ?? false;

    // Disparar confeti si es correcta
    if (isCorrect && !confettiTriggered.current) {
      triggerConfetti();
      confettiTriggered.current = true;
    }

    // Guardar la respuesta y marcar como contestada
    const updatedQuiz: UserQuiz = {
      ...userQuiz,
      answers: {
        ...userQuiz.answers,
        [currentQuestion.id]: answerIndex,
      },
      answeredQuestions: {
        ...(userQuiz.answeredQuestions || {}),
        [currentQuestion.id]: true,
      },
    };
    updateUserQuiz(updatedQuiz);
    setUserQuiz(updatedQuiz);
  };

  const handleNext = () => {
    if (!userQuiz || !currentQuestion) return;

    // Buscar la siguiente pregunta no contestada
    let nextIndex = currentIndex + 1;
    while (nextIndex < userQuiz.questions.length) {
      const nextQuestion = userQuiz.questions[nextIndex];
      if (!userQuiz.answeredQuestions?.[nextQuestion.id]) {
        break;
      }
      nextIndex++;
    }

    if (nextIndex < userQuiz.questions.length) {
      setCurrentIndex(nextIndex);
      const nextQuestionId = userQuiz.questions[nextIndex].id;
      setSelectedAnswer(userQuiz.answers[nextQuestionId] ?? null);
      setShowResult(userQuiz.answeredQuestions?.[nextQuestionId] ?? false);

      // Actualizar índice actual
      const updatedQuiz: UserQuiz = {
        ...userQuiz,
        currentQuestionIndex: nextIndex,
      };
      updateUserQuiz(updatedQuiz);
      setUserQuiz(updatedQuiz);
    } else {
      // Completar el quiz
      const completedQuiz: UserQuiz = {
        ...userQuiz,
        completed: true,
      };
      updateUserQuiz(completedQuiz);
      setUserQuiz(completedQuiz);
      // Notificar al componente padre que se completó
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && userQuiz) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedAnswer(userQuiz.answers[userQuiz.questions[prevIndex].id] ?? null);
      setShowResult(true);

      const updatedQuiz: UserQuiz = {
        ...userQuiz,
        currentQuestionIndex: prevIndex,
      };
      updateUserQuiz(updatedQuiz);
      setUserQuiz(updatedQuiz);
    }
  };

  if (!userQuiz || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-blue-900">
        <div className="text-blue-400 text-xl font-semibold">Cargando...</div>
      </div>
    );
  }

  // Mostrar resultados finales
  if (userQuiz.completed) {
    const correctAnswers = userQuiz.questions.filter(
      (q) => {
        const userAnswer = userQuiz.answers[q.id];
        const correctIndex = q.answers.findIndex((a) => a.isCorrect);
        return userAnswer === correctIndex;
      }
    ).length;

    const totalQuestions = userQuiz.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

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
            {userName}, has completado todas las preguntas
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
            onClick={onReset}
            className="w-full bg-linear-to-br from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all border border-blue-400"
          >
            <FaHome />
            Volver al Inicio
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-blue-900 p-4 pt-8 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Etiqueta de perfil del usuario */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="bg-linear-to-br from-blue-600 to-blue-700 border-2 border-blue-400 rounded-full px-6 py-2 shadow-lg shadow-blue-500/30 flex items-center gap-3">
                <div className="size-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-300">
                  <span className="text-white font-bold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className=" text-white font-bold text-lg">
                    {userName}</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Barra de progreso */}
          <div className='flex items-center gap-4'>

            <span className='text-white font-bold text-lg'>Progreso</span>
            <div className="w-full md:w-64 bg-gray-800 border border-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentIndex + 1) / userQuiz.questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
                className="h-full bg-linear-to-br from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50"
              />

            </div>
            <span className='text-white font-bold text-lg'>
              {`${((currentIndex + 1) / userQuiz.questions.length) * 100}%`}
            </span>
          </div>
        </motion.div>
        <div className="hidden md:block text-center px-3 py-2 bg-blue-600 w-fit mx-auto rounded-2xl  mb-6 ">
          <p className="text-white text-2xl font-bold">
            Pregunta {currentIndex + 1} de {userQuiz.questions.length}
          </p>
        </div>

        {/* Pregunta */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showResult={showResult}
            questionNumber={currentIndex + 1}
          />
        </AnimatePresence>

        {/* Navegación */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex justify-between gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 bg-gray-800 border-2 border-gray-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-gray-700 transition-all cursor-pointer"
          >
            <FaArrowLeft />
            Anterior
          </motion.button>

          {showResult && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="flex items-center gap-2 bg-linear-to-br from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all ml-auto border border-blue-400 cursor-pointer"
            >
              {currentIndex < userQuiz.questions.length - 1 ? (
                <>
                  Siguiente
                  <FaArrowRight />
                </>
              ) : (
                <>
                  Finalizar
                  <FaTrophy />
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};


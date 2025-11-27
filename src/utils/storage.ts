import { type UserQuiz, type Question } from '../types';

const STORAGE_KEY = 'quiz_current_user';

// Obtener el usuario actual (solo uno permitido)
export const getCurrentUser = (): UserQuiz | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Guardar el usuario actual (solo uno permitido)
export const saveCurrentUser = (userQuiz: UserQuiz): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userQuiz));
};

// Obtener usuario por nombre (compatibilidad)
export const getUser = (userName: string): UserQuiz | null => {
  const user = getCurrentUser();
  return user && user.userName === userName ? user : null;
};

// Verificar si ya existe un usuario
export const hasExistingUser = (): boolean => {
  console.log('hasExistingUser', getCurrentUser());
  return getCurrentUser() !== null ? true : false;
};

// Limpiar el usuario actual (para resetear)
export const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const createUserQuiz = (userName: string, questions: Question[]): UserQuiz => {
  return {
    userName,
    questions,
    currentQuestionIndex: 0,
    answers: {},
    answeredQuestions: {},
    completed: false,
    createdAt: new Date().toISOString(),
  };
};

export const updateUserQuiz = (userQuiz: UserQuiz): void => {
  saveCurrentUser(userQuiz);
};


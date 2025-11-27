import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Quiz } from './components/Quiz';
import { ResultsScreen } from './components/ResultsScreen';
import { questions } from './data/questions';
import { getCurrentUser, hasExistingUser } from './utils/storage';
import { type UserQuiz } from './types';
import './App.css';

function App() {
  // Verificar si hay un usuario guardado al inicializar
  const initialUser = getCurrentUser();
  const [userName, setUserName] = useState<string | null>(initialUser?.userName ?? null);
  const [currentUser, setCurrentUser] = useState<UserQuiz | null>(initialUser);

  const handleStart = (name: string) => {
    console.log('handleStart', name);
    // Verificar si ya existe un usuario
    if (hasExistingUser()) {
      const existingUser = getCurrentUser();
      console.log({ existingUser });
      if (existingUser) {
        setCurrentUser(existingUser);
        setUserName(existingUser.userName);
      }
      return; // No permitir crear un nuevo usuario
    }

    // Solo crear nuevo usuario si no existe ninguno
    // Establecer el nombre - el Quiz creará el usuario cuando se monte
    setUserName(name);
    // No establecer currentUser aquí, el Quiz lo creará
  };

  const handleReset = () => {
    setUserName(null);
    setCurrentUser(null);
  };

  const handleQuizComplete = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleUserCreated = (user: UserQuiz) => {
    setCurrentUser(user);
  };

  // Si hay un userName establecido (nuevo o existente), mostrar quiz
  // El Quiz creará el usuario si no existe
  if (userName) {
    // Si hay un usuario completado, mostrar resultados
    if (currentUser && currentUser.completed) {
      return <ResultsScreen userQuiz={currentUser} onReset={handleReset} />;
    }
    // Mostrar quiz (creará el usuario si no existe)
    return (
      <Quiz
        userName={userName}
        questions={questions}
        onReset={handleReset}
        onComplete={handleQuizComplete}
        onUserCreated={handleUserCreated}
      />
    );
  }

  // Si no hay usuario, mostrar pantalla de bienvenida
  return <WelcomeScreen onStart={handleStart} hasExistingUser={hasExistingUser()} />;
}

export default App;

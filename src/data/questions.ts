import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuál es la capital de Francia?',
    type: 'text',
    answers: [
      { text: 'Londres', isCorrect: false },
      { text: 'París', isCorrect: true },
      { text: 'Madrid', isCorrect: false },
      { text: 'Berlín', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: '¿Cuántos planetas hay en nuestro sistema solar?',
    type: 'text',
    answers: [
      { text: '7', isCorrect: false },
      { text: '8', isCorrect: true },
      { text: '9', isCorrect: false },
      { text: '10', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: '¿Qué animal es este?',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
    answers: [
      { text: 'Gato', isCorrect: false },
      { text: 'Perro', isCorrect: true },
      { text: 'Conejo', isCorrect: false },
      { text: 'Hamster', isCorrect: false },
    ],
  },
  {
    id: 4,
    question: '¿En qué año llegó el hombre a la luna?',
    type: 'text',
    answers: [
      { text: '1967', isCorrect: false },
      { text: '1969', isCorrect: true },
      { text: '1971', isCorrect: false },
      { text: '1965', isCorrect: false },
    ],
  },
  {
    id: 5,
    question: '¿Qué elemento químico tiene el símbolo "O"?',
    type: 'text',
    answers: [
      { text: 'Oro', isCorrect: false },
      { text: 'Oxígeno', isCorrect: true },
      { text: 'Osmio', isCorrect: false },
      { text: 'Oganesón', isCorrect: false },
    ],
  },
];


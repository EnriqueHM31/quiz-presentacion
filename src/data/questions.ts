import { type Question } from '../types';
import PREGUNTA10 from '../assets/pregunta10.png';
import PREGUNTA6 from '../assets/pregunta6.png';

export const questions: Question[] = [
  {
    id: 1,
    question: '¿Qué es una cláusula de Horn?',
    type: 'text',
    answers: [
      { text: 'Una regla lógica que solo puede llegar a una conclusión a la vez', isCorrect: true },
      { text: 'Una regla lógica que puede llegar a múltiples conclusiones simultáneamente', isCorrect: false },
      { text: 'Un tipo de variable en programación funcional', isCorrect: false },
      { text: 'Un algoritmo de búsqueda en grafos', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: '¿Cuáles son los tres tipos de cláusulas de Horn?',
    type: 'text',
    answers: [
      { text: 'Variables, Constantes y Funciones', isCorrect: false },
      { text: 'Entradas, Procesos y Salidas', isCorrect: false },
      { text: 'Átomos, Moléculas y Compuestos', isCorrect: false },
      { text: 'Hechos, Reglas y Goals', isCorrect: true },
    ],
  },
  {
    id: 3,
    question: '¿Qué significa SLD en "Resolución SLD"?',
    type: 'text',
    answers: [
      { text: 'System Logic Development', isCorrect: false },
      { text: 'Selective Linear Definite clause resolution', isCorrect: true },
      { text: 'Simple Logic Deduction', isCorrect: false },
      { text: 'Sequential Linear Database', isCorrect: false },
    ],
  },
  {
    id: 4,
    question: 'En Prolog, ¿qué símbolo se utiliza para representar la implicación "SI... ENTONCES"?',
    type: 'text',
    answers: [
      { text: '→', isCorrect: false },
      { text: '=>', isCorrect: false },
      { text: ':-', isCorrect: true },
      { text: '-->', isCorrect: false },
    ],
  },
  {
    id: 5,
    question: '¿Qué representa el símbolo □ (cuadrado vacío) en la resolución SLD?',
    type: 'text',
    answers: [
      { text: 'El objetivo vacío que indica ÉXITO', isCorrect: true },
      { text: 'Un error en la derivación', isCorrect: false },
      { text: 'Una variable sin asignar', isCorrect: false },
      { text: 'El inicio del proceso de resolución', isCorrect: false },
    ],
  },
  {
    id: 6,
    question: '¿La consulta ?- estudia(juan, matematicas). devuelve true?',
    type: 'image',
    answers: [
      { text: 'true', isCorrect: false },
      { text: 'false', isCorrect: true },
      { text: 'undefined', isCorrect: false },
      { text: 'null', isCorrect: false },
    ],
    imageUrl: PREGUNTA6,
  },
  {
    id: 7,
    question: '¿Cuál de las siguientes NO es una característica de la resolución SLD?',
    type: 'text',
    answers: [
      { text: 'Selectiva', isCorrect: false },
      { text: 'Lineal', isCorrect: false },
      { text: 'Con Cláusulas Definidas', isCorrect: false },
      { text: 'Recursiva', isCorrect: true },
    ],
  },
  {
    id: 8,
    question: 'En el ejemplo "padre(juan, pedro).", ¿qué tipo de cláusula de Horn es?',
    type: 'text',
    answers: [
      { text: 'Un hecho', isCorrect: true },
      { text: 'Una regla', isCorrect: false },
      { text: 'Un goal o consulta', isCorrect: false },
      { text: 'Una función', isCorrect: false },
    ],
  },
  {
    id: 9,
    question: '¿Cuál es una aplicación práctica de las cláusulas de Horn y la resolución SLD?',
    type: 'text',
    answers: [
      { text: 'Diseño de interfaces gráficas', isCorrect: false },
      { text: 'Edición de video y audio', isCorrect: false },
      { text: 'Desarrollo de videojuegos en 3D', isCorrect: false },
      { text: 'Sistemas expertos y razonamiento automático', isCorrect: true },
    ],
  },
  {
    id: 10,
    question: '¿La consulta ?- es_rojo(platano). devuelve true?',
    type: 'image',
    answers: [
      { text: 'true', isCorrect: false },
      { text: 'false', isCorrect: true },
      { text: 'undefined', isCorrect: false },
      { text: 'null', isCorrect: false },
    ],
    imageUrl: PREGUNTA10,
  },

];

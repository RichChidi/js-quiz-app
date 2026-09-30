import {showQuestion} from "../scripts/quiz-screen.js";
import {renderResult} from "../scripts/result-screen.js";

export let questionCards = [];
export async function loadQuestions(category, difficulty) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=15&category=${category}&difficulty=${difficulty}&type=multiple`);

    if (!response.ok) throw new Error (`Network error: ${response.status}`);

    const data =  await response.json();

    if (data.response_code !== 0) {
      if (data.response_code === 1) throw new Error(`No questions found for that category/difficulty.`);
      if (data.response_code === 4) throw new Error(`Too many requests. Wait 5 seconds and try again`);
      throw new Error(`API returned an error.`);
    }

    const result = data.results;

    if (!result || result.length === 0) {
      throw new Error (`Empty data from API.`);
    } 

    const formattedQuestions = result.map((q) => {
      return {
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        answer: q.correct_answer
      }
    });
    questionCards = formattedQuestions;     
  } catch(error) {
    console.log('loadQuestions failed:', error);
    throw error;
  }
}
 /*[
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "What does `===` do?",
    options: ["Assigns a value", "Compares value only", "Compares value and type", "Checks if not equal"],
    answer: "Compares value and type"
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: "push()"
  },
  {
    question: "What does `typeof null` return in JavaScript?",
    options: ["null", "object", "undefined", "number"],
    answer: "object"
  },
  {
    question: "Which function is used to print something in the console?",
    options: ["print()", "console.log()", "log()", "echo()"],
    answer: "console.log()"
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to link JavaScript?",
    options: ["js", "script", "javascript", "link"],
    answer: "script"
  },
  {
    question: "What is the result of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "Error"],
    answer: "22"
  },
  {
    question: "Which built-in method reverses an array?",
    options: ["changeOrder()", "reverse()", "sort()", "flip()"],
    answer: "reverse()"
  },
  {
    question: "What is the DOM?",
    options: ["A programming language", "The structure of an HTML document as objects", "A database", "A CSS framework"],
    answer: "The structure of an HTML document as objects"
  },
  {
    question: "Which statement is used to stop a loop?",
    options: ["stop", "break", "exit", "return"],
    answer: "break"
  },
  {
    question: "What does isNaN() do?",
    options: ["Checks if a value is a number", "Checks if a value is Not-a-Number", "Converts to a number", "Returns a number"],
    answer: "Checks if a value is Not-a-Number"
  },
  {
    question: "Which array method creates a new array with results of a function?",
    options: ["forEach()", "filter()", "map()", "reduce()"],
    answer: "map()"
  },
  {
    question: "What will Boolean(0) return?",
    options: ["true", "false", "0", "undefined"],
    answer: "false"
  }
] */;
export async function loadCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data =  await response.json();
  return data.trivia_categories;
}

export let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

export function getHighScore() {
  let highScore = 0;

  highscores.forEach((player) => {
    if (player.score > highScore) {
      highScore = player.score;
    }
  });

  return highScore;
}
export function resetHighScores() {
  highscores = [];
  saveToStorage();
}
export  let score = 0;
export  let currentQuestionIndex = 0;
export function incrementScore() {
  score++;
}
export function incrementIndex() {
  currentQuestionIndex++;
}
export function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
}

export function saveToStorage() {
  localStorage.setItem('highscores', JSON.stringify(highscores));
}
export let timeCount;
export let timerId;
export function setTimeCount() {
  timeCount = 15;
}
export function startTimer() {
  clearInterval(timerId);
  setTimeCount();
  timerId = setInterval(() => {
    if (timeCount > 0){
      if (timeCount <= 5) {
        document.querySelector('.js-right-section').style.color = 'red';
      }

      document.querySelector('.js-timer').innerHTML = timeCount;
      timeCount--;
    } else {
      nextQuestion();
    }
  }, 1000) 
  
}

export function nextQuestion() {
    clearInterval(timerId);
    incrementIndex();
    if (currentQuestionIndex < questionCards.length) {
      showQuestion();
    } else {
      renderResult();
    }
}
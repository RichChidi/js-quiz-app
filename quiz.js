const startButton = document.querySelector('.js-start-btn');
const homeScreen = document.querySelector('.js-home-screen');
const quizScreen = document.querySelector('.js-quiz-screen');
const resultScreen = document.querySelector('.js-result-screen');

const questionCards = [
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
];
let score = 0;
let currentQuestionIndex = 0;
function showQuestion() {
  const questionCard = questionCards[currentQuestionIndex];
  let questionHTML = '';
  questionHTML = `
    <div class="top-bar">
      <section class="left-section">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
        </svg>
      </section>
      <section class="middle-section">
        Quiz
      </section>
      <section class="right-section">
        <span class="emoji">🕒</span>
        00:24
      </section>
    </div>

    <header class="quiz-screen-head">
      <p class="question-number">Question ${currentQuestionIndex + 1} of ${questionCards.length}</p>
    </header>

    <section class="question-card">
      <p class="question">${questionCard.question}</p>
      <div class="options">
        ${showOptions(questionCard)}
      </div>
    </section>

    <div class="next-div">
      <button class="next-btn js-next-btn">Next</button>
    </div>  
  `;
  quizScreen.innerHTML = questionHTML;
  const optionButtons = document.querySelectorAll('.js-option');
  document.querySelector('.js-next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionCards.length) {
      showQuestion();
    } else {
      renderResult();
    }
  })
  optionButtons.forEach((option) => {
    option.addEventListener('click', () => {
      const answerPicked = option.innerHTML;
      if (answerPicked === questionCard.answer) {
        option.style.border = '3px solid lightgreen';
        option.innerHTML = `${answerPicked}    ✅`;
        score++;
      } else {
        option.style.border = '3px solid red';
        option.innerHTML = `${answerPicked}    ❌`;
      }
      optionButtons.forEach(button => button.disabled = true);
    });
  })
  function showOptions(questionCard) {
    let optionHTML = '';

    questionCard.options.forEach((option) => {
      optionHTML += `
        <button class="option js-option">${option}</button> 
      `;
    });

    return optionHTML;
  }

  startButton.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
  });  
}

showQuestion();

function renderResult() {
  let percentageScore = (score / questionCards.length) * 100;
  const remark = percentageScore === 100? `Excellent&#33;`
        : percentageScore < 100 && percentageScore >= 70 ? `Great job&#33;`
        : percentageScore < 70 && percentageScore >= 50 ? `Good`
        : `Not good, you can do better!`;
  resultHTML = `
    <div class="result-emoji-div">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    </div>
    <div class="result-score">
      You scored ${score}&#47;${questionCards.length}&#33;
    </div>
    <p class="result-remark">
      ${remark}
    </p>
    <p>
      You answered ${score} out of ${questionCards.length} correctly
    </p>
    <button class="play-again js-play-again">
      Play Again
    </button>
    <button class="go-home js-go-home">
      Go Home
    </button>
  `;


  quizScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
  resultScreen.innerHTML = resultHTML;

  document.querySelector('.js-play-again').addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultScreen.style.display = 'none';
    showQuestion();
    quizScreen.style.display = 'flex';
  })

  document.querySelector('.js-go-home').addEventListener('click', () => {
    resultScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
  })

}
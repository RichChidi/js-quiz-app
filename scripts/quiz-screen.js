import {questionCards, currentQuestionIndex, incrementScore, nextQuestion, timeCount, startTimer, setTimeCount} from "../data/quiz-data.js";

const quizScreen = document.querySelector('.js-quiz-screen');
export function showQuestion() {
  setTimeCount();
  let questionCard = questionCards[currentQuestionIndex];
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
      <section class="right-section js-right-section">
        <span class="emoji">🕒</span>
        <span class="js-timer">${timeCount}</span>sec
      </section>
    </div>

    <header class="quiz-screen-head">
      <p class="question-number">Question ${currentQuestionIndex + 1} of ${questionCards.length}</p>
      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar" ></div>
      </div>
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
  document.querySelector('.js-progress-bar').style.width = `${((currentQuestionIndex + 1) / questionCards.length) * 100}%`;
  const optionButtons = document.querySelectorAll('.js-option');
  const nextButton = document.querySelector('.js-next-btn');
  nextButton.onclick = () => {
    nextQuestion();
  };
  optionButtons.forEach((option) => {
    option.addEventListener('click', () => {
      const answerPicked = option.innerHTML;
      if (answerPicked === questionCard.answer) {
        option.style.border = '3px solid lightgreen';
        option.innerHTML = `${answerPicked}    ✅`;
        incrementScore();
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
    quizScreen.style.display = 'flex';
    startTimer();  
}
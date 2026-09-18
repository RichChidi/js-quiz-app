const startButton = document.querySelector('.js-start-btn');
const homeScreen = document.querySelector('.js-home-screen');
const quizScreen = document.querySelector('.js-quiz-screen');

startButton.addEventListener('click', () => {
  homeScreen.style.display = 'none';
  quizScreen.style.display = 'flex';
});

const questionCards = [
  {
    question: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'Python', 'JavaScript'],
    answer: 'JavaScript'
  }
];

let score = 0;
questionCards.forEach((questionCard) => {
  let questionHTML = '';
  let optionHTML = '';
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
      <p class="question-number">Question 2 of 5</p>
    </header>

    <section class="question-card">
      <p class="question">${questionCard.question}</p>
      <div class="options">
        ${showOptions(questionCard)}
      </div>
    </section>

    <div class="next-div">
      <button class="next-btn">Next</button>
    </div>  
  `;
  quizScreen.innerHTML = questionHTML;
  const optionButtons = document.querySelectorAll('.js-option');
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
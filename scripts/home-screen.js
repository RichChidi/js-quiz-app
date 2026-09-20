import {highScore, questionCards} from "../data/quiz-data.js";
import {showQuestion} from "./quiz-screen.js";

const homeScreen = document.querySelector('.js-home-screen');
export  function renderHomeScreen() {
  let homeScreenHTML = `
    <header class="home-screen-head">
      <div class="question-mark">
        &#63;
      </div>
      <div>
        JavaScript Quiz
      </div>
    </header>
    <div class="sub-header">
      Test your JS knowledge
    </div>
    <button class="start-btn js-start-btn">
      Start Quiz
    </button>
    <section>
      <p class="section">
        <span class="emoji">🏆</span>
        High Score: ${highScore}&#47;${questionCards.length}
      </p>
      <p class="section">
        <span class="emoji">🕒</span>
        ${questionCards.length} Questions &#45; 15s each
      </p>
    </section>    
  `;

  homeScreen.innerHTML = homeScreenHTML;
  homeScreen.style.display = 'flex';

  const startButton = document.querySelector('.js-start-btn');
  startButton.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    showQuestion();
  })
}
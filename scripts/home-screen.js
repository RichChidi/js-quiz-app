import {getHighScore, loadCategories, loadQuestions, questionCards} from "../data/quiz-data.js";
import {showQuestion} from "./quiz-screen.js";

const homeScreen = document.querySelector('.js-home-screen');
export  function renderHomeScreen() {
  let homeScreenHTML = `
    <header class="home-screen-head">
      <div class="question-mark">
        &#63;
      </div>
      <div>
        Trivia Challenge
      </div>
    </header>
    <div class="sub-header">
      Test your knowledge across categories
    </div>
    <div class="start-quiz-div">
      <div class="pick-category">
        <label>Select a category:</label> <br>
        <select class="category js-category">

        </select>
      </div>
      <div class="pick-level">
        <label>Chose level:</label><br>
        <select class="difficulty js-difficulty">
          <option value="" class="option">--pick a level--</option>
          <option value="easy" class="option">Easy</option>
          <option value="medium" class="option">Medium</option>
          <option value="hard" class="option">Hard</option>
        </select>
      </div>
      <button class="start-btn js-start-btn">
        Start Quiz
      </button>
    </div>
    <section>
      <p class="section">
        <span class="emoji">🏆</span>
        High Score: ${getHighScore()}%
      </p>
      <p class="section">
        <span class="emoji">🕒</span>
        15 Questions &#45; 15s each
      </p>
    </section> 
    <a href="leaderboard.html" class="leaderboard-link">View Leaderboard ➡️</a>   
  `;

  homeScreen.innerHTML = homeScreenHTML;
  loadCategories().then((questionCategories) => {

    let categoryHTML = '<option value="">--Select category--</option>';
    questionCategories.forEach((category) => {
      categoryHTML += `
        <option value="${category.id}" class="${category.name} option">${category.name}</option>
      `;
    });

    document.querySelector('.js-category').innerHTML = categoryHTML;
    homeScreen.style.display = 'flex';
    const startButton = document.querySelector('.js-start-btn');
  
    startButton.addEventListener('click', async () => {
      startButton.disabled = true;
      startButton.innerHTML = 'Loading...';

      const category = document.querySelector('.js-category').value;
      const difficulty = document.querySelector('.js-difficulty').value; 
      if (!category && !difficulty ) {
        alert('Please select a question category and level of difficulty');
        startButton.innerHTML = 'Start';
        startButton.disabled = false;
      } else if (!document.querySelector('.js-category').value) {
        alert('Please select a question category');
        startButton.innerHTML = 'Start';
        startButton.disabled = false;
      } else if (!document.querySelector('.js-difficulty').value) {
        alert('Please choose a level of difficulty');
        startButton.innerHTML = 'Start';
        startButton.disabled = false;
      } else {
        try{
          await loadQuestions(category, difficulty);
          homeScreen.style.display = 'none';
          showQuestion();
        } catch(error) {
          alert(`${error.message}`);
          startButton.innerHTML = 'Start';
          startButton.disabled = false;
        }
      } 
    });

    /*
    document.getElementById('continue').addEventListener('click', () => {
      if (!document.querySelector('.js-category').value && !document.querySelector('.js-difficulty').value ) {
        alert('Please select a question category and level of difficulty');
      } else if (!document.querySelector('.js-category').value) {
        alert('Please select a question category');
      } else if (!document.querySelector('.js-difficulty').value) {
        alert('Please choose a level of difficulty');
      } else {
        console.log(document.querySelector('.js-difficulty').value, document.querySelector('.js-category').value)
      }
    })
      */
  });  
  /*
  homeScreen.style.display = 'flex';

  const startButton = document.querySelector('.js-start-btn');
  startButton.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    showQuestion();
  })
    */
    
}
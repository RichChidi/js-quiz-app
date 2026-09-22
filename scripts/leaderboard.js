import {highscores, questionCards, saveToStorage, resetHighScores} from "../data/quiz-data.js";

function renderLeaderboard() {
  let highscoresHTML = ``;

  if (highscores.length === 0) {
    highscoresHTML += `
      No player yet.

      Start the quiz, score high and enter the leaderboard.
    `;
  } else{
    highscores.forEach((player, index) => {
      highscoresHTML += `
        <p class="section">
          <span class="emoji">${index === 0 ? `🏆` : `🎖️`}</span>
          <span>${player.name}</span> ${player.score}&#47;${questionCards.length}
        </p>
      `;
    })
  }

  document.querySelector('.leaderboard-section').innerHTML = highscoresHTML;

  document.querySelector('.js-clear-scores').addEventListener('click', () => {
    resetHighScores();
    saveToStorage();
    renderLeaderboard();
  });
}
renderLeaderboard();
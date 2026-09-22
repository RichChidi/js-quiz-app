import {highscores, questionCards} from "../data/quiz-data.js";

let highscoresHTML = ``;

highscores.forEach((player, index) => {
  if (!highscores) {
    highscoresHTML += `
      No player yet.

      Start the quiz, score high and enter the leaderboard.
    `;
  } else{
    highscoresHTML += `
      <p class="section">
        <span class="emoji">${index === 0 ? `🏆` : `🎖️`}</span>
        <span>${player.name}</span> ${player.score}&#47;${questionCards.length}
      </p>
    `;
  }
});

document.querySelector('.leaderboard-section').innerHTML = highscoresHTML;
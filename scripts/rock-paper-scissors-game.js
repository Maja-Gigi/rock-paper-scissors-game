let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


/*{
  wins: 0,
  losses: 0,
  ties: 0
};
*/

updateScoreElement();


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    resetConfirmationMessage();
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  })

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    resetConfirmationMessage();
  } else if (event.key === 'a') {
    autoPlay();
  }
});


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
    return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You losse.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You losse.';
    }
  }

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You losse.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You losse.') {
    score.losses++;
  } else if (result === 'You win.') {
    score.wins++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
  
  document.querySelector('.js-moves')
    .innerHTML = `You picked ${playerMove}. Coputer picked: ${computerMove}.`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID =setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Play'
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play'
  }
}


function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


function resetConfirmationMessage() {
  document.querySelector('.js-reset-confirmation-message')
    .innerHTML = `
    Are you sure you want to reset the score? 
    <button class="js-button-yes reset-confrm-button">
    Yes
    </button>
    
    <button class="js-button-no reset-confrm-button">
    No
    </button>`;
  
  document.querySelector('.js-button-yes')
    .addEventListener('click', () => {
      resetScore();
      hideConfirmationMessage();
    });
  
  document.querySelector('.js-button-no')
    .addEventListener('click', () => {
      hideConfirmationMessage();
    });
}


function hideConfirmationMessage() {
  document.querySelector('.js-reset-confirmation-message')
    .innerHTML = '';
}

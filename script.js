(() => {
  const gameBoard = document.getElementById('game-board');
  const playAgainButton = document.getElementById('play-again-btn');
  const gameForm = document.getElementById('game-form');
  const gameInput = document.getElementById('game-input');
  const gameStartBtn = document.getElementById('game-form-btn');

  let flippedcards = [];
  let matchedPairs = 0;
  let timer;

  function createNumbersArray(count) {
    const pairedNumbersArr = [];

    for (let i = 1; i <= count; i++) {
      pairedNumbersArr.push(i, i);
    }

    return pairedNumbersArr;
  }

  function shuffleArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  function createCards(arr) {
    let cards = [];

    for (let number of arr) {
      const card = document.createElement('div');
      card.textContent = number;
      card.classList.add('card', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-grow-1');
      gameBoard.append(card);
      cards.push(card);
    }

    return cards;
  }

  function flipCard(card) {
    card.classList.add('flipped');
    flippedcards.push(card);
    if (flippedcards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedcards;
    if (card1.textContent === card2.textContent) {
      matchedPairs += 1;
      flippedcards = [];
      if (matchedPairs === gameBoard.children.length / 2) {
        endGame();
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedcards = [];
    }
  }

  function startGame(count) {
    gameBoard.innerHTML = '';
    playAgainButton.style.visibility = 'hidden';
    gameStartBtn.disabled = true;
    matchedPairs = 0;

    gameInput.addEventListener('input', function() {
      if (gameInput.value.trim() === '' && !Number.isNaN(gameInput.value)) {
        gameStartBtn.disabled = true;
      }
      else {
        gameStartBtn.disabled = false;
      }
    });

    gameForm.addEventListener('submit', function(e) {
      e.preventDefault();

      count = gameInput.value;

      if (count >= 2 && count <= 10 && count % 2 === 0) {
        startGame(count);
        gameInput.value = '';
      } else {
        startGame(4);
        gameInput.value = '';
      }
    });

    const pairedNumbersArray = createNumbersArray(count);
    const shuffledArray = shuffleArray(pairedNumbersArray);
    const cardsArray = createCards(shuffledArray);

    cardsArray.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('flipped') && flippedcards.length < 2) {
          flipCard(card);
        }
      });
    });

    playAgainButton.addEventListener('click', () => {
      startGame(count);
    });
  }

  timer = setTimeout(() => {
    endGame();
  }, 60000);

  function endGame() {
    playAgainButton.style.visibility = 'visible';
    gameBoard.childNodes.forEach(card => card.classList.add('flipped'));
  }

  window.startGame = startGame;
})();


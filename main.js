(() => {
  const gameBoard = document.getElementById('game-board');
  const container = document.getElementById('container');
  const playAgainButton = document.getElementById('play-again-btn');
  let pairsGameForm = '';
  let flippedcards = [];
  let matchedPairs = 0;
  let timer;

  function createPairsGameTitle() {
    const title = document.createElement('h1');
    title.classList.add('mb-4');
    title.textContent = 'Игра в пары';

    return title;
  }

  function createPairsGameForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите четное число от 2 до 10';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Начать игру';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    function checkInputValue() {
      if (input.value.trim() === '' && !Number.isNaN(input.value)) {
        button.disabled = true;
      }
      else {
        button.disabled = false;
      }
    };

    input.addEventListener('input', checkInputValue);

    return {
      form,
      input,
      button,
      checkInputValue,
    };
  }

  function createNumbersArray(count) {
    const pairedNumbersArr = [];

    for (let i = 1; i <= count; i++) {
      pairedNumbersArr.push(i, i);
    }

    return pairedNumbersArr;
  }

  function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  function createCards(arr) {
    const cards = [];

    for (let number of arr) {
      const card = document.createElement('div');
      card.textContent = number;
      card.classList.add('card', 'card-front', 'col-3');
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
    matchedPairs = 0;
    playAgainButton.style.visibility = 'hidden';
    clearTimeout(timer);

    if (!pairsGameForm) {
      pairsGameForm = createPairsGameForm();
      const mainTitle = createPairsGameTitle();

      container.prepend(pairsGameForm.form);
      container.prepend(mainTitle);

      pairsGameForm.form.addEventListener('submit', function (e) {
        e.preventDefault();

        count = pairsGameForm.input.value;

        if (count >= 2 && count <= 10 && count % 2 === 0) {
          startGame(count);
        } else {
          startGame(4);
        }
      });
    }

    const pairedNumbersArray = createNumbersArray(count);
    const shuffledArray = shuffle(pairedNumbersArray);
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

    pairsGameForm.input.value = '';
    pairsGameForm.checkInputValue();

    timer = setTimeout(() => {
      endGame();
    }, 60000);
  }

  function endGame() {
    playAgainButton.style.visibility = 'visible';
    gameBoard.childNodes.forEach(card => card.classList.add('flipped'));
  }

  window.startGame = startGame;
})();



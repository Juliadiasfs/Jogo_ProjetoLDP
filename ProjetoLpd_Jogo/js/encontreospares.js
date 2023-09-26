const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'miranha',
    'wanda',
    'venom',
    'thor',
    'rocket',
    'loki',
    'groot',
    'capitaoamerica',
    'homemdeferro'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
let timerStarted = false;
let timerInterval;

const checkEndGame = () => {
    const cartasdesativasas = document.querySelectorAll('.disabled-card');
    if (cartasdesativasas.length == 18) {
        clearInterval(timerInterval); 
        alert(`Parabéns, você ganhou! Seu tempo foi ${timer.innerHTML} segundos!`);
    }
}

const checkCards = () => {
    const firstcharacter = firstCard.getAttribute('data-character');
    const secondcharacter = secondCard.getAttribute('data-character');

    if (firstcharacter == secondcharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(imagens/${character}.jpg)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
    return card;
}

const loadGame = () => {
    const duplicarpersonagens = [...characters, ...characters];

    const embaralhar = duplicarpersonagens.sort(() => Math.random() - 0.5);

    duplicarpersonagens.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    let currentTime = 0;

    timerInterval = setInterval(() => {
        currentTime += 1;
        timer.innerHTML = currentTime;
    }, 1000);
}

window.onload = () => {
    loadGame();
}

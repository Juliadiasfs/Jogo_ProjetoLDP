const grid = document.querySelector('.grid');
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
            'homemdeferro',
            'deadpool',
            'doutorestranho',
            'fera',
            'modok',
            'noturno',
            'panteranegra',
            'srmysterio',
            'visaobranco',
            'wolverine',
            'cavaleirodalua',
            'caveiravermelha',
        ];

        const createElement = (tag, className) => {
            const element = document.createElement(tag);
            element.className = className;
            return element;
        }
        let jogador1Pontos = 0;
        let jogador2Pontos = 0;

        let firstCard = '';
        let secondCard = '';
        let timerStarted = false;

        let vezDoJogador1 = true;

        const checkEndGame = () => {
            const cartasdesativasas = document.querySelectorAll('.disabled-card');
            
            if (cartasdesativasas.length === 40) {
                clearInterval(timerInterval);
        
                if (jogador1Pontos > jogador2Pontos) {
                    localStorage.setItem('mensagem', `Parabéns, Player 1! Você venceu o jogo da memória com ${jogador1Pontos} pontos. Excelente trabalho!`);
                    localStorage.setItem('resultado', 'vitoria'); 
                    window.location.href = 'vencedormultiplayer.html?resultado=Jogador1';
                } else if (jogador2Pontos > jogador1Pontos) {
                    localStorage.setItem('mensagem', `Parabéns, Player 2! Você venceu o jogo da memória com ${jogador2Pontos} pontos. Excelente trabalho!`);
                    localStorage.setItem('resultado', 'vitoria');
                    window.location.href = 'vencedormultiplayer.html?resultado=Jogador2';
                } else {
                    localStorage.setItem('mensagem', `Foi um empate com ${jogador1Pontos} pontos para ambos os jogadores`);
                    localStorage.setItem('resultado', 'empate'); 
                    window.location.href = 'vencedormultiplayer.html?resultado=Empate';
                }
            }
        }

        const checkCards = () => {
            const firstcharacter = firstCard.getAttribute('data-character');
            const secondcharacter = secondCard.getAttribute('data-character');

            if (firstcharacter == secondcharacter) {
                firstCard.firstChild.classList.add('disabled-card');
                secondCard.firstChild.classList.add('disabled-card');

                if (vezDoJogador1) {
                    jogador1Pontos++;
                    document.getElementById('p1').textContent = `Player 01: ${jogador1Pontos} `;
                } else {
                    jogador2Pontos++;
                    document.getElementById('p2').textContent = `Player 02: ${jogador2Pontos} `;
                }

                firstCard = '';
                secondCard = '';

                checkEndGame();

            } else {
                setTimeout(() => {
                    firstCard.classList.remove('reveal-card');
                    secondCard.classList.remove('reveal-card');
                    firstCard = '';
                    secondCard = '';

                    vezDoJogador1 = !vezDoJogador1;
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

        loadGame();    
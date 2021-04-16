const BACK = 'card_back';
const FRONT = 'card_front';
const CARD = 'card';
const ICON = 'icon';
const IMAGE = 'image';
const FLIP = 'flip';

startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs());
}


function initializeCards(cards) {
    let board = document.getElementById('board');
    board.innerHTML = '';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);

    });

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement) {

    let cardFaceElement = document.createElement('div');
    cardFaceElement.classList.add(face);
    if (face === FRONT) {
        let img = document.createElement('img');
        img.classList.add(ICON);
        img.classList.add(IMAGE);
        img.src = './assets/images/' + card.icon + '.png';
        cardFaceElement.appendChild(img);
    } else {
        cardFaceElement.innerHTML = '&lt/&gt';
    }
    cardElement.appendChild(cardFaceElement);
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add(FLIP);
        if (game.secundCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                }
            } else {

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secundCardView = document.getElementById(game.secundCard.id);

                    firstCardView.classList.remove(FLIP);
                    secundCardView.classList.remove(FLIP);
                    game.unflipedCard();
                }, 1000);

            }
        }
    }

}

function restartGame() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';

}
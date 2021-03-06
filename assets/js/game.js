let game = {

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    cards: null,
    lockMode: null,
    firstCard: null,
    secundCard: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secundCard = card;
            this.secundCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {

        if (!this.secundCard) {
            return false;
        }
        return this.firstCard.icon === this.secundCard.icon;

    },

    clearCards: function () {

        this.lockMode = null;
        this.firstCard = null;
        this.secundCard = null;

    },

    unflipedCard: function () {

        this.firstCard.flipped = false;
        this.secundCard.flipped = false;
        this.clearCards();

    },

    checkGameOver: function () {

        return this.cards.filter(card => !card.flipped).length == 0;

    },

    // *
    // **
    createCardsFromTechs: function () {
        this.cards = [];
        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromCards(tech));
        });
        this.cards = this.cards.flatMap(card => card);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromCards: function (tech) {
        return [{
            id: this.generateId(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.generateId(tech),
            icon: tech,
            flipped: false,
        }];
    },

    // ***
    generateId: tech => {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }


};

// * Criar as cartas
// Criar um par de cartas para cada tecnologia
// Cada elemento do par deve ter, um id com valor gerado aleatoriamente,
// um icon, que ?? a tecnologia e a informa????o se est?? flipped ou n??o
// Por fim, a fun????o flatMap ?? usada para pegar os objetos de dentro do array
// e desmembr??-los, assim os elementos de dentro de cada objeto se tornam 
// elementos do array

// ** Foi usado function em quase todas as fun????es
// pois a arrow function n??o suporta o this
// por isso todas as fun????es que refereciam outros m??todos ou atributos
// ficaram apenas como function

// *** Essa foi a ??nica fun????o que n??o referencia outro m??todo ou atributo
// por isso ficou como arrow function
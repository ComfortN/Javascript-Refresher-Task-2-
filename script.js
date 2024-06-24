document.addEventListener('DOMContentLoaded', () => {

    let flippedCards = [];
    let matched = 0;

    
    function shuffleCards() {
        const cards = Array.from(document.querySelectorAll('.card'));
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            cards[i].style.order = j;
            cards[j].style.order = i;
        }
    }

    
    function flipCard() {
        const card = this;

        if (flippedCards.length === 2 || card.classList.contains('flip')) {
            return;
        }

        card.classList.add('flip');
        card.textContent = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            matchingCards();
        }
    }

    
    function matchingCards() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.value === card2.dataset.value;

        if (isMatch) {
            matched++;
            flippedCards = [];
            if (matched === 8) { 
                setTimeout(() => {
                    if (confirm('You win! Play again?')) {
                        resetGame();
                    }
                }, 500);
            }
        } else {
            setTimeout(unflipCards, 1000);
        }
    }

    function resetGame() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('flip');
            card.textContent = ''; 
        });
        matched = 0;
        flippedCards = [];
        shuffleCards();
    }

    function unflipCards() {
        const [card1, card2] = flippedCards;
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
    }


    function startGame() {
        shuffleCards();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.addEventListener('click', flipCard));
    }

    
    startGame();
});

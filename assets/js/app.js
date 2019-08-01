/*
Title: Pig Dice Game with Javascript
Author: Ylli Gorce
GitHub: https://github.com/ylligorce
Version: 1.0
 */

var scores,
    roundScore,
    activePlayer,
    diceImage;

var GAME_PLAYING;

const MAX_SCORE = 30;

//Init
init();

//Roll button
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (!GAME_PLAYING) return;

    //Random number
    const randomNumber = Math.round(Math.random() * 6),
        dice = randomNumber === 0 ? 1 : randomNumber;

    //display result
    diceImage.style.display = 'block';
    diceImage.src = `dice-${dice}.png`;

    //update round score only IF not a 1
    if (dice !== 1) {

        //add score
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

    } else {
        //Next player
        nextPlayer();
    }

});

//Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (!GAME_PLAYING) return;

    //Add current score to global score
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    //Check if player Won The Game
    if (isWinner()) {
        return;
    }

    //Next player
    nextPlayer();

});

//New Game
document.querySelector('.btn-new').addEventListener('click', init);


function init() {

    GAME_PLAYING = true;

    //Global
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceImage = document.querySelector('.dice');

    //Reset dice image
    diceImage.style.display = 'none';

    //Reset Default
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    const playersElement = document.querySelectorAll('.player-panel'),
        playerNames = document.querySelectorAll('.player-name'),
        playerScoreElement = document.querySelectorAll('.player-score'),
        playerCurrentScoreElement = document.querySelectorAll('.player-current-score');

    for (let i = 0; i < scores.length; i++) {

        //reset active
        playersElement[i].classList.remove('active');
        playersElement[i].classList.remove('winner');

        //reset total score
        playerScoreElement[i].textContent = '0';

        //reset current score
        playerCurrentScoreElement[i].textContent = '0';

        //reset player names
        playerNames.textContent = `Player ${i + 1}`;
    }

    //Set Player 1 as active
    document.querySelector('.player-0-panel').classList.add('active');
}

function isWinner() {

    if (scores[activePlayer] >= MAX_SCORE) {

        //show trophy
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
        document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';

        //reset values
        diceImage.style.display = 'none';

        GAME_PLAYING = false;

        return true;
    }

    return false;
}

function nextPlayer() {

    //Reset scores
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Change active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide dice if 1
    diceImage.style.display = 'none';
}


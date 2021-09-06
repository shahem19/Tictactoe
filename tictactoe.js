let gameStatus = document.querySelector('#status'); 

let gameActive = true;

let currentPlayer = "X";

let gameRounds = ["", "", "", "", "", "", "", "", ""];

let winConditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


let winBanner = function() {
    return `Player ${currentPlayer} has won the game!`;
};


let drawBanner = function() {
    return `Game ended in a draw!`;
};


let currentPlayerTurn = function() {
    return `It is ${currentPlayer}'s turn!`;
};


gameStatus.innerHTML = currentPlayerTurn();


function clickBox(boxClick) {
    let clickedBox = boxClick.target;
    let boxNumber = parseInt(clickedBox.getAttribute('data-cell-index'));
    if(gameRounds[boxNumber] !== "" || !gameActive) {
        return;
    };
    fillBox(clickedBox, boxNumber);
    winCheck();
};


function fillBox(clickedBox, boxNumber) {
    gameRounds[boxNumber] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
};


function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = currentPlayerTurn();
};


function winCheck() {
    let win = false;
    let draw = !gameRounds.includes('');

    for (let i = 0; i<=7; i++) {
        let winCondition = winConditions[i];
        let x = gameRounds[winCondition[0]];
        let y = gameRounds[winCondition[1]];
        let z = gameRounds[winCondition[2]];
        if (x === "" || y === "" || z === ""){
            continue;
        }
        if (x === y && y === z) {
            win = true;
            break
        }
    }

    if (win) {
        gameStatus.innerHTML = winBanner();
        gameActive = false;
        return;
    }

    if (draw) {
        gameStatus.innerHTML = drawBanner();
        gameActive = false;
        return;
    }
    
    changePlayer();
};


function gameReset() {
    gameActive = true;
    gameRounds = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
};


document.querySelectorAll('.box').forEach(box => box.addEventListener('click', clickBox));
document.querySelector('.reset').addEventListener('click', gameReset);

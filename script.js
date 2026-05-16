"use strict"



function Gameboard() {
    const board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const fillCell = (column, row, symbol) => {
        if (board[row][column] != " ") return;
        board[row][column] = symbol;
    }

    const printBoard = () => {
        console.table(board);
    }

    const getBoard = () => board;

    return { getBoard, fillCell, printBoard };
}

function Player(username, symbol) {
    if (symbol.length > 1) throw Error("Symbol has to be of 1 character");

    const playerName = username;
    const playerSymbol = symbol;

    const getPlayerName = () => playerName;
    const getPlayerSymbol = () => playerSymbol;
    return { getPlayerName, getPlayerSymbol }
}

function GameController(playerOne, playerTwo) {
    const board = Gameboard();
    let counter = 0;
    let hasWinner = false;

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;

    const switchPlayers = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne
    }

    const checkWinner = (board) => {
        for (let i = 0; i < 3; i++) {
            // Column Check
            if (board[0][i] != " " && board[0][i] == board[1][i]
                && board[1][i] == board[2][i])
                    return true

            // Row Check
            if(board[i][0] != " " && board[i][0] == board[i][1] 
                && board[i][1] == board[i][2])
                    return true
        }

        //Anti-Slash like diagonal
        if(board[0][0] != " " && board[0][0] == board[1][1] 
            && board[1][1] == board[2][2])
                return true

        //Slash like diagonal
        if(board[0][2] != " " && board[2][0] == board[1][1] 
            && board[1][1] == board[0][2])
                return true;
    }

    const playRound = (column, row) => {
        counter++;
        board.fillCell(column, row, activePlayer.getPlayerSymbol())
        board.printBoard();

        if (counter >= 5) {
            hasWinner = checkWinner(board.getBoard());
        }

        if(!hasWinner) switchPlayers();
    }

    const getHasWinner = () => hasWinner;

    return { getHasWinner, getActivePlayer, playRound }
}

(function ScreenRender() {
    const game = GameController(Player("P1", "X"), Player("P2", "O"));
    const container = document.querySelector(".container");
    const info = document.querySelector(".info");

    function gameState(e) {
        e.target.textContent = game.getActivePlayer().getPlayerSymbol();
        const col = Number.parseInt(e.target.dataset.col);
        const row = Number.parseInt(e.target.dataset.row);
        game.playRound(col, row, game.getActivePlayer());


        if(game.getHasWinner()){
            info.textContent = `${game.getActivePlayer().getPlayerName()} (${game.getActivePlayer().getPlayerSymbol()}) WON ! GG !`
            container.removeEventListener('click', gameState);
            return;
        }

        console.log(`col : ${col}, row : ${row}`);
        info.textContent = `It's ${game.getActivePlayer().getPlayerName()}'s (${game.getActivePlayer().getPlayerSymbol()}) turn `
    }

    container.addEventListener('click', gameState);
})();



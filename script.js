"use strict"



function Gameboard() {
    const board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const fillCell = (column, row, player) => {
        if (board[row][column] != " ") return;
        board[row][column] = player.getPlayerSymbol();
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

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;

    const switchPlayers = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne
    }

    const getBoard = () => board;


    const playRound = (column, row) => {
        board.fillCell(column, row, activePlayer)
        board.printBoard();
        if (!checkWinner()) switchPlayers();
    }


    const checkWinner = () => {
        for(let i = 0; i < 3; i++){
            if(board.getBoard()[i][0] != " " && board.getBoard()[i][0] == board.getBoard()[i][1] && board.getBoard()[i][1] == board.getBoard()[i][2])
                return true
        }

        for(let i = 0; i < 3; i++){
            if(board.getBoard()[0][i] != " " && board.getBoard()[0][i] == board.getBoard()[1][i] && board.getBoard()[1][i] == board.getBoard()[2][i])
                return true
        }

        if(board.getBoard()[0][0] != " " && board.getBoard()[0][0] == board.getBoard()[1][1] && board.getBoard()[1][1] == board.getBoard()[2][2])
            return true

        if(board.getBoard()[0][2] != " " && board.getBoard()[2][0] == board.getBoard()[1][1] && board.getBoard()[1][1] == board.getBoard()[0][2])
            return true;

        return false;
    }

    return { checkWinner, getBoard, getActivePlayer, playRound}
}

function ScreenRender() {
    const game = GameController(Player("P1", "X"), Player("P2", "O"));
    const container = document.querySelector(".container");
    const info = document.querySelector(".info");
    let counter = 0;
    let hasWinner = false;

    function gameState(e){
        counter++;

        e.target.textContent = game.getActivePlayer().getPlayerSymbol();
        const col = Number.parseInt(e.target.dataset.col);
        const row = Number.parseInt(e.target.dataset.row);
        game.playRound(col, row, game.getActivePlayer());

        if(counter >= 5){
            hasWinner = game.checkWinner();
            console.log(hasWinner)
        }

        if(counter == 9){
            info.textContent = "Draw"
            container.removeEventListener('click', gameState);
            return;
        }

        if(hasWinner){
            info.textContent =  `${game.getActivePlayer().getPlayerName()}'s (${game.getActivePlayer().getPlayerSymbol()}) WON !`
            container.removeEventListener('click', gameState);
            return;
        }

        console.log(`col : ${col}, row : ${row} (counter : ${counter})`)

        info.textContent =  `It's ${game.getActivePlayer().getPlayerName()}'s (${game.getActivePlayer().getPlayerSymbol()}) turn `
    }

    container.addEventListener('click', gameState);


}

const a = ScreenRender();


const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const addMarker = (index) => {
        if (gameBoard.getBoard()[index] !== '') return;
        gameBoard.setBoard(index, symbol);
        game.checkWinner();
    };
    
    return { getName, getSymbol, addMarker };
};

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;
    const setBoard = (index, symbol) => {
        board[index] = symbol;
    };
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };
    return { getBoard, setBoard, resetBoard };
})();

const displayController = (() => {
    const pageBoard = document.querySelector('.game-board');
    const renderBoard = () => {
        pageBoard.innerHTML = '';
        gameBoard.getBoard().forEach((item, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.onclick = () => {
                game.getPlayer().addMarker(index);
                renderBoard();
                game.changePlayer();
            };
            cell.setAttribute('data-index', index);
            cell.textContent = item;
            pageBoard.appendChild(cell);
        });
    };
    return { renderBoard };
})();

const game = (() => {
    displayController.renderBoard(); // Render the board on page load
    const X = Player('X', 'X');
    const O = Player('O', 'O');
    let player = X;
    const changePlayer = () => {
        player = player === X ? O : X;
    };
    const getPlayer = () => player;
    const checkWinner = () => {
        const board = gameBoard.getBoard();
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        winningCombos.forEach((combo) => {
            if (
                board[combo[0]] === board[combo[1]] &&
                board[combo[1]] === board[combo[2]] &&
                board[combo[0]] !== ''
            ) {
                displayController.renderBoard();
                alert(`${player.getName()} wins!`);
                gameBoard.resetBoard();
            }
        });
    };
    return { changePlayer, getPlayer, checkWinner};
})();
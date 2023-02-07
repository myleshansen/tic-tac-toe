const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return { getName, getSymbol };
};

const gameBoard = (() => {
    let board = ['X', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X'];
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
            cell.setAttribute('data-index', index);
            cell.textContent = item;
            pageBoard.appendChild(cell);
        });
    };
    return { renderBoard };
})();

displayController.renderBoard();
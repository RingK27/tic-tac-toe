let squares = document.getElementsByClassName('square');

const gameController = (() => {
    let turn = 0; 

    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {  
            if (gameBoard.board[this.id] == '') {
                if (turn == 0 || (turn % 2) == 0) {
                    gameBoard.board[this.id] = "<img src='.\\images\\circle.png'>";
                } else {
                    gameBoard.board[this.id] = "<img src='.\\images\\cross.png'>";
                }        
                gameBoard.drawBoard(gameBoard.board);
                turn += 1;
            } else {
                return;
            } 
            if (turn > 3) {
                checkWin();
            }
        });
    };
    const checkWin = () => console.log('no winner');    
})();

const gameBoard = (() => {       
    let board = ['','','','','','','','',''];
    const drawBoard = ([]) => {
        for (let i = 0; i < 9; i++) {
            squares[i].innerHTML = board[i];
        }
    } 
    const clearBoard = () => console.log('board cleared');

    return {        
        board,
        drawBoard,
        clearBoard,               
    };
})();


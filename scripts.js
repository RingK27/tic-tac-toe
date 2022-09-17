let squares = document.getElementsByClassName('square');
let footer = document.getElementById('footer');
let gamegrid = document.getElementById('game-grid');
let cpuBtn = document.getElementById('cpu-opponent');
let humBtn = document.getElementById('human-opponent');
let pCpuGame = document.getElementById('cpu-game');
let pHumGame = document.getElementById('human-game');
let pStart = document.getElementById('p-start-game');
let startBtn = document.getElementById('start-game');
let pSelect = document.getElementById('select-opponent');
let winnerText = document.getElementById('winner-text');
let p1 = '';
let p2 = '';
let game = '';
let identity = '';

pCpuGame.style.display = 'none';
pHumGame.style.display = 'none';
pStart.style.display = 'none';
footer.style.display = 'none';
gamegrid.style.display = 'none';

cpuBtn.addEventListener('click', function() {
    game = 'cpu';
    pCpuGame.style.display = 'block';
    pStart.style.display = 'block';
});
humBtn.addEventListener('click', function() {
    game = 'human';
    pHumGame.style.display = 'block';
    pStart.style.display = 'block';
});
startBtn.addEventListener('click', function() { 
    pSelect.style.display = 'none';   
    if (game == 'human') {   
        identity = 'human';     
        p1 = document.getElementById('1pname').value;
        p2 = document.getElementById('2pname').value;     
        pHumGame.innerHTML ='<br><br>' + p1 + ' ____VS____ ' + p2;     
    } else {
        identity = 'cpu';
        p1 = document.getElementById('1pcname').value;
        p2 = 'dumb CPU';
        pCpuGame.innerHTML = '<br><br>' + p1 + ' ____VS____ ' + p2; 
    }
    pStart.style.display = 'none';
    gamegrid.style.display = 'grid';
    const player = playerFactory(identity);
    player.playTurn();
});


const playerFactory = (identity) => {
    const playTurn = () => {
        if (identity == "human") {
            for(let i = 0; i < squares.length; i++) {
                squares[i].addEventListener('click', function() {  
                    if (gameBoard.board[this.id] == '') {
                        if (gameController.turn == 0 || (gameController.turn % 2) == 0) {
                            gameBoard.board[this.id] = "<img src='.\\images\\circle.png'>";
                        } else {
                            gameBoard.board[this.id] = "<img src='.\\images\\cross.png'>";
                        }        
                        gameBoard.drawBoard(gameBoard.board);
                        gameController.turn += 1;
                    } else {
                        return;
                    } 
                    if (gameController.turn > 3) {
                        gameController.checkWin();
                    }
                });
            };
        } else {
            for(let i = 0; i < squares.length; i++) {
                if (gameController.turn == 0 || (gameController.turn % 2) == 0) {
                    squares[i].addEventListener('click', function() {
                        if (gameBoard.board[this.id] == '') {
                            gameBoard.board[this.id] = "<img src='.\\images\\circle.png'>";
                            gameController.turn += 1;
                            gameBoard.drawBoard(gameBoard.board);
                            if (gameController.turn > 3) {
                                gameController.checkWin();
                            }                        
                            playTurn();
                        } else {
                            return;
                        }                        
                    });
                } else if (gameController.turn < 9){    
                    const randomPick = () => {
                        return Math.floor(Math.random() * 9);
                    }
                    let rPicked = randomPick();
                    while (gameBoard.board[rPicked] != '') {                        
                        rPicked = randomPick();
                    }
                    gameBoard.board[rPicked] = "<img src='.\\images\\cross.png'>";
                    gameController.turn += 1;
                    gameBoard.drawBoard(gameBoard.board);
                    if (gameController.turn > 3) {
                        gameController.checkWin();
                    }                    
                    return; 
                }  
            }
        }
    }
    return {playTurn};
};

const gameController = (() => {
    let turn = 0;
    const checkWin = () => {        
        let board = gameBoard.board;
        if (board[0] == board[1] && board[1] == board[2] && board[0] != '') {
            footer.style.display = 'block';
            winnerText.innerText = p1 + ", CONGRATULATIONS!!!"
        } else if (board[3] == board[4] && board[4] == board[5] && board[3] != '') {
            console.log(board[3]);
        } else if (board[6] == board[7] && board[7] == board[8] && board[6] != '') {
            console.log(board[6]);
        } else if (board[0] == board[3] && board[3] == board[6] && board[0] != '') {
            console.log(board[0]);
        } else if (board[1] == board[4] && board[4] == board[7] && board[1] != '') {
            console.log(board[1]);
        } else if (board[2] == board[5] && board[5] == board[8] && board[2] != '') {
            console.log(board[2]);
        } else if (board[0] == board[4] && board[4] == board[8] && board[0] != '') {
            console.log(board[0]);
        } else if (board[2] == board[4] && board[4] == board[6] && board[2] != '') {
            console.log(board[2]);
        } else {
            if (turn == 9) {
                console.log('draw');
            }
        }
    }
    return {
        turn,
        checkWin,
    }    
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
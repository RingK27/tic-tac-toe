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
    let circleWinner = 'circle';
    let crossWinner = 'cross';
    const checkWin = () => {        
        let board = gameBoard.board;
        for (let i = 0; i < board.length; i += 3) {                        
            if (board[i] != '' && board[i] == board[i+1] && board[i+1] == board[i+2]) {
                if (board[i].indexOf(circleWinner) !== -1) {
                    winnerText.innerText = p1 + ", CONGRATULATIONS!!!"
                } else {
                    winnerText.innerText = p2 + ", CONGRATULATIONS!!!"
                }
                footer.style.display = 'block';
                gameBoard.stopGame();                    
            }            
        }
        for (let i = 0; i < board.length; i++) {                        
            if (board[i] != '' && board[i] == board[i+3] && board[i+3] == board[i+6]) {
                if (board[i].indexOf(circleWinner) !== -1) {
                    winnerText.innerText = p1 + ", CONGRATULATIONS!!!"
                } else {
                    winnerText.innerText = p2 + ", CONGRATULATIONS!!!"
                }
                footer.style.display = 'block';
                gameBoard.stopGame();                     
            }            
        }
        if (board[0] == board[4] && board[4] == board[8]) {
            if (board[0].indexOf(circleWinner) !== -1) {
                winnerText.innerText = p1 + ", CONGRATULATIONS!!!"
            } else {
                winnerText.innerText = p2 + ", CONGRATULATIONS!!!"
            }
            footer.style.display = 'block';
            gameBoard.stopGame(); 
        } else if (board[2] == board[4] && board[4] == board[6]){
            if (board[2].indexOf(circleWinner) !== -1) {
                winnerText.innerText = p1 + ", CONGRATULATIONS!!!"
            } else {
                winnerText.innerText = p2 + ", CONGRATULATIONS!!!"
            }
            footer.style.display = 'block';
            gameBoard.stopGame(); 
        }      
        
        let newRound = document.getElementById('new-match');
        newRound.addEventListener('click', gameBoard.restart);
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
    const restart = () => {
        location.reload();
    }
    const stopGame = () => {
        for(let i = 0; i < squares.length; i++) {
            squares[i].replaceWith(squares[i].cloneNode(true));
        }
    }
    return {        
        board,
        drawBoard,
        stopGame,
        restart,               
    };
})();
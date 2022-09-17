let squares = document.getElementsByClassName('square');

for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
        console.log(this.id);
    });
}

const gameBoard = () => {
    let cells = [9];
}


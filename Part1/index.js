// clm  0 1 2 
// row0 0 1 2
// row1 3 4 5
// row2 6 7 8
var board;

// board is 3 * 3
const size = 3;

initBoard();

// initialize the board array
function initBoard(){
    board = [];
    for(let i = 0; i < size ** 2; i++){
        board.push('');
    }
}

function play(id){
    let td = document.getElementById(id+''); 
    let player = document.getElementById('player')
    // put player's mark in td
    td.innerText = player.innerText;

    // recording player's mark
    board[id] = player.innerText;

    // disable the tile.
    disableTD(id);

    // check if the player wins: true -> win
    if (checkWin(id)){
        disableAllTD();
        alert(`Player ${player.innerText} won!`);
    }

    // tie
    if (board.filter((v => v == '')).length == 0){
        alert('Tie!');
    }
    

    //change player
    player.innerText = player.innerText=='X'?'0':'X';
    
}

// check if the player win
// only check the tile as same row/column as the clicked one.
// diagonal lines always checked
function checkWin(id){
    let column = id % 3;
    let row = Math.floor(id / 3);
    let win = false;
    // check same row
    let sameRow = board.slice(row*size, (row+1)*size);
    // check same column
    let sameColumn = board.filter( (v, i) => i % size == column);
    // check diagonal
    let firstDiag = [];
    for(let i = 0; i < size * size; i += (size + 1)){
        firstDiag.push(board[i]);
    }
    let secondDiag = [];
    for(let i = size - 1; i <= size * (size - 1); i += (size - 1)){
        secondDiag.push(board[i]);
    }
    // all need to check is in sameLine
    let sameLine = [sameRow, sameColumn, firstDiag, secondDiag]

    for(let i = 0; i < sameLine.length; i++){
        win = win || sameLine[i].reduce(checkLine, true);
    }

    return win;
}

// for reduce function.
function checkLine(result, v){
    return result && (v == document.getElementById('player').innerText);
}

// reset the board.
function reset(){
    let td; 
    for (let i = 0; i < size ** 2; i++){
        td = document.getElementById(i+''); 
        td.innerText = '';
        td.setAttribute('onclick',`play(${i})`);
    }
    initBoard();
}

// disable one tile.
function disableTD(id){
    document.getElementById(id+'').setAttribute('onclick','');
}

// disable all tile.
function disableAllTD(){
    for (let i = 0; i < size ** 2; i++){
        disableTD(i);
    }
}
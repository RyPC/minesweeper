const boardWidth = screen.width * 0.80;
const pieceWidth = boardWidth / 30 - 3.8;

var board = [];
var end = false;


function start() {
    "use strict";
    
    var i, j, k;
    var temp = [];
    for (i = 0; i < 30; i++) {
        temp.push(0);
    }
    
    for (i = 0; i < 16; i++) {
        board.push(Object.assign({}, temp));
    }
    
    for (i = 0; i < 99; i++) {
        var row = Math.floor(Math.random() * 16);
        var col = Math.floor(Math.random() * 30);
        if (board[row][col] !== -1) {
            board[row][col] = -1;
            for (j = (col === 0 ? 0 : -1); j < (col === 29 ? 1 : 2); j++) {
                for (k = (row === 0 ? 0 : -1); k < (row === 15 ? 1 : 2); k++) {
                    if ((j !== 0 || k !== 0) && board[row + k][col + j] !== -1) {
                        board[row + k][col + j]++;
                    }
                }
            }
        }
        else {
            i--;
        }
    }
    console.log(board);
    
    
    var html = "";
    for (i = 0; i < 16; i++) {
        for (j = 0; j < 30; j++) {
            html+= `<div class="square" style="width: ${pieceWidth}px; height: ${pieceWidth}px" id="row${i}col${j}" onclick="reveal(${i}, ${j})"></div>`;
        }
    }
    
    document.getElementById("board").innerHTML = html;
    document.getElementById("board").style.width = boardWidth;
//    document.getElementById("container").style.maxWidth = boardWidth;

}

function reveal(row, col) {
    "use strict";
    
    if (end) {
        return;
    }
    if (board[row][col] === -1) {
        document.getElementById(`row${row}col${col}`).innerHTML = `<a style=" color:red; font-size: 40px;">*<a>`;
        var result = confirm("You Lose!\nRestart?");
        end = true;
        if (result) {
            window.location.reload();
        }
        return;
    }
    if (board[row][col] === 0) {
        board[row][col] = "";
        for (var i = (row === 0 ? 0 : -1); i < (row === 15 ? 1 : 2); i++) {
            for (var j = (col === 0 ? 0 : -1); j < (col === 29 ? 1 : 2); j++) {
                if (!(i === 0 && j === 0) && board[row + i][col + j] !== 9 && board[row + i][col + j] !== null) {
                    reveal(row + i, col + j);
                }
            }
        }
    }
    document.getElementById(`row${row}col${col}`).innerHTML = `<a style="font-size: 28px;">${board[row][col]}<a>`;
    document.getElementById(`row${row}col${col}`).style.backgroundColor = "grey";
    
}




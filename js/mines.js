'use strict'



function addMinesRandom() {
    for (var i = 0; i < gLevel.mines; i++) {
        var randI = getRandomIntInclusive(0, gMineBoard.length - 1)
        var randJ = getRandomIntInclusive(0, gMineBoard.length - 1)
        var cellClass = getClassName({ i: randI, j: randJ })
        addMines(randI, randJ)
        var elCell = document.querySelector(`.${cellClass}`)
        elCell.innerText = MINE
    }
}

function addMines(i, j) {
    gMineBoard[i][j].isMine = true
}



function renderMinesNegCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = countMineAround(board, i, j)
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            if (elCell.innerText === MINE) continue
            
            elCell.innerText =  (!currCell.minesAroundCount) ? " " : currCell.minesAroundCount;
        }
    }
}



function countMineAround(board, rowIdx, colIdx) {
    var mineCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
            if (cell.isMine) mineCount++

        }
    }
    return mineCount
}



function countIfMineAround(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
            if (!cell.isMine && cell.minesAroundCount === 0 ){
              cell.isShown = true
            }
            
        }
    }
    
    // renderBoard(gMineBoard)
}


// } else if (!gBoard[indexI][indexJ].isMine && gBoard[indexI][indexJ].minesAroundCount === 0) {
//             for (var i = indexI - 1; i < indexI + 2; i++) {
//                 if (i < 0 || i >= gBoard.length) continue;
//                 for (var j = indexJ - 1; j < indexJ + 2; j++) {
//                     if (j < 0 || j > gBoard[i].length - 1) continue
//                     if (i === indexI && j === indexJ) gBoard[indexI][indexJ].isShown = true;
//                     if (gBoard[indexI][indexJ].isMine === false) gBoard[i][j].isShown = true;//// try nighbor func
//                     // if (gBoard[i][j].minesAroundCount === 0) neigLoop(i,j)
//                 }
//             }
//         }
//         else gBoard[indexI][indexJ].isShown = true;

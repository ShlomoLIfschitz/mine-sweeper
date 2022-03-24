'use strict';

const MINE = '💣'
const FLAGE = '🚩'

var gEltimer = document.querySelector('.timer')
var gClickCount = 0
var gIdInterval;
var gIsInterval = true;
var gMineBoard;

var gLevel = {
    size: 4,
    mines: 3,
    lives: 3
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gEltimer.innerText = ''
    clearInterval(gIdInterval)
    gMineBoard = buildBoard(gLevel.size)
    renderBoard(gMineBoard)
    setLives()
    gIsInterval = true
    setSmiley('🙂')
    gGame.isOn = true
}


function setLevel(size, mines, lives) {
    gLevel.size = size
    gLevel.mines = mines
    gLevel.lives = lives
    var elModal = document.querySelector('.modal')
    elModal.style.display = "none"
    initGame()
}


function renderModal(msg) {
    var elModal = document.querySelector('.modal')
    var elModalP = document.querySelector('p')
    elModalP.innerText = msg
    elModal.style.display = "block"
}

function setSmiley(img) {
    var elBtn = document.querySelector(".reset-btn")
    elBtn.innerText = img
}

function buildBoard(num) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board[i] = [];
        for (var j = 0; j < num; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };

        }
    }
    return board;

}



function addFlage(ev, i, j) {
    ev.preventDefault()
    var item = ''
    if (gMineBoard[i][j].isShown) return
    if (!gMineBoard[i][j].isMarked) {
        item = FLAGE
        var elCell = document.querySelector('td')
        item = FLAGE
        gMineBoard[i][j].isMarked = true
    } else {
        gMineBoard[i][j].isMarked = false
        item = (gMineBoard[i][j].isMine) ? MINE : gMineBoard[i][j].minesAroundCount
    }
    renderCell(i, j, item)
}


function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function checkVictory() {
    var counteMineMarked = 0;
    for (var i = 0; i < gMineBoard.length; i++) {
        for (var j = 0; j < gMineBoard[0].length; j++) {
            if (gMineBoard[i][j].isMine && gMineBoard[i][j].isMarked) {
                counteMineMarked++;
            }
        }
    }
    if ((gLevel.lives > 0 || counteMineMarked === gLevel.mines) && (gLevel.size ** 2 - gLevel.mines) === gGame.shownCount) {
        renderModal('You won')
        setSmiley('😎')
        clearInterval(gIdInterval)
        gGame.isOn = false
    }
}


function checkLose() {
    var valew;
    if (gLevel.lives === 0) {
        for (var i = 0; i < gMineBoard.length; i++) {
            for (var j = 0; j < gMineBoard[0].length; j++) {
                if (gMineBoard[i][j].isMine)
                    gMineBoard[i][j].isShown = true
                renderModal('You lost!')
                setSmiley('😵‍💫')
                renderCell(i, j, MINE)
                gGame.isOn = false
            }
        }
    }

    clearInterval(gIdInterval)
}


function cellClicked(element, i, j) {
    if (!gGame.isOn) return
    if (gMineBoard[i][j].isMarked) return
    if (gIsInterval) {
        gMineBoard[i][j].isMine = false
        setTimer()
        addMinesRandom()
        renderMinesNegCount(gMineBoard)
        gIsInterval = false
    }
    element.style.textIndent = "initial"
    element.style.backgroundColor = (gMineBoard.isMine) ? "yellow" : "gray"
    gMineBoard[i][j].isShown = true
    if (gMineBoard[i][j].isMine) {
        gLevel.lives--
        setLives()
        checkLose()
    } else {
        gGame.shownCount++
    }
    countIfMineAround(gMineBoard, i, j)
    checkVictory()
}


function setLives() {
    var elSpan = document.querySelector('.lives span')
    elSpan.innerText = gLevel.lives
}




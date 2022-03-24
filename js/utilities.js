'use strict'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function setTimer() {
  var startTime = Date.now()
  gIdInterval = setInterval(function () {
     gEltimer.innerText = Math.floor(((Date.now() - startTime) / 1000).toFixed(3))
  }, 1000)
}

function renderBoard(board) {
  // console.log('board', board)
  var strHTML = '<table> ';

  for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>\n';
      for (var j = 0; j < board[0].length; j++) {
          var cellClass = getClassName({ i: i, j: j })
          strHTML += `<td class="${cellClass} cell-${i}-${j}" oncontextmenu = "addFlage(event,${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" ></td> `;
      }
      strHTML += '</tr>\n';
  }
  strHTML += '</table>'
  var elBoard = document.querySelector('.mine-board');
  elBoard.innerHTML = strHTML;
}

function renderCell(i, j, value) {
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  elCell.innerText = value;
  elCell.style.textIndent =(gMineBoard[i][j].isMarked) ? "initial" : "-9999px";
}











import '../main.css';
import drawBackground from './background';
import BoardGame from './boardGame';
import { playNonN } from './menu';

drawBackground();

// //start page
const gameWrapper = document.querySelector('.game-warapper') as HTMLElement;
const game3 = document.querySelector('#start3on3') as HTMLParagraphElement;
const game5 = document.querySelector('#start5on5') as HTMLParagraphElement;
const gameN = document.querySelector('#startNonN') as HTMLParagraphElement;
const sizeBoardPage = document.querySelector('.boardSize') as HTMLDivElement;
const beginGame = document.querySelector('.start-page') as HTMLElement;
const canvasWrapper = document.querySelector('.center-wrapper-parent') as HTMLElement;
let boardDimension: number = 3;
let rpt: number = 0;

const canvasGame = <HTMLCanvasElement>document.getElementById('TicTacToe');
const gameCanvasContext = canvasGame.getContext('2d') as CanvasRenderingContext2D;

const gameBoard = new BoardGame(gameCanvasContext);

const gameWrapperObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const { inlineSize, blockSize } = entry.borderBoxSize[0];

    const canvasSize = inlineSize > blockSize ? blockSize * 0.75 : inlineSize * 0.75;

    canvasGame.width = canvasSize;
    canvasGame.height = canvasSize;

    gameBoard.drawBoard({ canvasSize, boardDimension });
  });
});

gameWrapperObserver.observe(gameWrapper);

function showGameBoard(dimension: number) {
  if (dimension < 5) {
    rpt = 3;
  }
  if (dimension == 5) {
    rpt = 4;
  }
  if (dimension > 5) {
    rpt = 5;
  }

  boardDimension = dimension;
  beginGame.style.display = 'none';
  sizeBoardPage.style.display = 'none';
  canvasWrapper.style.display = 'block';

  const { clientHeight, clientWidth } = gameWrapper;
  const canvasSize = clientWidth > clientHeight ? clientHeight * 0.75 : clientWidth * 0.75;

  canvasGame.width = canvasSize;
  canvasGame.height = canvasSize;
  gameBoard.drawBoard({ canvasSize, boardDimension: dimension });
}

game3.addEventListener('click', () => showGameBoard(3));
game5.addEventListener('click', () => showGameBoard(5));
gameN.addEventListener('click', () => {
  beginGame.style.display = 'none';
  sizeBoardPage.style.display = 'block';

  playNonN(showGameBoard);
});

// function replayBtn() {
//   const buttonReplay = document.createElement('button');
//   buttonReplay.className = 'replayBtn send-button';
//   buttonReplay.textContent = 'Replay';
//   const cwrpParent = document.querySelector('.center-wrapper-parent');
//   cwrpParent.insertBefore(buttonReplay, document.querySelector('.canvas-wrapper'));
//   //replay game
//   const replay = document.querySelector('.replayBtn');
//   replay.addEventListener('click', function () {
//     document.querySelector('canvas').remove();
//     const elem = document.createElement('canvas');
//     elem.className = 'center-v';
//     elem.id = 'TicTacToe';
//     const cnvwrp = document.querySelector('.canvas-wrapper');
//     cnvwrp.appendChild(elem);
//     const points = document.querySelectorAll('.score');
//     for (let i = 0; i < points.length; i++) {
//       points[i].remove();
//     }
//     pointX = 0;
//     pointO = 0;
//     score(0, 0, 0);
//     if (document.querySelector('.winBox')) {
//       document.querySelector('.winBox').remove();
//     }
//     beginPlay();
//   });
// }

// function menu() {
//   const menuBtn = document.createElement('button');
//   menuBtn.className = 'menuBtn send-button';
//   menuBtn.textContent = 'Menu';
//   const cwrpParent = document.querySelector('.center-wrapper-parent');
//   cwrpParent.insertBefore(menuBtn, document.querySelector('.canvas-wrapper'));
//   //replay game
//   const menu = document.querySelector('.menuBtn');
//   menu.addEventListener('click', function () {
//     menuBtn.remove();
//     const points = document.querySelectorAll('.score');
//     for (let i = 0; i < points.length; i++) {
//       points[i].remove();
//     }
//     document.querySelector('.replayBtn').remove();
//     document.querySelector('canvas').remove();
//     canvasGame.style.display = 'none';
//     beginGame.style.display = 'block';
//     pointX = 0;
//     pointO = 0;
//     if (document.querySelector('.winBox')) {
//       document.querySelector('.winBox').remove();
//     }
//   });
// }

// var pointX = 0;
// var pointO = 0;
// function score(X, O, del) {
//   if (del) {
//     const points = document.querySelectorAll('.score');
//     for (let i = 0; i < points.length; i++) {
//       points[i].remove();
//     }
//   }
//   const resultX = document.createElement('p');
//   const resultO = document.createElement('p');
//   const scoreX = X;
//   const scoreO = O;
//   resultX.className = 'score score_x';
//   resultO.className = 'score score_o';
//   resultX.textContent = 'X: ' + scoreX;
//   resultO.textContent = 'O: ' + scoreO;
//   const cwrpParent = document.querySelector('.canvas-wrapper');
//   cwrpParent.appendChild(resultX);
//   cwrpParent.appendChild(resultO);
// }

// function winner(who) {
//   const div = document.createElement('div');
//   div.className = 'winBox';
//   const divInside = document.createElement('div');
//   divInside.className = 'inside';
//   const winText = document.createElement('p');
//   winText.className = 'who-win';
//   winText.textContent = who + ' wins!';
//   const nextGame = document.createElement('button');
//   nextGame.className = 'continue-btn send-button';
//   nextGame.id = 'cntnGame';
//   nextGame.textContent = 'Continue!';
//   //delete Who won window and create new canvas
//   nextGame.addEventListener('click', function () {
//     document.querySelector('canvas').remove();
//     const elem = document.createElement('canvas');
//     elem.className = 'center-v';
//     elem.id = 'TicTacToe';
//     const cnvwrp = document.querySelector('.canvas-wrapper');
//     cnvwrp.appendChild(elem);
//     document.querySelector('.winBox').remove();
//     beginPlay();
//     score(pointX, pointO, 1);
//   });
//   const parent = document.querySelector('.canvas-wrapper');
//   parent.appendChild(div);
//   const divWidth = document.body.clientWidth;
//   const divHeight = divWidth / 2.6;
//   const padding = divHeight / 3.3;
//   div.style.width = '' + divWidth + 'px';
//   div.style.height = '' + divHeight + 'px';
//   div.style.paddingTop = '' + padding + 'px';
//   const parentDiv = document.querySelector('.winBox');
//   parentDiv.appendChild(divInside);
//   const divIns = document.querySelector('.inside');
//   divIns.appendChild(winText);
//   divIns.appendChild(nextGame);
// }

// //CANVAS TicTacToe
// function beginPlay() {
//   const canvas = document.getElementById('TicTacToe');
//   const ctx = canvas.getContext('2d');
//   const colorLines = '#efdc4d';
//   const boardGame = [];
//   const checkBoard = [];
//   let q = 1;
//   const canvasSize = document.body.clientWidth / 3;
//   const cell = canvasSize / n;
//   canvas.width = canvasSize;
//   canvas.height = canvasSize;

//   //drawing cells
//   function drawLines(lineWidth, lineStyle) {
//     const lineStart = 4;
//     const lineLenght = canvasSize - 5;
//     ctx.lineWidth = lineWidth;
//     ctx.strokeStyle = lineStyle;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     //horizontal lines
//     for (let y = 1; y <= n - 1; y++) {
//       ctx.moveTo(lineStart, y * cell);
//       ctx.lineTo(lineLenght, y * cell);
//     }
//     //vertical lines
//     for (let x = 1; x <= n - 1; x++) {
//       ctx.moveTo(x * cell, lineStart);
//       ctx.lineTo(x * cell, lineLenght);
//     }
//     ctx.stroke();
//   }
//   // n == 3 -> 7
//   drawLines(7, 'yellow');

//   (function initializeBoardSquares() {
//     for (let i = 0; i <= n - 1; i++) {
//       boardGame[i] = [];
//       checkBoard[i] = [];
//       for (let j = 0; j <= n - 1; j++) {
//         boardGame[i][j] = {
//           left: Math.round(cell * j),
//           top: Math.round(cell * i),
//           right: Math.round(cell + cell * j),
//           bottom: Math.round(cell + cell * i),
//         };
//         checkBoard[i][j] = 0;
//       }
//     }
//   })();

//   // draw X
//   function drawX(currentCell) {
//     let denominator = n;
//     if (n <= 4) {
//       ctx.lineWidth = 7;
//     }
//     if (n > 4 && n <= 7) {
//       ctx.lineWidth = 6;
//     }
//     if (n > 7 && n <= 10) {
//       ctx.lineWidth = 4;
//     }
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'red';
//     ctx.beginPath();
//     if (n > 7 && n <= 10) {
//       denominator = 7;
//     }
//     ctx.moveTo(currentCell.left + 50 / denominator, currentCell.top + 50 / denominator);
//     ctx.lineTo(currentCell.right - 50 / denominator, currentCell.bottom - 50 / denominator);
//     ctx.moveTo(currentCell.right - 50 / denominator, currentCell.top + 50 / denominator);
//     ctx.lineTo(currentCell.left + 50 / denominator, currentCell.bottom - 50 / denominator);
//     ctx.stroke();
//   }

//   //draw O
//   function drawO(currentCell) {
//     if (n <= 4) {
//       ctx.lineWidth = 7;
//     }
//     if (n > 4 && n <= 7) {
//       ctx.lineWidth = 6;
//     }
//     if (n > 7 && n <= 10) {
//       ctx.lineWidth = 4;
//     }
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#a1e8f5';
//     ctx.beginPath();
//     if (n <= 7) {
//       ctx.arc(currentCell.left + cell / 2, currentCell.top + cell / 2, cell / 2.5, 0, 2 * Math.PI);
//     }
//     if (n > 7 && n <= 10) {
//       ctx.arc(currentCell.left + cell / 2, currentCell.top + cell / 2, cell / 2.6, 0, 2 * Math.PI);
//     }
//     ctx.stroke();
//   }

//   // check winner
//   function checkWinner() {
//     let diagonal1X = 'x';
//     let diagonal1o = 'o';
//     let diagonal2X = 'x';
//     let diagonal2o = 'o';
//     const diagonalsLeft1 = [];
//     const diagonalsRight1 = [];
//     const diagonalsLeft12 = [];
//     const diagonalsRight2 = [];
//     if (n > 3) {
//       let l = 0;
//       let rows = n - 1;
//       let iteration = -1;
//       for (let k = 0; k < n - 2; k++) {
//         diagonalsLeft1[k] = '';
//         diagonalsRight1[k] = '';
//         diagonalsLeft12[k] = '';
//         diagonalsRight2[k] = '';
//         let column = -1;
//         let column2 = -1;
//         iteration += 1;
//         let column3 = iteration;
//         rows -= 1;
//         l += 1;
//         for (let lines = l; lines <= n - 2; lines++) {
//           column += 1;
//           if (checkBoard[lines][column] !== 0 && checkBoard[lines + 1][column + 1] !== 0) {
//             if (checkBoard[lines][column] == 'x' && checkBoard[lines + 1][column + 1] == 'x') {
//               diagonalsLeft1[k] += checkBoard[lines][column];
//             } else if (checkBoard[lines][column] == 'o' && checkBoard[lines + 1][column + 1] == 'o') {
//               diagonalsLeft1[k] += checkBoard[lines][column];
//             }

//             if (checkBoard[column][lines] == 'x' && checkBoard[column + 1][lines + 1] == 'x') {
//               diagonalsRight1[k] += checkBoard[column][lines];
//             } else if (checkBoard[column][lines] == 'o' && checkBoard[column + 1][lines + 1] == 'o') {
//               diagonalsRight1[k] += checkBoard[column][lines];
//             }
//             if (diagonalsLeft1[k] == 'x'.repeat(rpt - 1) || diagonalsRight1[k] == 'x'.repeat(rpt - 1)) {
//               winner('X');
//               pointX += 1;
//               score(pointX, pointO, 1);
//               break;
//             } else if (diagonalsLeft1[k] == 'o'.repeat(rpt - 1) || diagonalsRight1[k] == 'o'.repeat(rpt - 1)) {
//               winner('O');
//               pointO += 1;
//               score(pointX, pointO, 1);
//               break;
//             }
//           } else if (checkBoard[column][lines] !== 0 && checkBoard[column + 1][lines + 1] !== 0) {
//             if (checkBoard[column][lines] == 'x' && checkBoard[column + 1][lines + 1] == 'x') {
//               diagonalsRight1[k] += checkBoard[column][lines];
//             } else if (checkBoard[column][lines] == 'o' && checkBoard[column + 1][lines + 1] == 'o') {
//               diagonalsRight1[k] += checkBoard[column][lines];
//             }
//             if (diagonalsRight1[k] == 'x'.repeat(rpt - 1)) {
//               winner('X');
//               pointX += 1;
//               score(pointX, pointO, 1);
//               break;
//             } else if (diagonalsRight1[k] == 'o'.repeat(rpt - 1)) {
//               winner('O');
//               pointO += 1;
//               score(pointX, pointO, 1);
//               break;
//             }
//           }
//         }
//         for (let row = rows; row > 0; row--) {
//           column2 += 1;
//           if (checkBoard[column2][row] !== 0 && checkBoard[column2 + 1][row - 1] !== 0) {
//             if (checkBoard[column2][row] == 'x' && checkBoard[column2 + 1][row - 1] == 'x') {
//               diagonalsLeft12[k] += checkBoard[column2][row];
//             } else if (checkBoard[column2][row] == 'o' && checkBoard[column2 + 1][row - 1] == 'o') {
//               diagonalsLeft12[k] += checkBoard[column2][row];
//             }
//             if (diagonalsLeft12[k] == 'x'.repeat(rpt - 1)) {
//               winner('X');
//               pointX += 1;
//               score(pointX, pointO, 1);
//               break;
//             } else if (diagonalsLeft12[k] == 'o'.repeat(rpt - 1)) {
//               winner('O');
//               pointO += 1;
//               score(pointX, pointO, 1);
//               break;
//             }
//           }
//         }
//         for (let row = n - 1; row > iteration; row--) {
//           column3 += 1;
//           if (checkBoard[row][column3] !== 0 && checkBoard[row - 1][column3 + 1] !== 0) {
//             if (checkBoard[row][column3] == 'x' && checkBoard[row - 1][column3 + 1] == 'x') {
//               diagonalsRight2[k] += checkBoard[row][column3];
//             } else if (checkBoard[row][column3] == 'o' && checkBoard[row - 1][column3 + 1] == 'o') {
//               diagonalsRight2[k] += checkBoard[row][column3];
//             }
//             if (diagonalsRight2[k] == 'x'.repeat(rpt - 1)) {
//               winner('X');
//               pointX += 1;
//               score(pointX, pointO, 1);
//               break;
//             } else if (diagonalsRight2[k] == 'o'.repeat(rpt - 1)) {
//               winner('O');
//               pointO += 1;
//               score(pointX, pointO, 1);
//               break;
//             }
//           }
//         }
//       }
//     }
//     for (let i = 0; i <= n - 2; i++) {
//       if (checkBoard[i][i] !== 0 && checkBoard[i + 1][i + 1] !== 0 && checkBoard[i][i] == checkBoard[i + 1][i + 1]) {
//         if (checkBoard[i][i] == 'x' && checkBoard[i + 1][i + 1] == 'x') {
//           diagonal1X += checkBoard[i][i];
//         } else if (checkBoard[i][i] == 'o' && checkBoard[i + 1][i + 1] == 'o') {
//           diagonal1o += checkBoard[i][i];
//         }
//       }
//       if (
//         checkBoard[i][n - i - 1] !== 0 &&
//         checkBoard[i + 1][n - i - 2] !== 0 &&
//         checkBoard[i][n - i - 1] == checkBoard[i + 1][n - i - 2]
//       ) {
//         if (checkBoard[i][n - i - 1] == 'x' && checkBoard[i + 1][n - i - 2] == 'x') {
//           diagonal2X += checkBoard[i][n - i - 1];
//         } else if (checkBoard[i][n - i - 1] == 'o' && checkBoard[i + 1][n - i - 2] == 'o') {
//           diagonal2o += checkBoard[i][n - i - 1];
//         }
//       }
//       if (diagonal1X == 'x'.repeat(rpt) || diagonal2X == 'x'.repeat(rpt)) {
//         winner('X');
//         pointX += 1;
//         score(pointX, pointO, 1);
//         break;
//       } else if (diagonal1o == 'o'.repeat(rpt) || diagonal2o == 'o'.repeat(rpt)) {
//         winner('O');
//         pointO += 1;
//         score(pointX, pointO, 1);
//         break;
//       }
//       let countVerticalx = 'x';
//       let countVerticalo = 'o';
//       let countHorizontalx = 'x';
//       let countHorizontalo = 'o';
//       let countVerticalxLast = 'x';
//       let countVerticaloLast = 'o';
//       let countHorizontalxLast = 'x';
//       let countHorizontaloLast = 'o';
//       for (let j = 0; j <= n - 2; j++) {
//         if (checkBoard[i][j] !== 0 && checkBoard[i][j + 1] !== 0 && checkBoard[i][j] == checkBoard[i][j + 1]) {
//           if (checkBoard[i][j] == 'x' && checkBoard[i][j + 1] == 'x') {
//             countHorizontalx += checkBoard[i][j];
//           }
//           if (checkBoard[i][j] == 'o' && checkBoard[i][j + 1] == 'o') {
//             countHorizontalo += checkBoard[i][j];
//           }
//         }
//         if (checkBoard[j][i] !== 0 && checkBoard[j + 1][i] !== 0 && checkBoard[j][i] == checkBoard[j + 1][i]) {
//           if (checkBoard[j][i] == 'x' && checkBoard[j + 1][i] == 'x') {
//             countVerticalx += checkBoard[j][i];
//           }
//           if (checkBoard[j][i] == 'o' && checkBoard[j + 1][i] == 'o') {
//             countVerticalo += checkBoard[j][i];
//           }
//         }
//         if (i == n - 2) {
//           if (
//             checkBoard[i + 1][j] !== 0 &&
//             checkBoard[i + 1][j + 1] !== 0 &&
//             checkBoard[i + 1][j] == checkBoard[i + 1][j + 1]
//           ) {
//             if (checkBoard[i + 1][j] == 'x' && checkBoard[i + 1][j + 1] == 'x') {
//               countHorizontalxLast += checkBoard[i + 1][j];
//             }
//             if (checkBoard[i + 1][j] == 'o' && checkBoard[i + 1][j + 1] == 'o') {
//               countHorizontaloLast += checkBoard[i + 1][j];
//             }
//           }
//           if (
//             checkBoard[j][i + 1] !== 0 &&
//             checkBoard[j + 1][i + 1] !== 0 &&
//             checkBoard[j][i + 1] == checkBoard[j + 1][i + 1]
//           ) {
//             if (checkBoard[j][i + 1] == 'x' && checkBoard[j + 1][i + 1] == 'x') {
//               countVerticalxLast += checkBoard[j][i + 1];
//             }
//             if (checkBoard[j][i + 1] == 'o' && checkBoard[j][i + 1] == 'o') {
//               countVerticaloLast += checkBoard[j][i + 1];
//             }
//           }
//         }
//         if (
//           countVerticalx == 'x'.repeat(rpt) ||
//           countHorizontalx == 'x'.repeat(rpt) ||
//           countHorizontalxLast == 'x'.repeat(rpt) ||
//           countVerticalxLast == 'x'.repeat(rpt)
//         ) {
//           winner('X');
//           pointX += 1;
//           score(pointX, pointO, 1);
//           break;
//         } else if (
//           countVerticalo == 'o'.repeat(rpt) ||
//           countHorizontalo == 'o'.repeat(rpt) ||
//           countVerticaloLast == 'o'.repeat(rpt) ||
//           countHorizontaloLast == 'o'.repeat(rpt)
//         ) {
//           winner('O');
//           pointO += 1;
//           score(pointX, pointO, 1);
//           break;
//         }
//       }
//     }
//   }

//   function tieGame() {
//     let indication = 0;
//     for (let i = 0; i <= n - 1; i++) {
//       for (let j = 0; j <= n - 1; j++) {
//         if (checkBoard[i][j] == 0) {
//           indication += 1;
//         }
//       }
//     }
//     if (indication > 0) {
//       return false;
//     } else return true;
//   }

//   function drawing(event) {
//     //mouse position
//     const rect = canvas.getBoundingClientRect();
//     //translate X and Y cordinate into new system
//     const obj = {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     };
//     for (let i = 0; i <= n - 1; i++) {
//       for (let j = 0; j <= n - 1; j++) {
//         if (
//           obj.x < boardGame[i][j].right &&
//           obj.x > boardGame[i][j].left &&
//           obj.y < boardGame[i][j].bottom &&
//           obj.y > boardGame[i][j].top &&
//           checkBoard[i][j] === 0
//         ) {
//           if (q == 1) {
//             drawX(boardGame[i][j]);
//             checkBoard[i][j] = 'x';
//             q = 2;
//           } else if ((q = 2)) {
//             drawO(boardGame[i][j]);
//             checkBoard[i][j] = 'o';
//             q = 1;
//           }
//         }
//       }
//     }
//     checkWinner();
//     if (tieGame()) {
//       winner('Nobody');
//       score(pointX, pointO, 1);
//     }
//   }

//   canvas.addEventListener('mouseup', drawing, false);
// }

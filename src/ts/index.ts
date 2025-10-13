import '../main.css';
import drawBackground from './background';
import BoardGame, { CheckWinnerResultType, DRAW_TEXT, GameScoresType } from './boardGame';
import { CANVAS_SIZE_RATIO } from './constants';
import { playNonN } from './menu';

drawBackground();

// //start page
const gameWrapper = <HTMLElement>document.querySelector('.game-warapper');
const game3 = <HTMLParagraphElement>document.querySelector('#start3on3');
const game5 = <HTMLParagraphElement>document.querySelector('#start5on5');
const gameN = <HTMLParagraphElement>document.querySelector('#startNonN');
const sizeBoardPage = <HTMLDivElement>document.querySelector('.boardSize');
const beginGame = <HTMLElement>document.querySelector('.start-page');
const canvasWrapper = <HTMLElement>document.querySelector('.center-wrapper-parent');
const navButtons = <HTMLDivElement>document.querySelector('.navButtons');
const menuBtn = <HTMLButtonElement>document.querySelector('.menuBtn');
const replayBtn = <HTMLButtonElement>document.querySelector('.replayBtn');
const xParagraph = <HTMLParagraphElement>document.getElementById('scoreX');
const oParagraph = <HTMLParagraphElement>document.getElementById('scoreO');

const canvasGame = <HTMLCanvasElement>document.getElementById('TicTacToe');
const gameCanvasContext = <CanvasRenderingContext2D>canvasGame.getContext('2d');

const gameBoard = new BoardGame(gameCanvasContext);

const gameWrapperObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const { inlineSize, blockSize } = entry.borderBoxSize[0];
    const canvasSize = Math.min(inlineSize, blockSize) * CANVAS_SIZE_RATIO;

    canvasGame.width = canvasSize;
    canvasGame.height = canvasSize;

    gameBoard.drawBoard({ canvasSize });
  });
});

gameWrapperObserver.observe(gameWrapper);

function showGameBoard(dimension: number) {
  beginGame.style.display = 'none';
  sizeBoardPage.style.display = 'none';
  canvasWrapper.style.display = 'block';
  navButtons.style.display = 'block';

  const { clientHeight, clientWidth } = gameWrapper;
  const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

  canvasGame.width = canvasSize;
  canvasGame.height = canvasSize;

  gameBoard.setBoardDimension(dimension);
  gameBoard.resetGameScores();
  updateScores();
  backToMenuHandler();
  replayHandler();

  // TODO: вынести в отдельный метод initializeGame
  gameBoard.drawBoard({ canvasSize });
  gameBoard.initializeBoardSquares(canvasSize);

  canvasGame.addEventListener('mouseup', event => {
    const { whoWin, scores } = gameBoard.makeAMove(event, canvasSize);

    if (whoWin !== null) {
      showWinner(whoWin);
      updateScores(scores);
    }
  });
}

game3.addEventListener('click', () => showGameBoard(3));
game5.addEventListener('click', () => showGameBoard(5));
gameN.addEventListener('click', () => {
  beginGame.style.display = 'none';
  sizeBoardPage.style.display = 'block';

  playNonN(showGameBoard);
});

function replayHandler() {
  replayBtn.addEventListener('click', function () {
    const { clientHeight, clientWidth } = gameWrapper;
    const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

    gameBoard.resetGameScores();
    gameBoard.drawBoard({ canvasSize });
    gameBoard.initializeBoardSquares(canvasSize);

    updateScores();

    const winBox = document.querySelector('.winBox');

    if (winBox) winBox.remove();
  });
}

function backToMenuHandler() {
  menuBtn.addEventListener('click', () => {
    navButtons.style.display = 'none';
    canvasWrapper.style.display = 'none';
    beginGame.style.display = 'block';

    const winBox = document.querySelector('.winBox');

    if (winBox) winBox.remove();
  });
}

function updateScores(scores?: GameScoresType) {
  xParagraph.textContent = `X: ${scores?.X ?? 0}`;
  oParagraph.textContent = `O: ${scores?.O ?? 0}`;
}

const winBox = <HTMLDivElement>document.querySelector('.winBoxWrapper');
const winText = <HTMLParagraphElement>document.querySelector('.winInfoText');
const continueBtn = <HTMLButtonElement>document.querySelector('.continueBtn');

function showWinner(who: CheckWinnerResultType) {
  winBox.style.display = 'block';
  winText.textContent = who === DRAW_TEXT ? who : `${who} wins!`;

  continueBtn.addEventListener('click', () => {
    const { clientHeight, clientWidth } = gameWrapper;
    const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

    gameBoard.drawBoard({ canvasSize });
    gameBoard.initializeBoardSquares(canvasSize);
    winBox.style.display = 'none';
  });
}

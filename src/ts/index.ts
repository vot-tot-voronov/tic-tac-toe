import '../scss/main.scss';
import drawBackground from './background';
import BoardGame, { CheckWinnerResultType, DRAW_TEXT, GameScoresType } from './boardGame';
import { CANVAS_SIZE_RATIO } from './constants';
import { playNonN } from './menu';

drawBackground();

// Start page
const gameWrapper = <HTMLElement>document.querySelector('.game-warapper');
const game3 = <HTMLParagraphElement>document.getElementById('start3on3');
const game5 = <HTMLParagraphElement>document.getElementById('start5on5');
const gameN = <HTMLParagraphElement>document.getElementById('startNonN');
const boardDimension = <HTMLDivElement>document.querySelector('.board-dimension');
const startMenu = <HTMLElement>document.querySelector('.start-menu');
const canvasWrapper = <HTMLElement>document.querySelector('.canvas-wrapper');
const navBar = <HTMLDivElement>document.querySelector('.navigation');
const menuBtn = <HTMLButtonElement>document.getElementById('menu-btn');
const replayBtn = <HTMLButtonElement>document.getElementById('replay-btn');
const xParagraph = <HTMLParagraphElement>document.getElementById('score-X');
const oParagraph = <HTMLParagraphElement>document.getElementById('score-O');

const alertBox = <HTMLDivElement>document.querySelector('.alert-box');
const alerText = <HTMLParagraphElement>document.querySelector('.alert-box__text');
const continueBtn = <HTMLButtonElement>document.getElementById('continue-btn');

const canvasGame = <HTMLCanvasElement>document.getElementById('tic-tac-toe');
const gameCanvasContext = <CanvasRenderingContext2D>canvasGame.getContext('2d');

const gameBoard = new BoardGame(gameCanvasContext);

const gameWrapperObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (canvasWrapper.checkVisibility()) {
      const { inlineSize, blockSize } = entry.borderBoxSize[0];
      const canvasSize = Math.min(inlineSize, blockSize) * CANVAS_SIZE_RATIO;

      canvasGame.width = canvasSize;
      canvasGame.height = canvasSize;

      gameBoard.drawBoard({ canvasSize });
      gameBoard.recalculateBoardGame();
    }
  });
});

gameWrapperObserver.observe(gameWrapper);

function makeAMoveEventListener(event: MouseEvent) {
  const { whoWin, scores } = gameBoard.makeAMove(event);

  if (whoWin !== null) {
    canvasGame.removeEventListener('mouseup', makeAMoveEventListener); // Remove the event listener when the game ends

    showWinner(whoWin);
    updateScores(scores);
  }
}

function showGameBoard(dimension: number) {
  startMenu.style.display = 'none';
  boardDimension.style.display = 'none';
  canvasWrapper.style.display = 'block';
  navBar.style.display = 'flex';

  const { clientHeight, clientWidth } = gameWrapper;
  const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

  canvasGame.width = canvasSize;
  canvasGame.height = canvasSize;

  gameBoard.setBoardDimension(dimension);
  gameBoard.resetGameScores();
  updateScores();
  backToMenuHandler();
  replayHandler();

  gameBoard.drawBoard({ canvasSize });
  gameBoard.initializeBoardSquares();

  canvasGame.addEventListener('mouseup', makeAMoveEventListener);
}

game3.addEventListener('click', () => showGameBoard(3));
game5.addEventListener('click', () => showGameBoard(5));
gameN.addEventListener('click', () => {
  startMenu.style.display = 'none';
  boardDimension.style.display = 'block';

  playNonN(showGameBoard);
});

function replayHandler() {
  replayBtn.addEventListener('click', function () {
    const { clientHeight, clientWidth } = gameWrapper;
    const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

    gameBoard.resetGameScores();
    gameBoard.drawBoard({ canvasSize });
    gameBoard.initializeBoardSquares();

    updateScores();

    alertBox.style.display = 'none';
    canvasGame.addEventListener('mouseup', makeAMoveEventListener);
  });
}

function backToMenuHandler() {
  menuBtn.addEventListener('click', () => {
    navBar.style.display = 'none';
    canvasWrapper.style.display = 'none';
    startMenu.style.display = 'flex';
    alertBox.style.display = 'none';
  });
  canvasGame.removeEventListener('mouseup', makeAMoveEventListener);
}

function updateScores(scores?: GameScoresType) {
  xParagraph.textContent = `X: ${scores?.X ?? 0}`;
  oParagraph.textContent = `O: ${scores?.O ?? 0}`;
}

function showWinner(who: CheckWinnerResultType) {
  alertBox.style.display = 'block';
  alerText.textContent = who === DRAW_TEXT ? who : `${who} wins!`;

  continueBtn.addEventListener(
    'click',
    () => {
      const { clientHeight, clientWidth } = gameWrapper;
      const canvasSize = Math.min(clientWidth, clientHeight) * CANVAS_SIZE_RATIO;

      gameBoard.drawBoard({ canvasSize });
      gameBoard.initializeBoardSquares();
      canvasGame.addEventListener('mouseup', makeAMoveEventListener);
      alertBox.style.display = 'none';
    },
    { once: true },
  );
}

import { CheckBoardValuesType, GameboardArrayType, IDrawBoardProps, IGameboardCell } from './types';

class BoardGame {
  private canvasContext: CanvasRenderingContext2D;
  boardGame: Array<GameboardArrayType> = [];
  checkBoard: Array<CheckBoardValuesType> = [];
  private currentPlayer: 'x' | 'o' = 'x';

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
  }

  drawBoard(props: IDrawBoardProps): void {
    const { canvasSize, boardDimension, lineWidth = 7, lineStyle = 'yellow' } = props;

    const lineStart = 4;
    const lineLenght = canvasSize - 5;
    const cell = canvasSize / boardDimension;

    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.strokeStyle = lineStyle;
    this.canvasContext.lineCap = 'round';
    this.canvasContext.beginPath();
    //horizontal lines
    for (let y = 1; y <= boardDimension - 1; y++) {
      this.canvasContext.moveTo(lineStart, y * cell);
      this.canvasContext.lineTo(lineLenght, y * cell);
    }
    //vertical lines
    for (let x = 1; x <= boardDimension - 1; x++) {
      this.canvasContext.moveTo(x * cell, lineStart);
      this.canvasContext.lineTo(x * cell, lineLenght);
    }
    this.canvasContext.stroke();
  }

  initializeBoardSquares(canvasSize: number, boardDimension: number): void {
    const cell = canvasSize / boardDimension;

    for (let i = 0; i <= boardDimension - 1; i++) {
      this.boardGame[i] = [];
      this.checkBoard[i] = [];
      for (let j = 0; j <= boardDimension - 1; j++) {
        this.boardGame[i][j] = {
          left: Math.round(cell * j),
          top: Math.round(cell * i),
          right: Math.round(cell + cell * j),
          bottom: Math.round(cell + cell * i),
        };
        this.checkBoard[i][j] = 0;
      }
    }
  }

  private drawX(currentCell: IGameboardCell, boardDimension: number): void {
    let denominator = boardDimension;
    if (boardDimension <= 4) {
      this.canvasContext.lineWidth = 7;
    }
    if (boardDimension > 4 && boardDimension <= 7) {
      this.canvasContext.lineWidth = 6;
    }
    if (boardDimension > 7 && boardDimension <= 10) {
      this.canvasContext.lineWidth = 4;
    }
    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = 'red';
    this.canvasContext.beginPath();
    if (boardDimension > 7 && boardDimension <= 10) {
      denominator = 7;
    }
    this.canvasContext.moveTo(currentCell.left + 50 / denominator, currentCell.top + 50 / denominator);
    this.canvasContext.lineTo(currentCell.right - 50 / denominator, currentCell.bottom - 50 / denominator);
    this.canvasContext.moveTo(currentCell.right - 50 / denominator, currentCell.top + 50 / denominator);
    this.canvasContext.lineTo(currentCell.left + 50 / denominator, currentCell.bottom - 50 / denominator);
    this.canvasContext.stroke();
  }

  private drawO(currentCell: IGameboardCell, boardDimension: number, canvasSize: number): void {
    const cell = canvasSize / boardDimension;

    if (boardDimension <= 4) {
      this.canvasContext.lineWidth = 7;
    }
    if (boardDimension > 4 && boardDimension <= 7) {
      this.canvasContext.lineWidth = 6;
    }
    if (boardDimension > 7 && boardDimension <= 10) {
      this.canvasContext.lineWidth = 4;
    }
    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = '#a1e8f5';
    this.canvasContext.beginPath();

    if (boardDimension <= 7) {
      this.canvasContext.arc(currentCell.left + cell / 2, currentCell.top + cell / 2, cell / 2.5, 0, 2 * Math.PI);
    }
    if (boardDimension > 7 && boardDimension <= 10) {
      this.canvasContext.arc(currentCell.left + cell / 2, currentCell.top + cell / 2, cell / 2.6, 0, 2 * Math.PI);
    }

    this.canvasContext.stroke();
  }

  drawing(event: MouseEvent, rect: DOMRect, boardDimension: number, canvasSize: number): void {
    //mouse position
    //translate X and Y cordinate into new system
    const obj = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    for (let i = 0; i <= boardDimension - 1; i++) {
      for (let j = 0; j <= boardDimension - 1; j++) {
        const { right, left, top, bottom } = this.boardGame[i][j];

        if (obj.x < right && obj.x > left && obj.y < bottom && obj.y > top && this.checkBoard[i][j] === 0) {
          if (this.currentPlayer === 'x') {
            this.drawX(this.boardGame[i][j], boardDimension);

            this.checkBoard[i][j] = 'x';
            this.currentPlayer = 'o';
          } else if (this.currentPlayer === 'o') {
            this.drawO(this.boardGame[i][j], boardDimension, canvasSize);

            this.checkBoard[i][j] = 'o';
            this.currentPlayer = 'x';
          }
        }
      }
    }
  }
}

export default BoardGame;

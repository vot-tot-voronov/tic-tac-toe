import { DRAW_TEXT } from './constants';
import {
  CheckBoardValuesType,
  CheckWinnerResultType,
  GameboardArrayType,
  GameScoresType,
  IDrawBoardProps,
  IGameboardCell,
  IMakeAMoveReturnValue,
  NoWinnerType,
  PlayerType,
} from './types';

const DEFAULT_OFFSET_RATIO = 50; // Cell padding ratio (percentage of cell size)

class BoardGame {
  private canvasContext: CanvasRenderingContext2D;
  private boardGame: Array<GameboardArrayType> = []; // Array containing coordinates of each field
  private checkBoard: Array<CheckBoardValuesType> = []; // Array containing information about occupied cells
  private currentPlayer: PlayerType = 'X';
  private winLength = 3; // Length of the winning chain
  private movesCount = 0; // Move counter for draw determination
  private boardDimension = 3; // Dimensions of the playing area
  // Score
  private gameScores: GameScoresType = {
    X: 0,
    O: 0,
  };

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
  }

  setBoardDimension(boardDimension: number): void {
    this.boardDimension = boardDimension;
  }

  resetGameScores(): void {
    this.gameScores = {
      X: 0,
      O: 0,
    };
  }

  drawBoard(props: IDrawBoardProps): void {
    const { lineWidth = 7, lineStyle = 'yellow' } = props;
    const rect = this.canvasContext.canvas.getBoundingClientRect();
    const canvasSize = rect.right - rect.left;

    const lineStart = 4;
    const lineLenght = canvasSize - 5;
    const cell = canvasSize / this.boardDimension;

    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.strokeStyle = lineStyle;
    this.canvasContext.lineCap = 'round';
    this.canvasContext.beginPath();
    // Horizontal lines
    for (let y = 1; y <= this.boardDimension - 1; y++) {
      this.canvasContext.moveTo(lineStart, y * cell);
      this.canvasContext.lineTo(lineLenght, y * cell);
    }
    // Vertical lines
    for (let x = 1; x <= this.boardDimension - 1; x++) {
      this.canvasContext.moveTo(x * cell, lineStart);
      this.canvasContext.lineTo(x * cell, lineLenght);
    }

    this.canvasContext.stroke();

    // Determine the chain length according to the board size
    if (this.boardDimension < 5) {
      this.winLength = 3;
    }
    if (this.boardDimension == 5) {
      this.winLength = 4;
    }
    if (this.boardDimension > 5) {
      this.winLength = 5;
    }

    this.setLineWidth();
  }

  private setLineWidth(): void {
    switch (true) {
      case this.boardDimension <= 4:
        this.canvasContext.lineWidth = 7;
        break;
      case this.boardDimension > 4 && this.boardDimension <= 7:
        this.canvasContext.lineWidth = 6;
        break;
      default:
        this.canvasContext.lineWidth = 4;
        break;
    }
  }

  private getBoardSizes(): [number, number] {
    const rect = this.canvasContext.canvas.getBoundingClientRect();
    const canvasSize = rect.right - rect.left;
    const cellWidth = canvasSize / this.boardDimension;

    return [cellWidth, canvasSize];
  }

  // boardGame and checkBoard arrays initialization
  initializeBoardSquares(): void {
    const [cellWidth] = this.getBoardSizes();
    this.movesCount = 0;

    for (let i = 0; i <= this.boardDimension - 1; i++) {
      this.boardGame[i] = [];
      this.checkBoard[i] = [];
      for (let j = 0; j <= this.boardDimension - 1; j++) {
        this.boardGame[i][j] = {
          left: Math.round(cellWidth * j),
          top: Math.round(cellWidth * i),
          right: Math.round(cellWidth + cellWidth * j),
          bottom: Math.round(cellWidth + cellWidth * i),
        };
        this.checkBoard[i][j] = null;
      }
    }
  }

  // Method for redrawing the game board based on checkBoard array
  recalculateBoardGame(): void {
    const [cellWidth, canvasSize] = this.getBoardSizes();

    for (let i = 0; i <= this.boardDimension - 1; i++) {
      this.boardGame[i] = [];
      for (let j = 0; j <= this.boardDimension - 1; j++) {
        const cellCoordinate = {
          left: Math.round(cellWidth * j),
          top: Math.round(cellWidth * i),
          right: Math.round(cellWidth + cellWidth * j),
          bottom: Math.round(cellWidth + cellWidth * i),
        };
        this.boardGame[i][j] = cellCoordinate;

        const currentCell = this.checkBoard[i][j];
        if (currentCell !== null) {
          if (currentCell === 'O') {
            this.drawO(cellCoordinate, canvasSize);
          } else {
            this.drawX(cellCoordinate);
          }
        }
      }
    }
  }

  private drawX(currentCell: IGameboardCell): void {
    let denominator = this.boardDimension;

    if (denominator > 7 && denominator <= 10) {
      denominator = 7;
    }

    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = 'red';
    this.canvasContext.beginPath();

    this.canvasContext.moveTo(
      currentCell.left + DEFAULT_OFFSET_RATIO / denominator,
      currentCell.top + DEFAULT_OFFSET_RATIO / denominator,
    );
    this.canvasContext.lineTo(
      currentCell.right - DEFAULT_OFFSET_RATIO / denominator,
      currentCell.bottom - DEFAULT_OFFSET_RATIO / denominator,
    );
    this.canvasContext.moveTo(
      currentCell.right - DEFAULT_OFFSET_RATIO / denominator,
      currentCell.top + DEFAULT_OFFSET_RATIO / denominator,
    );
    this.canvasContext.lineTo(
      currentCell.left + DEFAULT_OFFSET_RATIO / denominator,
      currentCell.bottom - DEFAULT_OFFSET_RATIO / denominator,
    );
    this.canvasContext.stroke();
  }

  private drawO(currentCell: IGameboardCell, canvasSize: number): void {
    const cell = canvasSize / this.boardDimension;
    const centerX = currentCell.left + cell / 2; // Computing the center of a circle
    const centerY = currentCell.top + cell / 2; // Computing the center of a circle

    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = '#a1e8f5';
    this.canvasContext.beginPath();

    if (this.boardDimension <= 7) {
      this.canvasContext.arc(centerX, centerY, cell / 2.5, 0, 2 * Math.PI);
    }
    if (this.boardDimension > 7 && this.boardDimension <= 10) {
      this.canvasContext.arc(centerX, centerY, cell / 2.6, 0, 2 * Math.PI);
    }

    this.canvasContext.stroke();
  }

  private checkDraw(maxMoves: number): NoWinnerType {
    if (this.movesCount === maxMoves) {
      return DRAW_TEXT;
    }

    return null;
  }

  private checkWinnerFromLastMove(
    checkBoard: Array<CheckBoardValuesType>,
    lastMove: { row: number; col: number },
  ): CheckWinnerResultType {
    const { row, col } = lastMove;
    const player = checkBoard[row][col];

    // Horizontal direction check
    if (this.checkDirection(checkBoard, row, col, 0, 1)) return player;
    if (this.checkDirection(checkBoard, row, col, 0, -1)) return player;

    // Проверка вертикального направления
    if (this.checkDirection(checkBoard, row, col, 1, 0)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 0)) return player;

    // Main diagonal check (from top‑left to bottom‑right)
    if (this.checkDirection(checkBoard, row, col, 1, 1)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, -1)) return player;

    // Anti‑diagonal check (from top‑right to bottom‑left)
    if (this.checkDirection(checkBoard, row, col, 1, -1)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 1)) return player;

    return this.checkDraw(Math.pow(this.boardDimension, 2)); // Check for a draw and return the result
  }

  // Checks one direction from the specified cell
  private checkDirection(
    board: Array<CheckBoardValuesType>,
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number,
  ): boolean {
    const player = board[startRow][startCol];
    let consecutiveCount = 1; // Begin counting at the current cell

    // Move forward in the specified direction
    for (let step = 1; step < this.winLength; step++) {
      const nextRow = startRow + step * deltaRow;
      const nextCol = startCol + step * deltaCol;
      if (nextRow < 0 || nextRow >= this.boardDimension || nextCol < 0 || nextCol >= this.boardDimension) break;
      if (board[nextRow][nextCol] !== player) break;
      consecutiveCount++;
    }

    // Move in the opposite direction
    for (let step = 1; step < this.winLength; step++) {
      const prevRow = startRow - step * deltaRow;
      const prevCol = startCol - step * deltaCol;
      if (prevRow < 0 || prevRow >= this.boardDimension || prevCol < 0 || prevCol >= this.boardDimension) break;
      if (board[prevRow][prevCol] !== player) break;
      consecutiveCount++;
    }

    return consecutiveCount >= this.winLength;
  }

  makeAMove(event: MouseEvent): IMakeAMoveReturnValue {
    // Determine the cursor coordinates relative to the board
    const rect = this.canvasContext.canvas.getBoundingClientRect();
    const canvasSize = rect.right - rect.left;

    const mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // Calculate the row and column numbers
    const cellWidth = canvasSize / this.boardDimension;
    const rowIndex = Math.floor(mousePosition.y / cellWidth);
    const colIndex = Math.floor(mousePosition.x / cellWidth);

    // Check if the selected cell is within bounds and unoccupied
    if (
      rowIndex >= 0 &&
      rowIndex < this.boardDimension &&
      colIndex >= 0 &&
      colIndex < this.boardDimension &&
      this.checkBoard[rowIndex][colIndex] === null
    ) {
      this.movesCount++; // Increase the move count

      // Set the piece and update the active player
      if (this.currentPlayer === 'X') {
        this.drawX(this.boardGame[rowIndex][colIndex]);
        this.checkBoard[rowIndex][colIndex] = 'X';
        this.currentPlayer = 'O';
      } else if (this.currentPlayer === 'O') {
        this.drawO(this.boardGame[rowIndex][colIndex], canvasSize);
        this.checkBoard[rowIndex][colIndex] = 'O';
        this.currentPlayer = 'X';
      }

      const result = this.checkWinnerFromLastMove(this.checkBoard, { row: rowIndex, col: colIndex });

      // Increase the winner’s score
      if (result === 'X' || result === 'O') {
        this.gameScores[result]++;
      }

      return {
        whoWin: result,
        scores: this.gameScores,
      };
    }

    return {
      whoWin: null,
      scores: this.gameScores,
    };
  }
}

export default BoardGame;

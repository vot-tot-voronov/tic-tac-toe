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

const DEFAULT_OFFSET_RATIO = 50; // значение отступа внутри клетки

class BoardGame {
  private canvasContext: CanvasRenderingContext2D;
  private boardGame: Array<GameboardArrayType> = [];
  private checkBoard: Array<CheckBoardValuesType> = [];
  private currentPlayer: PlayerType = 'X';
  private winLength = 3; // Длина цепочки для победы
  private movesCount = 0; // Счётчик ходов для определения ничьей
  private boardDimension = 3; // Размерность поля
  // Количество очков
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
    const { canvasSize, lineWidth = 7, lineStyle = 'yellow' } = props;

    const lineStart = 4;
    const lineLenght = canvasSize - 5;
    const cell = canvasSize / this.boardDimension;

    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.strokeStyle = lineStyle;
    this.canvasContext.lineCap = 'round';
    this.canvasContext.beginPath();
    // Горизонтальные линии
    for (let y = 1; y <= this.boardDimension - 1; y++) {
      this.canvasContext.moveTo(lineStart, y * cell);
      this.canvasContext.lineTo(lineLenght, y * cell);
    }
    // Вериткальные линии
    for (let x = 1; x <= this.boardDimension - 1; x++) {
      this.canvasContext.moveTo(x * cell, lineStart);
      this.canvasContext.lineTo(x * cell, lineLenght);
    }

    this.canvasContext.stroke();

    // Устанавливаем длину цепочки в зависимости от размерности доски
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

  initializeBoardSquares(canvasSize: number): void {
    const cell = canvasSize / this.boardDimension;
    this.movesCount = 0;

    for (let i = 0; i <= this.boardDimension - 1; i++) {
      this.boardGame[i] = [];
      this.checkBoard[i] = [];
      for (let j = 0; j <= this.boardDimension - 1; j++) {
        this.boardGame[i][j] = {
          left: Math.round(cell * j),
          top: Math.round(cell * i),
          right: Math.round(cell + cell * j),
          bottom: Math.round(cell + cell * i),
        };
        this.checkBoard[i][j] = null;
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
    const centerX = currentCell.left + cell / 2; // Расчёт центра окружности
    const centerY = currentCell.top + cell / 2; // Расчёт центра окружности

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

    // Проверка горизонтального направления
    if (this.checkDirection(checkBoard, row, col, 0, 1)) return player;
    if (this.checkDirection(checkBoard, row, col, 0, -1)) return player;

    // Проверка вертикального направления
    if (this.checkDirection(checkBoard, row, col, 1, 0)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 0)) return player;

    // Проверка главной диагонали (слева вверху → вправо вниз)
    if (this.checkDirection(checkBoard, row, col, 1, 1)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, -1)) return player;

    // Проверка обратной диагонали (справа вверху → влево вниз)
    if (this.checkDirection(checkBoard, row, col, 1, -1)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 1)) return player;

    return this.checkDraw(Math.pow(this.boardDimension, 2)); // Проверка на ничью и возврат результата
  }

  /**
   * Проверяет одно направление от указанной клетки
   */
  private checkDirection(
    board: Array<CheckBoardValuesType>,
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number,
  ): boolean {
    const player = board[startRow][startCol];
    let consecutiveCount = 1; // Начинаем считать с текущей клетки

    // Идём вперёд по указанному направлению
    for (let step = 1; step < this.winLength; step++) {
      const nextRow = startRow + step * deltaRow;
      const nextCol = startCol + step * deltaCol;
      if (nextRow < 0 || nextRow >= this.boardDimension || nextCol < 0 || nextCol >= this.boardDimension) break;
      if (board[nextRow][nextCol] !== player) break;
      consecutiveCount++;
    }

    // Проходим по противоположному направлению
    for (let step = 1; step < this.winLength; step++) {
      const prevRow = startRow - step * deltaRow;
      const prevCol = startCol - step * deltaCol;
      if (prevRow < 0 || prevRow >= this.boardDimension || prevCol < 0 || prevCol >= this.boardDimension) break;
      if (board[prevRow][prevCol] !== player) break;
      consecutiveCount++;
    }

    return consecutiveCount >= this.winLength;
  }

  makeAMove(event: MouseEvent, canvasSize: number): IMakeAMoveReturnValue {
    // Определяем координаты курсора относительно доски
    const rect = this.canvasContext.canvas.getBoundingClientRect();

    const mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // Высчитываем номер строки и столбца
    const cellWidth = canvasSize / this.boardDimension;
    const rowIndex = Math.floor(mousePosition.y / cellWidth);
    const colIndex = Math.floor(mousePosition.x / cellWidth);

    // Проверяем, находится ли выбранная клетка в пределах поля и свободна ли она
    if (
      rowIndex >= 0 &&
      rowIndex < this.boardDimension &&
      colIndex >= 0 &&
      colIndex < this.boardDimension &&
      this.checkBoard[rowIndex][colIndex] === null
    ) {
      this.movesCount++; // Увеличение счётчика ходов

      // Ставим фигуру и меняем активного игрока
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

      // Увеличиваем количество очков у победителя
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

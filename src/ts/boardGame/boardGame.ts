import {
  CheckBoardValuesType,
  CheckWinnerResultType,
  GameboardArrayType,
  IDrawBoardProps,
  IGameboardCell,
  NoWinnerType,
  PlayerType,
} from './types';

const DEFAULT_OFFSET_RATIO = 50; // значение отступа внутри клетки, перед рисованием фигуры

class BoardGame {
  private canvasContext: CanvasRenderingContext2D;
  private boardGame: Array<GameboardArrayType> = [];
  private checkBoard: Array<CheckBoardValuesType> = [];
  private currentPlayer: PlayerType = 'X';
  private winLength = 3; // Длина цепочки для победы
  private movesCount = 0; // Счётчик ходов для определения ничьей

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
    // Горизонтальные линии
    for (let y = 1; y <= boardDimension - 1; y++) {
      this.canvasContext.moveTo(lineStart, y * cell);
      this.canvasContext.lineTo(lineLenght, y * cell);
    }
    // Вериткальные линии
    for (let x = 1; x <= boardDimension - 1; x++) {
      this.canvasContext.moveTo(x * cell, lineStart);
      this.canvasContext.lineTo(x * cell, lineLenght);
    }
    this.canvasContext.stroke();
  }

  private setLineWidth(boardDimension: number): void {
    switch (true) {
      case boardDimension <= 4:
        this.canvasContext.lineWidth = 7;
        break;
      case boardDimension > 4 && boardDimension <= 7:
        this.canvasContext.lineWidth = 6;
        break;
      default:
        this.canvasContext.lineWidth = 4;
        break;
    }
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
        this.checkBoard[i][j] = null;
      }
    }

    // Устанавливаем длину цепочки в зависимости от размерности доски
    if (boardDimension < 5) {
      this.winLength = 3;
    }
    if (boardDimension == 5) {
      this.winLength = 4;
    }
    if (boardDimension > 5) {
      this.winLength = 5;
    }

    this.setLineWidth(boardDimension);
  }

  private drawX(currentCell: IGameboardCell, boardDimension: number): void {
    let denominator = boardDimension;

    if (boardDimension > 7 && boardDimension <= 10) {
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

  private drawO(currentCell: IGameboardCell, boardDimension: number, canvasSize: number): void {
    const cell = canvasSize / boardDimension;
    const centerX = currentCell.left + cell / 2; // Расчёт центра окружности
    const centerY = currentCell.top + cell / 2; // Расчёт центра окружности

    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = '#a1e8f5';
    this.canvasContext.beginPath();

    if (boardDimension <= 7) {
      this.canvasContext.arc(centerX, centerY, cell / 2.5, 0, 2 * Math.PI);
    }
    if (boardDimension > 7 && boardDimension <= 10) {
      this.canvasContext.arc(centerX, centerY, cell / 2.6, 0, 2 * Math.PI);
    }

    this.canvasContext.stroke();
  }

  private checkDraw(maxMoves: number): NoWinnerType {
    if (this.movesCount === maxMoves) {
      return 'DRAW';
    }

    return null;
  }

  private checkWinnerFromLastMove(
    checkBoard: Array<CheckBoardValuesType>,
    lastMove: { row: number; col: number },
    boardDimension: number,
  ): CheckWinnerResultType {
    const { row, col } = lastMove;
    const player = checkBoard[row][col];

    // Проверка горизонтального направления
    if (this.checkDirection(checkBoard, row, col, 0, 1, boardDimension)) return player;
    if (this.checkDirection(checkBoard, row, col, 0, -1, boardDimension)) return player;

    // Проверка вертикального направления
    if (this.checkDirection(checkBoard, row, col, 1, 0, boardDimension)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 0, boardDimension)) return player;

    // Проверка главной диагонали (слева вверху → вправо вниз)
    if (this.checkDirection(checkBoard, row, col, 1, 1, boardDimension)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, -1, boardDimension)) return player;

    // Проверка обратной диагонали (справа вверху → влево вниз)
    if (this.checkDirection(checkBoard, row, col, 1, -1, boardDimension)) return player;
    if (this.checkDirection(checkBoard, row, col, -1, 1, boardDimension)) return player;

    return this.checkDraw(Math.pow(boardDimension, 2)); // Проверка на ничью и возврат результата
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
    boardDimension: number,
  ): boolean {
    const player = board[startRow][startCol];
    let consecutiveCount = 1; // Начинаем считать с текущей клетки

    // Идём вперёд по указанному направлению
    for (let step = 1; step < this.winLength; step++) {
      const nextRow = startRow + step * deltaRow;
      const nextCol = startCol + step * deltaCol;
      if (nextRow < 0 || nextRow >= boardDimension || nextCol < 0 || nextCol >= boardDimension) break;
      if (board[nextRow][nextCol] !== player) break;
      consecutiveCount++;
    }

    // Возвращаемся назад по противоположному направлению
    for (let step = 1; step < this.winLength; step++) {
      const prevRow = startRow - step * deltaRow;
      const prevCol = startCol - step * deltaCol;
      if (prevRow < 0 || prevRow >= boardDimension || prevCol < 0 || prevCol >= boardDimension) break;
      if (board[prevRow][prevCol] !== player) break;
      consecutiveCount++;
    }

    return consecutiveCount >= this.winLength;
  }

  makeAMove(event: MouseEvent, rect: DOMRect, boardDimension: number, canvasSize: number): CheckWinnerResultType {
    // Определяем координаты курсора относительно доски
    const mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // Высчитываем номер строки и столбца
    const cellWidth = canvasSize / boardDimension;
    const rowIndex = Math.floor(mousePosition.y / cellWidth);
    const colIndex = Math.floor(mousePosition.x / cellWidth);

    // Проверяем, находится ли выбранная клетка в пределах поля и свободна ли она
    if (
      rowIndex >= 0 &&
      rowIndex < boardDimension &&
      colIndex >= 0 &&
      colIndex < boardDimension &&
      this.checkBoard[rowIndex][colIndex] === null
    ) {
      this.movesCount++; // Увеличение счётчика ходов

      // Ставим фигуру и меняем активного игрока
      if (this.currentPlayer === 'X') {
        this.drawX(this.boardGame[rowIndex][colIndex], boardDimension);
        this.checkBoard[rowIndex][colIndex] = 'X';
        this.currentPlayer = 'O';
      } else if (this.currentPlayer === 'O') {
        this.drawO(this.boardGame[rowIndex][colIndex], boardDimension, canvasSize);
        this.checkBoard[rowIndex][colIndex] = 'O';
        this.currentPlayer = 'X';
      }

      return this.checkWinnerFromLastMove(this.checkBoard, { row: rowIndex, col: colIndex }, boardDimension);
    }

    return null;
  }
}

export default BoardGame;

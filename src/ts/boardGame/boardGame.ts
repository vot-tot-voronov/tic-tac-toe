import { IDrawBoardProps } from './types';

class BoardGame {
  private canvasContext: CanvasRenderingContext2D;

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
}

export default BoardGame;

import { Ball, Cross } from '../figures';

export interface IAnimateFiguresProps {
  canvasContext: CanvasRenderingContext2D;
  balls: Array<Ball>;
  crosses: Array<Cross>;
}

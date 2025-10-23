import { DRAW_TEXT } from './constants';

export interface IDrawBoardProps {
  canvasSize: number;
  lineWidth?: number;
  lineStyle?: string;
}

export interface IGameboardCell {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type GameboardArrayType = Array<IGameboardCell>;

export type NoWinnerType = typeof DRAW_TEXT | null;
export type PlayerType = 'X' | 'O';
export type CheckBoardValueType = PlayerType | null;

export type CheckBoardValuesType = Array<CheckBoardValueType>;

export type CheckWinnerResultType = CheckBoardValueType | NoWinnerType;

export type GameScoresType = Record<PlayerType, number>;

export interface IMakeAMoveReturnValue {
  whoWin: CheckWinnerResultType;
  scores: GameScoresType;
}

export interface IDrawBoardProps {
  canvasSize: number;
  boardDimension: number;
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

export type NoWinnerType = 'DRAW' | null;
export type PlayerType = 'X' | 'O';
export type CheckBoardValueType = PlayerType | null;

export type CheckBoardValuesType = Array<CheckBoardValueType>;

export type CheckWinnerResultType = CheckBoardValueType | NoWinnerType;

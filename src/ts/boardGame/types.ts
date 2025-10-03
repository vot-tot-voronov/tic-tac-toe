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

type CheckBoardValueType = 'x' | 'o' | 0;

export type CheckBoardValuesType = Array<CheckBoardValueType>;

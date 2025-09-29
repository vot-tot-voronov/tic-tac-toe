import { Configuration } from 'webpack';

export interface IPaths {
  entry: string;
  output: string;
  src: string;
  html: string;
}

export interface IWebpackConfigProps extends Pick<Configuration, 'mode'> {
  paths: IPaths;
}

export type EnvValuesType = Pick<Configuration, 'mode'>;

export interface IBuildLoadersProps {
  isDevMode: boolean;
}

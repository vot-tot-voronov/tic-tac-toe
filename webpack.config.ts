import webpackConfigFactory, { EnvValuesType, IWebpackConfigProps } from './config';
import path from 'path';

const config = (env: EnvValuesType) => {
  const webpackConfigProps: IWebpackConfigProps = {
    mode: env.mode,
    paths: {
      entry: path.resolve(__dirname, 'src', 'ts', 'index.ts'),
      src: path.resolve(__dirname, 'src'),
      output: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
    },
  };

  return webpackConfigFactory({ ...webpackConfigProps });
};

export default config;

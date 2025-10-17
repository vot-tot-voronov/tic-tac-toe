import { Configuration } from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { IWebpackConfigProps } from './interfaces';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildDevServer from './buildDevServer';

function webpackConfigFactory({ paths, mode }: IWebpackConfigProps): Configuration {
  const { entry, output, src, html } = paths;
  const isDevMode = mode === 'development';

  return {
    mode,
    entry,
    output: {
      path: output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: buildLoaders({ isDevMode }),
    },
    plugins: buildPlugins({ htmlPath: html, isDevMode }),
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      preferAbsolute: true,
      modules: [src, 'node_modules'],
      mainFiles: ['index'],
    },
    devServer: isDevMode ? buildDevServer() : undefined,
    devtool: isDevMode ? 'inline-source-map' : undefined,
  };
}

export default webpackConfigFactory;

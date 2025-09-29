import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IBuildPluginsProps } from './types';
import { WebpackPluginInstance } from 'webpack';

function buildPlugins({ isDevMode, htmlPath }: IBuildPluginsProps) {
  const plugins: Array<WebpackPluginInstance> = [
    new HtmlWebpackPlugin({
      title: 'Tic-Tac-Toe',
      template: htmlPath,
    }),
  ];

  if (!isDevMode) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }

  return [...plugins];
}

export default buildPlugins;

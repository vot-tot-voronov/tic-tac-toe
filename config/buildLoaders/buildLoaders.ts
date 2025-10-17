import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IBuildLoadersProps } from '../interfaces';

function buildLoaders({ isDevMode }: IBuildLoadersProps) {
  return [
    {
      test: /\.(sa|sc|c)ss$/i,
      use: [
        isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    },
    { test: /\.ts$/, use: 'ts-loader' },
  ];
}

export default buildLoaders;

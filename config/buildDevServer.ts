import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

function buildDevServer(): DevServerConfiguration {
  return {
    port: 8000,
    hot: true,
    historyApiFallback: true,
    open: true,
  };
}

export default buildDevServer;

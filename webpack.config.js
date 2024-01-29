// Generated using webpack-cli https://github.com/webpack/webpack-cli
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const nodeExternals = require('webpack-node-externals');

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: path.join('.', 'app.js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  externals: [nodeExternals()],
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';

    // Add sourcemap for development
    // config.devtool = 'source-map';

    // Run server
    const serverRunnerPlugin = new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run start:dev'],
        parallel: true,
      },
    });

    config.plugins.push(serverRunnerPlugin);
  }
  return config;
};

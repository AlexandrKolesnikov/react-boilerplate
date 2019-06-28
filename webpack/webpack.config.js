const path = require('path');
const webpack = require('webpack');
const { generateConfig: generateBasicConfig, moduleRules } = require('./constants');

const BUILD_DIR = 'dist';
const DEV_SERVER_HOST = '127.0.0.1';
const DEV_SERVER_PORT = '3000';

const generateConfig = env => {
  const basicConfig = generateBasicConfig(env);

  return {
    ...basicConfig,
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      ...basicConfig.entry,
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      host: DEV_SERVER_HOST,
      contentBase: path.resolve(__dirname, BUILD_DIR),
      publicPath: `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      public: `${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      open: 'Chrome',
      port: DEV_SERVER_PORT,
    },
    module: {
      rules: [
        ...basicConfig.module.rules,
        {
          ...moduleRules.cssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.cssLoader.use,
          ],
        },
        {
          ...moduleRules.scssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.scssLoader.use,
          ],
        },
      ],
    },

    plugins: [
      ...basicConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

module.exports = env => generateConfig(env);

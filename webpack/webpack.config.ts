import path from 'path';
import webpack from 'webpack';
import { generateConfig as generateBasicConfig, moduleRules } from './constants';
import { IEnvironment } from './types';

const BUILD_DIR = 'dist';
const DEV_SERVER_HOST = '127.0.0.1';
const DEV_SERVER_PORT = 3000;

export default (env: IEnvironment): webpack.Configuration => {
  const basicConfig = generateBasicConfig(env) || {};
  const { module: basicConfigModule = {} as webpack.Module } = basicConfig;

  const entry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
    'webpack/hot/only-dev-server',
  ];

  if (Array.isArray(basicConfig.entry)) {
    entry.push(...basicConfig.entry);
  }

  return {
    ...basicConfig,
    mode: 'development',
    devtool: 'eval-source-map',
    entry,
    devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      host: DEV_SERVER_HOST,
      contentBase: path.resolve(__dirname, BUILD_DIR),
      publicPath: `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      public: `${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
      open: true,
      port: DEV_SERVER_PORT,
    },
    module: {
      rules: [
        ...basicConfigModule.rules,
        {
          ...moduleRules.cssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.cssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
        {
          ...moduleRules.scssLoader,
          use: [
            'css-hot-loader',
            'style-loader',
            ...moduleRules.scssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
      ],
    },

    plugins: [
      ...basicConfig.plugins || [],
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

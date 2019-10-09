import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { generateConfig as generateBasicConfig, moduleRules } from './constants';
import { IEnvironment } from './types';

const generateConfig = (env: IEnvironment) => {
  const basicConfig = generateBasicConfig(env);

  return {
    ...basicConfig,
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        ...basicConfig.module.rules,
        {
          ...moduleRules.cssLoader,
          use: [
            MiniCssExtractPlugin.loader,
            ...moduleRules.cssLoader.use,
          ],
        },
        {
          ...moduleRules.scssLoader,
          use: [
            MiniCssExtractPlugin.loader,
            ...moduleRules.scssLoader.use,
          ],
        },
      ],
    },
    plugins: [
      ...basicConfig.plugins,
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              beautify: false,
            },
          },
        }),
      ],
    },
  };
};

export default (env: IEnvironment) => generateConfig(env);

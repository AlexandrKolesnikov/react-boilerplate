import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { generateConfig as generateBasicConfig, moduleRules } from './constants';
import { IEnvironment } from './types';

export default (env: IEnvironment): webpack.Configuration => {
  const basicConfig = generateBasicConfig(env);
  const { module: basicConfigModule = {} as webpack.Module } = basicConfig;

  return {
    ...basicConfig,
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        ...basicConfigModule.rules,
        {
          ...moduleRules.cssLoader,
          use: [
            MiniCssExtractPlugin.loader,
            ...moduleRules.cssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
        {
          ...moduleRules.scssLoader,
          use: [
            MiniCssExtractPlugin.loader,
            ...moduleRules.scssLoader.use as webpack.RuleSetUseItem[],
          ],
        },
      ],
    },
    plugins: [
      ...basicConfig.plugins || [],
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

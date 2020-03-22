import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
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
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: true,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
      runtimeChunk: {
        name: (entryPoint) => `webpack-runtime-${entryPoint.name}`,
      },
    },
  };
};

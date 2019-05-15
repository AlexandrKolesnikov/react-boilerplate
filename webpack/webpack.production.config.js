const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { generateConfig: generateBasicConfig, moduleRules } = require('./constants');

const generateConfig = (env) => {
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
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
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

module.exports = env => generateConfig(env);

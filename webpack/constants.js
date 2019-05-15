const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const CLI_ENVIRONMENT_VARIABLES = {
  ENVIRONMENT_FILE_NAME: 'ENVIRONMENT_FILE_NAME',
};

const STATIC_DIR = path.resolve(__dirname, '../static');
const SOURCE_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');

const moduleRules = {
  esLoader: {
    enforce: 'pre',
    test: /\.[jt]s|[jt]sx$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  svgLoader: {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
        },
      },
    ],
  },
  fontsLoader: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    ],
  },
  imagesLoader: {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/[ext]',
          name: 'assets/images/[name]_[hash].[ext]',
        },
      },
    ],
  },
  scssLoader: {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: ['last 20 version'],
            }),
          ],
          sourceMap: false,
        },
      },
      {
        loader: 'sass-loader',
        query: {
          sourceMap: false,
        },
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/styles/mixins.scss'),
        },
      },
    ],
  },
  cssLoader: {
    test: /\.css$/,
    use: [
      'css-loader',
    ],
  },
};

const generateConfig = (env) => {
  const environmentFileName = env[CLI_ENVIRONMENT_VARIABLES.ENVIRONMENT_FILE_NAME];
  const environmentFilePath = path.resolve(__dirname, `../environments/${environmentFileName}`);
  const parsedEnvironmentVariables = dotenv.config({ path: environmentFilePath }).parsed;

  return {
    entry: [
      './app.js',
      './styles/app.scss',
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      filename: 'bundle.js',
      path: BUILD_DIR,
      publicPath: '/',
    },
    context: SOURCE_DIR,
    module: {
      rules: [
        moduleRules.esLoader,
        moduleRules.svgLoader,
        moduleRules.fontsLoader,
        moduleRules.imagesLoader,
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        ...process.env,
        ...parsedEnvironmentVariables,
      }),
      new CopyWebpackPlugin([
        { from: STATIC_DIR, to: '' },
        { from: `${SOURCE_DIR}/assets`, to: 'assets' },
      ]),
      new MiniCssExtractPlugin({
        filename: './styles/style.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../static/index.html'),
        filename: 'index.html',
        inject: false,
      }),
    ],
  };
};

module.exports = {
  generateConfig,
  moduleRules,
};

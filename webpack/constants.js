const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const SOURCE_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');

const moduleRules = {
  esLoader: {
    enforce: 'pre',
    test: /\.js|jsx$/,
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

const basicConfig = {
  entry: [
    './app.js',
    './styles/app.scss',
  ],
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
    new CopyWebpackPlugin([
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

module.exports = {
  basicConfig,
  moduleRules,
};

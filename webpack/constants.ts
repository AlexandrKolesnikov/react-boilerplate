import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { IEnvironment } from './types';

const SOURCE_DIR = path.resolve(__dirname, '../src');
const ASSETS_SOURCE_DIR = `${SOURCE_DIR}/assets`;

export const STATIC_DIR = path.resolve(__dirname, '../static');
export const BUILD_DIR = path.resolve(__dirname, '../dist');

export const moduleRules: { [key: string]: webpack.RuleSetRule } = {
  esLoader: {
    test: /\.([tj])sx?$/,
    enforce: 'pre',
    exclude: /node_modules/,
    use: [
      {
        loader: 'eslint-loader',
        options: {
          cache: true,
          emitWarning: true,
        },
      },
      {
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  esSourceMapLoader: {
    test: /\.js$/,
    enforce: 'pre',
    use: [
      {
        loader: 'source-map-loader',
      },
    ],
  },
  svgLoader: {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
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
            autoprefixer(),
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
          resources: path.resolve(SOURCE_DIR, './styles/mixins.scss'),
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

export const generateConfig = (env: IEnvironment): webpack.Configuration => {
  const environmentFileName = env.ENVIRONMENT_FILE_NAME;
  const environmentFilePath = path.resolve(__dirname, `../environments/${environmentFileName}`);
  const parsedEnvironmentVariables = dotenv.config({ path: environmentFilePath }).parsed || {};

  const isProduction = parsedEnvironmentVariables.NODE_ENV === 'production';
  const filesNameHash = isProduction ? '[contenthash:8]' : '[hash]';

  return {
    devtool: 'source-map',
    entry: [
      './index.tsx',
      './styles/app.scss',
    ] as string[],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    output: {
      filename: `js/[name].${filesNameHash}.js`,
      chunkFilename: `js/[name].${filesNameHash}.chunk.js`,
      path: BUILD_DIR,
      publicPath: '/',
    },
    context: SOURCE_DIR,
    module: {
      rules: [
        moduleRules.esLoader,
        moduleRules.esSourceMapLoader,
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
        { from: ASSETS_SOURCE_DIR, to: 'assets' },
      ]),
      new MiniCssExtractPlugin({
        filename: `[name].${filesNameHash}.css`,
        chunkFilename: `[id].${filesNameHash}.css`,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(STATIC_DIR, './index.html'),
        filename: 'index.html',
        inject: true,
        ...(isProduction ? {
          minify: {
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            removeComments: true,
            useShortDoctype: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
          },
        } : {}),
      }),
    ],
  };
};

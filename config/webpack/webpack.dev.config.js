const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('../../paths');
const copy = require('./webpack.common.config');

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.resolveFromRoot('dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },
  devtool: 'eval-cheap-module-source-map',
  entry: paths.resolveFromRoot('src/index.js'),
  resolve: {
    modules: [paths.resolveFromRoot('src'), 'node_modules'],
    fallback: {
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify')
    },
    extensions: ['.js', '.jsx', '.json', '.mjs']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '$env:development;'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[contenthash:8].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[path][name].[contenthash:8].[ext]'
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['babel-loader', '@svgr/webpack', 'url-loader']
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: paths.resolveFromRoot('dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new CopyPlugin({
      patterns: [...copy]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[name].css'
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: paths.resolveFromRoot('src/index.html')
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

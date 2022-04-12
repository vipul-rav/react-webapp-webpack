const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const paths = require('../../paths');
const copy = require('./webpack.common.config');

module.exports = {
  mode: 'production',
  entry: paths.resolveFromRoot('src/index.js'),
  resolve: {
    fallback: {
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify')
    }
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
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
          {
            loader: 'sass-loader',
            options: {
              additionalData: '$env:production;'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name].[contenthash:8].[ext]'
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
    filename: 'js/[name].[contenthash].js',
    path: paths.resolveFromRoot('dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CopyPlugin({
      patterns: [...copy]
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: paths.resolveFromRoot('src/index.html'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new MomentLocalesPlugin(),
    new UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

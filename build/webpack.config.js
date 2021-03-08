const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('../paths');
const copy = require('./webpack.config.copy');

module.exports = {
  mode: 'production',
  entry: paths.resolveFromRoot('src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[path][name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    path: paths.resolveFromRoot('dist')
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new CopyPlugin({
      patterns: [...copy]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
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
    new UglifyJsPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

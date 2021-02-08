const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const paths = require('../paths');
const { presets, plugins } = require('./webpack.config.babel');
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
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[hash:8].[ext]',
                    },
                },
            },
        ],
    },
    output: {
        filename: '[name].[hash].js',
        path: paths.resolveFromRoot('dist'),
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new CopyPlugin({
            patterns: [...copy],
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[name].css',
        }),
        new HTMLWebpackPlugin({
            inject: true,
            template: paths.resolveFromRoot('src/index.html'),
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        }),
        new MomentLocalesPlugin(),
        new UglifyJsPlugin(),
    ],
};

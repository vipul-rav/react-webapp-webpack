const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const paths = require('../paths');
const copy = require('../build/webpack.config.copy');

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: paths.resolveFromRoot('dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    devtool: 'eval-source-map',
    entry: paths.resolveFromRoot('src/index.js'),
    resolve: {
        modules: [paths.resolveFromRoot('src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },
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
                        name: '[path][name].[contenthash:8].[ext]',
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[contenthash:8].[ext]',
                    },
                },
            },
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: paths.resolveFromRoot('dist'),
    },
    plugins: [
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
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],
};

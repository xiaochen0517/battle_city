const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // development  production
    mode: 'development',
    target: "web",
    devtool: 'inline-source-map',
    entry: {
        index: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader',],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@src': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
    ],
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
};
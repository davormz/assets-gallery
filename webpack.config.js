const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions:['.js']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,
        port: 9000,
        // after(app){
        //   console.log('======== after ==========')
        //   console.log(app)
        //   // do fancy stuff
        // },
        // before(app) {
        //   console.log('======== before =========')
        //   console.log(app)
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader'}
            },
            {   
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/public/index.html',
            filename: './index.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/public/login.html',
            filename: './login.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/public/signup.html',
            filename: './signup.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'assets', 'images'),
                    to: 'assets/images'
                },
                {
                    from: path.resolve(__dirname, 'assets', 'icons'),
                    to: 'assets/icons'
                }
            ]
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

}
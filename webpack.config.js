const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|mp3)$/,
                use: [
                    "file-loader"
                ],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_[contenthash].js',
        publicPath: '/',
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new Dotenv()
    ],
    devServer:{
        port: 8000,
        static: {
            directory: path.join(__dirname, './dist'),
        },
        historyApiFallback: true,
    }
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WEBPACK_MODE = process.env.npm_lifecycle_event;


const config = {
    //entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'js', 'index.js')],
    entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.[hash].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader']
            // },
            {
                test: /\.(c|le)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules=true', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src', 'index.html')}),
        new ExtractTextPlugin('main.css'),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src', 'images'),
            to: path.resolve(__dirname, 'public', 'images')
        }])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8888
    },
    mode: 'development'
};

if (WEBPACK_MODE === 'build') {
    config.plugins = [...config.plugins, new UglifyJsPlugin()]
}

module.exports = config;
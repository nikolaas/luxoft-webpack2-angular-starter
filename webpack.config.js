const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const angular = path.resolve('./node_modules', 'angular/angular.js');
const moment = path.resolve('./node_modules', 'moment/min/moment.min.js');

const projectTitle = 'Luxoft Web App Starter';

const PATHS = {
    app: path.resolve(__dirname, 'app'),
    dist: path.resolve(__dirname, 'dist')
};

const jsRule = {
    test: /\.js$/,
    use: [
        { loader: 'babel-loader',
            options: {
                presets: [["es2015", {"modules": false}]],
                plugins: [["angularjs-annotate"]],
                cacheDirectory: true
            }
        }
    ],
    exclude: /node_modules/
};
const esLintRule = {
    test: /\.js$/,
    enforce: 'pre',
    include: /src/,
    use: [
        {loader: 'eslint-loader'}
    ]
};

const userStylesRule = {
    test: /\.(css|styl|stylus)$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!stylus-loader'
    }),
    exclude: /node_modules/
};

const vendorStylesRule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'raw-loader'
    }),
    include: /node_modules/
};

const htmlRule = {
    test: /\.html$/,
    exclude: /index\.html|node_modules/,
    use: [
        {loader: 'raw-loader'}
    ]
};

const fontsRule = {
    test: /\.(png|woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
    include: /app/,
    use: [
        {loader: 'file-loader?name=assets/[name].[ext]'}
    ]
};

module.exports = {
    devtool: '#source-map',
    cache: true,
    context: PATHS.app,
    entry: {
        app: './index.js',
        vendors: ['moment', 'angular']
    },
    output: {
        path: PATHS.dist,
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [jsRule, esLintRule, userStylesRule, vendorStylesRule, htmlRule, fontsRule],
        noParse: /lodash|angular|bootstrap\.min\.css/
    },
    plugins: [
        /*new webpack.LoaderOptionsPlugin({
            options: {

            }
        }),*/
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: 2,
            filename: '[name]-[hash].js'
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: path.resolve(PATHS.app, 'index.html'),
            filename: 'index.html',
            title: projectTitle
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CleanWebpackPlugin(PATHS.dist, {
            root: process.cwd()
        })
    ],
    resolve: {
        alias: {
            'angular': angular,
            'moment': moment
        },
        extensions: ["*", ".js", ".styl"]
    }
};

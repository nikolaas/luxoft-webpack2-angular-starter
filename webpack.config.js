const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const findImports = require('find-imports');

const projectTitle = 'Luxoft Web App Starter';  /*TODO*/
const baseUrl = '/';

const PATHS = {
    src: path.resolve(__dirname, 'src'),
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
        use: 'css-loader!postcss-loader!stylus-loader'
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
    include: PATHS.src,
    use: [
        {loader: 'file-loader?name=assets/[name].[ext]'}
    ]
};

const userInlineStylesRule = {
    test: /\.(css|styl|stylus)$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
    exclude: /node_modules/
};

const vendorInlineStylesRule = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: /node_modules/
};

const common = {
    context: PATHS.src,
    entry: {
        app: './app.js',
        vendors: ['moment', 'angular']
    },
    output: {
        path: PATHS.dist,
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
            jsRule,
            esLintRule,
            htmlRule,
            fontsRule
        ]/*,
        noParse: /lodash|angular|bootstrap\.min\.css/*/
},
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({browsers: ['last 2 versions']})],
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(PATHS.src, 'index.html'),
            filename: 'index.html',
            title: projectTitle,
            baseUrl: baseUrl
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CleanWebpackPlugin(PATHS.dist, {
            root: process.cwd()
        })
    ],
    resolve: {
        unsafeCache: true,
        alias: {

        },
        extensions: ["*", ".js", ".styl"]
    }
};

const build = {
    devtool: '#source-map',
    module: {
        rules: [
            userStylesRule,
            vendorStylesRule
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin("styles.css")
    ]
};

const DEPENDENCIES = findImports([
    'src/**/*.js', '!src/**/*.spec.js', '!src/spec-runner.js'
], {flatten: true});

const extractBundle = (name, deps) => ({
    entry: {
        [name]: deps
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({names: [name], minChunks: Infinity})
    ]
});

const serve = {
    cache: true,
    devtool: '#inline-source-map',
    module: {
        rules: [
            userInlineStylesRule,
            vendorInlineStylesRule
        ]
    }
    /*devServer: {
        port: DEV_PORT,
        historyApiFallback: true,
        stats: 'errors-only',
        host: DEV_HOST,
        hot: true,
        inline: true,
        proxy: {
            [appEnv.backend + '/!*']: {
                target: process.env.BACKEND_URL || 'http://localhost:10080',
                pathRewrite: {
                    [appEnv.backend]: ''
                },
                changeOrigin: true
            }
        }
    },*/
};

/* Should we remove this test config? */
const test = {
    devtool: '#inline-source-map',
    module: {
        rules: [
            userInlineStylesRule,
            vendorInlineStylesRule
        ]
    }
};

let config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, extractBundle('vendors', DEPENDENCIES), build);
        break;
    case 'serve':
        config = merge(common, extractBundle('vendors', DEPENDENCIES), serve);
        break;
    default:
        config = merge(common, test);
        break;
}

module.exports = config;
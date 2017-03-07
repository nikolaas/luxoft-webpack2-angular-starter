'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

/*webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());*/
webpackConfig.devtool = 'inline-source-map';

module.exports = config => {
    config.set({
        files: ['src/spec-runner.js'],
        frameworks: ['mocha'],
        browsers: ['PhantomJS'],
        reporters: ['mocha'],
        webpack: webpackConfig,
        preprocessors: {
            'src/spec-runner.js': ['webpack', 'sourcemap']
        },
        logLevel: config.LOG_ERROR,
        background: true,
        singleRun: false,
        plugins: [
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ]
    });
};
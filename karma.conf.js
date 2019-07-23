const path = require('path')
const pkg = require('./package.json')

/*
    Polyfill to add typed arrays for Mocha in IE9
*/
const typedArrayPolyfill = files => {
    files.unshift({
        pattern: path.resolve('./node_modules/js-polyfills/typedarray.js'),
        included: true,
        served: true,
        watched: false,
    })
    return files
}
typedArrayPolyfill.$inject = ['config.files']

/*
    Web Driver config
*/
const webDriverConfig = {
    hostname: 'hub.lambdatest.com',
    port: 80,
}

/*
    Karma config
*/
module.exports = config => {
    config.set({
        // Base
        basePath: '.',
        files: [
            'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js',
            'tests/lib/toast.min.js',
            'tests/utils.js',
            'tests/tests.base.js',
            'tests/tests.css.js',
            'tests/tests.js.js',
            'tests/tests.all.js',
        ],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        // Karma + Mocha + Chai + Sinon = <3
        frameworks: [
            'mocha',
            'sinon-chai',
            'typedarray-polyfill',
        ],
        plugins: [
            'karma-*',
            {
                'framework:typedarray-polyfill': [
                    'factory',
                    typedArrayPolyfill,
                ],
            },
        ],
        reporters: ['mocha'],
        client: {
            chai: { includeStack: true },
        },
        // LambdaTest
        hostname: 'localhost.lambdatest.com',
        port: '9876',
        singleRun: true,
        captureTimeout: 600000,
        retryLimit: 1,
        browserDisconnectTimeout: 90000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 90000,
        concurrency: 1,
        browsers: [
            'lambda_chrome',
            'lambda_firefox',
            'lambda_edge',
            'lambda_ie11',
            'lambda_ie10',
            'lambda_ie9',
            'lambda_safari',
        ],
        customLaunchers: {
            lambda_chrome: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Chrome',
                platform: 'Windows 10',
                version: '73.0',
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_firefox: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Firefox',
                platform: 'Windows 10',
                version: '66.0',
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_edge: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'MicrosoftEdge',
                platform: 'Windows 10',
                version: '18.0',
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_ie11: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Internet Explorer',
                platform: 'Windows 10',
                version: '11.0',
                'ie.compatibility': 11001,
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_ie10: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Internet Explorer',
                platform: 'Windows 7',
                version: '10.0',
                'ie.compatibility': 11001,
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_ie9: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Internet Explorer',
                platform: 'Windows 7',
                version: '9.0',
                'ie.compatibility': 11001,
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            lambda_safari: {
                name: pkg.name,
                build: pkg.version,
                base: 'WebDriver',
                config: webDriverConfig,
                browserName: 'Safari',
                platform: 'macOS Mojave',
                version: '12.0',
                tunnel: true,
                tunnelName: 'karma',
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
        },
    })
}

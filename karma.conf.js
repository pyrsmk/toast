const webdriverConfig = {
    hostname: 'hub.lambdatest.com',
    port: 80,
}

module.exports = config => {
    config.set({
        // Base
        basePath: '.',
        files: [
            'tests/lib/toast.min.js',
            'tests/tests.js',
        ],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        // Mocha + Chai + Sinon
        frameworks: [
            'mocha',
            'sinon-chai',
        ],
        reporters: ['mocha'],
        client: {
            chai: { includeStack: true },
            clearContext: false, // LambdaTest
        },
        // LambdaTest
        singleRun: true,
        captureTimeout: 600000,
        retryLimit: 1,
        browserDisconnectTimeout: 90000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 90000,
        concurrency: 2,
        browsers: [
            'chrome',
            'firefox',
            'edge',
            'safari',
        ],
        customLaunchers: {
            chrome: {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome',
                platform: 'Windows 10',
                version: '71',
                tunnel: true,
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            firefox: {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox',
                platform: 'Windows 10',
                version: '66',
                name: 'Karma With Heartbeat',
                tunnel: true,
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            edge: {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'edge',
                platform: 'Windows 10',
                version: '18',
                name: 'Karma With Heartbeat',
                tunnel: true,
                video: true,
                visual: true,
                network: true,
                console: true,
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                pseudoActivityInterval: 15000,
            },
            safari: {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome',
                platform: 'OS X El Capitan',
                version: '9',
                name: 'Karma With Heartbeat',
                tunnel: true,
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

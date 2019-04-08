/* eslint import/no-extraneous-dependencies: ["off"] */
/* eslint no-console: ["off"] */
import { CLIEngine as Eslint } from 'eslint'
import * as rollup from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import * as uglify from 'uglify-js'
import * as fs from 'fs'
import * as path from 'path'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import config from './package.json'

const info = message => {
    console.info(chalk.yellow(' * ') + chalk.green(message))
}

const error = message => {
    if (message) {
        console.error(chalk.yellow(' ! ') + chalk.red(message))
    }
}

const lint = options => {
    const eslint = new Eslint()
    const formatter = eslint.getFormatter()
    return new Promise((resolve, reject) => {
        const { results } = eslint.executeOnFiles([options.glob])
        console.log(formatter(results))
        if (results.length) reject()
        resolve()
    })
}

const bundle = options => new Promise((resolve, reject) => {
    rollup
        .rollup({
            input: options.input,
            plugins: [
                typescript({
                    useTsconfigDeclarationDir: true,
                }),
            ],
        })
        .then(bundler => {
            bundler.write({
                file: options.output,
                format: 'umd',
                name: options.name,
            }).then(
                resolve,
            ).catch(
                reject,
            )
        })
        .catch(reject)
})

const minify = options => new Promise((resolve, reject) => {
    fs.readFile(options.from, 'utf8', (readError, data) => {
        if (readError) reject(readError)
        const params = {}
        if ('sourcemap' in options && 'filename' in options) {
            params.sourceMap = {
                filename: options.filename,
                url: 'inline',
            }
        }
        fs.writeFile(options.to, uglify.minify(data, params).code, writeError => {
            if (writeError) reject(writeError)
            resolve()
        })
    })
})

info('Linting TypeScript modules...')
lint({
    glob: `${path.dirname(config.buildInput)}/**`,
}).then(() => {
    info('Bundling TypeScript modules...')
    bundle({
        input: config.buildInput,
        output: config.buildOutput,
        name: config.buildBundleName,
    }).then(() => {
        info('Minifying production file...')
        minify({
            from: config.buildOutput,
            to: config.buildMinOutput,
        }).then(() => {
            info('Minifying test file...')
            mkdirp.sync(path.dirname(config.buildTestOutput))
            minify({
                from: config.buildOutput,
                to: config.buildTestOutput,
                sourcemap: true,
                filename: `${config.buildBundleName}.js`,
            }).catch(reason => {
                error(reason)
            })
        }).catch(reason => {
            error(reason)
        })
    }).catch(reason => {
        error(reason)
    })
}).catch(reason => {
    error(reason)
})

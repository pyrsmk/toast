import config from './package.json'
import {CLIEngine as Eslint} from 'eslint'
import * as rollup from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import * as uglify from 'uglify-js'
import * as fs from 'fs'
import * as path from 'path'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import klaw from 'klaw'

const info = message => {
    console.log(chalk.yellow(' * ') + chalk.green(message))
}

const error = message => {
    console.log(chalk.yellow(' ! ') + chalk.red(message))
}

const lint = options => {
    const eslint = new Eslint({
        parser: '@typescript-eslint/parser'
    })
    const formatter = eslint.getFormatter()
    return new Promise((resolve, reject) => {
        klaw(options.dir)
            .on('data', item => {
                if (item.stats.isFile()) {
                    const results = eslint.executeOnFiles([item.path]).results
                    console.log(formatter(results))
                    if (results.length) reject()
                }
            })
            .on('end', resolve)
            .on('error', error => reject(error.message))
    })
}

const bundle = options => {
    return new Promise((resolve, reject) => {
        rollup.rollup({
            input: options.input,
            plugins: [
                typescript({
                    useTsconfigDeclarationDir : true,
                }),
            ],
        }).then(bundle => {
            bundle.write({
                file: options.output,
                format: 'umd',
                name: options.name,
            }).then(
                resolve
            ).catch(
                reject
            )
        }).catch(
            reject
        )
    })
}

const minify = options => {
    return new Promise((resolve, reject) => {
        fs.readFile(options.from, 'utf8', (error, data) => {
            if (error) reject(error)
            let params = {}
            if ('sourcemap' in options && 'filename' in options) {
                params.sourceMap = {
                    filename: options.filename,
                    url: 'inline',
                }
            }
            fs.writeFile(
                options.to,
                uglify.minify(data, params).code,
                error => {
                    if (error) reject(error)
                    resolve()
                }
            )
        })
    })
}

info('Linting TypeScript modules...')
lint({
    dir: path.dirname(config.buildInput),
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
            mkdirp.sync(
                path.dirname(config.buildTestOutput)
            )
            minify({
                from: config.buildOutput,
                to: config.buildTestOutput,
                sourcemap: true,
                filename: config.buildBundleName + '.js',
            }).then(() => {
                info('Done.')
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

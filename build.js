import pkg from './package.json'
import * as rollup from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import * as uglify from 'uglify-js'
import * as fs from 'fs'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import {CLIEngine as Eslint} from 'eslint'
import klaw from 'klaw'

const info = (message) => {
    console.log(chalk.yellow(' * ') + chalk.green(message))
}

// Linting source files
info('Linting TypeScript modules...')
const eslint = new Eslint({
    parser: '@typescript-eslint/parser'
})
const formatter = eslint.getFormatter()
klaw('src/')
    .on('data', item => {
        if (item.stats.isFile()) {
            console.log(
                formatter(
                    eslint.executeOnFiles([item.path]).results
                )
            )
        }
    })
    .on('end', () => {
        // Bundling source files
        info('Bundling TypeScript modules...')
        rollup.rollup({
            input: pkg.rollupInputFile,
            plugins: [
                typescript({
                    useTsconfigDeclarationDir : true,
                }),
            ],
        }).then(bundle => {
            // Write the dist/lib.js bundle
            bundle.write({
                file: 'dist/' + pkg.rollupOutputName + '.js',
                format: 'umd',
                name: pkg.rollupOutputName,
            }).then(() => {
                info('Minifying dev/prod files...')
                // Create uglified dist/lib.min.js
                fs.readFile('dist/' + pkg.rollupOutputName + '.js', 'utf8', (error, data) => {
                    if (error) throw error
                    fs.writeFileSync(
                        'dist/' + pkg.rollupOutputName + '.min.js',
                        uglify.minify(data).code
                    )
                })
                // Create uglified test/lib/lib.min.js w/ sourcemap
                fs.readFile('dist/' + pkg.rollupOutputName + '.js', 'utf8', (error, data) => {
                    if (error) throw error
                    // Ensure that tests/lib/ exist
                    mkdirp.sync('tests/lib/')
                    // Uglify file
                    fs.writeFileSync(
                        'tests/lib/' + pkg.rollupOutputName + '.min.js',
                        uglify.minify(data, {
                            sourceMap: {
                                filename: pkg.rollupOutputName + '.js',
                                url: 'inline',
                            }
                        }).code
                    )
                })
            })
        })
    })

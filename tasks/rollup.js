const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const prepack = require('rollup-plugin-prepack-up')

module.exports = async options => {
    await rollup.rollup({
        input: options.input,
        plugins: [
            typescript({ useTsconfigDeclarationDir: true }),
            prepack(),
        ],
    }).then(bundler => {
        bundler.write({
            file: options.output,
            format: 'umd',
            name: options.name,
        })
    })
}

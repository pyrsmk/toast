const { task, series } = require('just-task')
const eslint = require('./tasks/eslint')
const rollup = require('./tasks/rollup')
const uglify = require('./tasks/uglify')

task('lint', () => eslint({
    glob: 'src/**',
}))

task('bundle', () => rollup({
    input: 'src/Toast.ts',
    output: 'dist/toast.js',
    name: 'toast',
}))

task('minify', () => uglify({
    from: 'dist/toast.js',
    to: 'dist/toast.min.js',
}))

task('minify-dev', () => uglify({
    from: 'dist/toast.js',
    to: 'tests/lib/toast.min.js',
    sourcemap: true,
    filename: 'toast.js',
}))

task('build', series(
    'lint',
    'bundle',
    'minify',
    'minify-dev',
))

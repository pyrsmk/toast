import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
    input: 'dist/Toast.js',
    output: {
        file: 'dist/toast.js',
        format: 'umd',
        name: 'toast',
        sourcemap: 'inline'
    },
    // It's needed to load sourcemaps from input files since Rollup
    // does not natively support it
    plugins: [sourcemaps()],
}

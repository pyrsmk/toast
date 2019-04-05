import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: pkg.entryPoint,
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: pkg.bundleName
        },
        /*{
            file: pkg.module,
            format: 'es',
        },*/
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        uglify(),
    ],
};

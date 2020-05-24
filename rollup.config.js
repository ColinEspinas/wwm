import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
			},
			{
				file: pkg.module,
				format: 'es', // the preferred format
			},
			{
				file: pkg.browser,
				format: 'umd',
				name: 'wwm', // the global which can be used in a browser
			}
		],
		external: [
			...Object.keys(pkg.dependencies || {})
		],
		plugins: [
			terser()
		]
	},
]
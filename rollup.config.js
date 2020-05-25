import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import sourcemaps from 'rollup-plugin-sourcemaps';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'es', // the preferred format
				sourcemap: true,
			},
			{
				file: pkg.browser,
				format: 'umd',
				name: 'WWM', // the global which can be used in a browser
				sourcemap: true,
			}
		],
		plugins: [
			json(),
			resolve({
				browser: true,
			}),
			globals(),
			builtins(),
			commonjs(),
			sourcemaps(),
			terser(),
		],
		// externals: [
		// 	'crypto',
		// ],
	},
]
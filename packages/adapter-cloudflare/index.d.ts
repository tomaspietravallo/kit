import { Adapter } from '@sveltejs/kit';
import { BuildOptions } from 'esbuild';
import './ambient.js';

export default function plugin(options?: AdapterOptions): Adapter;

interface DefaultEsbuildOptions {
	platform: 'browser';
	conditions: ['worker', 'browser'];
	sourcemap: 'linked';
	target: 'es2022';
	entryPoints: [string];
	outfile: string;
	allowOverwrite: true;
	format: 'esm';
	bundle: true;
}

type esbuild = (
	defaultOptions: DefaultEsbuildOptions
) => Required<Pick<BuildOptions, keyof DefaultEsbuildOptions>> & Partial<BuildOptions>;

export interface AdapterOptions {
	/**
	 * Customize the automatically-generated `_routes.json` file
	 * https://developers.cloudflare.com/pages/platform/functions/routing/#create-a-_routesjson-file
	 */
	routes?: {
		/**
		 * Routes that will be invoked by functions. Accepts wildcards.
		 * @default ["/*"]
		 */
		include?: string[];

		/**
		 * Routes that will not be invoked by functions. Accepts wildcards.
		 * `exclude` takes priority over `include`.
		 *
		 * To have the adapter automatically exclude certain things, you can use these placeholders:
		 *
		 * - `<build>` to exclude build artifacts (files generated by Vite)
		 * - `<files>` for the contents of your `static` directory
		 * - `<prerendered>` for prerendered routes
		 * - `<all>` to exclude all of the above
		 *
		 * @default ["<all>"]
		 */
		exclude?: string[];
	};

	esbuild?: esbuild;
}

export interface RoutesJSONSpec {
	version: 1;
	description: string;
	include: string[];
	exclude: string[];
}

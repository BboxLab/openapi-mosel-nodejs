// import resolve from "@rollup/plugin-node-resolve";
// import pkg from "./package.json";
// import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';


// const extensions = [".js", ".ts"];

// CommonJS (for Node) and ES module (for bundlers) build.
export default {
  input: "src/index.ts",
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      json()
  ],
  // external: ['sdk/Sdk'] // <-- suppresses the warning

  // output: [
  //   {
  //     file: pkg.main,
  //     format: "cjs",
  //   },
  // ],
  // plugins: [
  //   resolve({
  //     extensions, //specifies the extensions of files that the plugin will operate on
  //   }),
  //   babel({
  //     babelHelpers: "bundled",
  //     exclude: "node_modules/**",
  //     extensions,
  //   })
  // ],
};

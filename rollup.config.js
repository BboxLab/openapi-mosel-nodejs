import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

// CommonJS (for Node) and ES module (for bundlers) build.
export default {
  input: "dist/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  plugins: [
    resolve({
      extensions, //specifies the extensions of files that the plugin will operate on
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions,
    })
  ],
};

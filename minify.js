import { minify } from "terser";

import fs from "fs";

const config = {
  compress: {
    dead_code: true,
    drop_console: true,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: true,
    keep_fnames: false,
    keep_infinity: false,
  },
  mangle: {
    eval: false,
    keep_classnames: false,
    keep_fnames: false,
    toplevel: false,
    safari10: false,
  },
  module: true,
  sourceMap: {
    filename: "apa.min.js",
    url: "apa.min.js.map",
  },
  output: {
    comments: false,
  },
};

const doMinify = async () => {
  const code = fs.readFileSync("./dist/apa.es.js", "utf8");

  const minified = await minify(code, config);

  fs.writeFileSync("./dist/apa.es.min.js", minified.code);

  fs.writeFileSync("./dist/apa.min.js.map", minified.map);
};
doMinify();

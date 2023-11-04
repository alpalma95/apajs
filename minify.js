const { minify } = require("terser");

const fs = require("fs");

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
    filename: "roundjs.min.js",
    url: "roundjs.min.js.map",
  },
  output: {
    comments: "some",
  },
};

const doMinify = async () => {
  const code = fs.readFileSync("./dist/roundjs.es.js", "utf8");

  const minified = await minify(code, config);

  fs.writeFileSync("./dist/roundjs.es.min.js", minified.code);

  fs.writeFileSync("./dist/roundjs.min.js.map", minified.map);
};
doMinify();

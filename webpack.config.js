module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "game.js",
    libraryTarget: "var",
    library: "game"
  },
  externals: {
    "pixi": "PIXI"
  },
  module: {
    loaders: [
      { test: /.js$/, loader: "6to5-loader" }
    ]
  }
};

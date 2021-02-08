const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: outputPath,
    filename: "main.js",
  },
  devtool: "inline-source-map",
  mode: "development",

  devServer: {
    contentBase: outputPath,
    writeToDisk: true,
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "**/*.html", to: outputPath, context: "src" },
        { from: "**/*.css", to: outputPath, context: "src" },
      ],
    }),
  ],
};

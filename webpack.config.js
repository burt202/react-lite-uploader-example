const webpack = require("webpack")
const path = require("path")
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin")

module.exports = {
  mode: "development",
  performance: {
    hints: false,
  },
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      "./src/index.js",
    ],
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{loader: "babel-loader", query: {compact: false}}],
      },
      {
        test: /\.css$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: "./src/index.html",
          to: "index.html",
        },
      ],
    }),
  ],
  devServer: {
    contentBase: "./build",
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
}

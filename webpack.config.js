// In webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/server/app/views/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './browser/js/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "main.js"
  },
  module: {
  preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [HTMLWebpackPluginConfig],
  eslint: {
    configFile: './.eslintrc'
  },
};

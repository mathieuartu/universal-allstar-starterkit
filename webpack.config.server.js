const path = require('path'),
      webpack = require('webpack'),
      nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    path.join(__dirname, '/config/appserver.js'),

  ],
  output: {
    path: path.join(__dirname),
    filename: 'appserver.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/i,
        use: [
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
          {loader: 'stylus-loader'},
        ]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
  ],
  target: 'node',
  externals: [nodeExternals()],
}

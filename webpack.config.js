const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, '/js/components/app-client.jsx'),

  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  module: {
    rules:[
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: { sourceMap: true }},
            {loader: 'postcss-loader', options: { sourceMap: 'inline' }},
            {loader: 'stylus-loader', options: { sourceMap: true }},
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        loader: 'url',
        options: { limit: 10000 },
      },
    ]
  },
  plugins: [
  new ExtractTextPlugin({
    filename: 'main.css',
    disable: false,
    allChunks: true
  })
]
}

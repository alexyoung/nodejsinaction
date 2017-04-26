const webpack = require('webpack');
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: __dirname + '/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
     { test: /\.jsx?$/, loaders: ['babel-loader'] }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: './app/index.jsx',
  output: { path: __dirname, filename: 'dist/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};

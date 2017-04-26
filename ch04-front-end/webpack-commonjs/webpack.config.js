const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: './app/index.js',
  output: { path: __dirname, filename: 'dist/bundle.js' },
};

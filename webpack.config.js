'use strict'
const path = require('path')
const root = path.resolve('./')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: root + '/app/src/js/app.js',
  output: {
    path: root + '/public/js/',
    filename: 'bundle.min.js'
  },
  devtools: 'eval',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    noParse: ['react']
  },
  plugins: [
    new ExtractTextPlugin('./app/src/css/app.css')
  ]
}

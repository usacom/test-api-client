'use strict'
// const config = require('./config');
// const _ = require('./utils');
module.exports = {
  watch: true,
  target: 'electron',

  entry: './app/main.js',
  output: {
    path: __dirname + '/dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  resolve: {
    // extensions: ['.js', '.vue', '.css', '.json'],
    // modules: [
    //   _.cwd('node_modules'),
    //   _.cwd('app')
    // ],
    alias: {
      vue: 'vue/dist/vue.js',
    }
  }
}

'use strict';

var path          = require('path');
var HtmlPlugin    = require('html-webpack-plugin');
var webpack       = require('webpack');

module.exports = function(_path){
  return {
    entry: {
      polyfills:_path + '/src/polyfills.ts',
      vendors:_path + '/src/vendor.ts',
      app: _path + '/src/app.ts'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      path: path.join(_path, 'dist'),
      filename: path.join('assets', 'js', '[name].[hash].js'),
      chunkFilename: '[id].bundle.[chunkhash].js',
      publicPath: '/'
    },
    module:{
      loaders:[
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
        { test: /\.(pug|jade)$/, loader: 'pug-loader' }
      ]
    },
    plugins: [
      new HtmlPlugin({template: 'src/index.pug'}),

      new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
    ]
  }
}

'use strict';

var path          = require('path');
var HtmlPlugin    = require('html-webpack-plugin');
var webpack       = require('webpack');

module.exports = function(_path){
  return {
    devtool: 'source-map',
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
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader'
            },
            'angular2-template-loader'
          ]
        },
        {
          test: /\.pug$/,
          loader: 'pug-html-loader'
        }
      ]
    },
    plugins: [
      new HtmlPlugin({template: 'src/index.pug'}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      })
    ]
  }
}

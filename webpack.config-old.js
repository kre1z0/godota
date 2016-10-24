const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve() + '/dist/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass',
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      files: {
        'css': ['main.css'],
        'js': ['bundle.js']
      },
      template: './src/index.html',
      hash: false,
      favicon: './src/static/favicon.ico',
      filename: '/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' }
    ])
  ]
}


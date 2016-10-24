const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src/app'
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 2727,
    clientLogLevel: 'info',
    stats: { colors: true }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
          plugins: ['transform-decorators-legacy'],
          compact: false
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass'
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
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      files: {
        'css': ['main.css'],
        'js': ['bundle.js']
      },
      template: './src/index.html',
      hash: false,
      favicon: './src/static/favicon.ico',
      filename: './index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' }
    ])
  ]
}

module.exports = config

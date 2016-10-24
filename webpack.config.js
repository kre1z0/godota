const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  devtool: 'inline-source-map',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  context: __dirname,
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 2727,
    clientLogLevel: 'info',
    stats: { colors: true }
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', 'css!sass!autoprefixer-loader?browsers=last 2 versions')
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
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./main.css'),
    new HtmlWebpackPlugin({
      files: {
        'css': ['main.css'],
        'js': ['bundle.js']
      },
      template: './src/index.html',
      hash: false,
      favicon: './src/static/favicon.ico',
      filename: './index.html',
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

module.exports = config

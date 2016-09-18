var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.join(__dirname, '../build/'));
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../../app/web/index.js')
  ],
  output: {
    path: path.join(__dirname, '../build/'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'DEV-MovieCircle',
      template: path.join(__dirname, 'index.html'),
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel-loader?' + JSON.stringify({presets: ['es2015', 'react']})],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};

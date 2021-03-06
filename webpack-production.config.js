const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './client/AppEntry.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};

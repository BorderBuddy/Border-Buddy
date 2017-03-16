const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  context: resolve(__dirname),

  entry: [
    './client/index.js'
  ],

  output: {
    filename: 'fund.js',
    path: resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.js?$/,
        exclude: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'dist')
        ],
        use: [{ loader: 'eslint-loader' }]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        include: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin('stylesheets/fund.compiled.css'),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),

    new webpack.DefinePlugin({
      'DEV': false
    }),

  ]

};

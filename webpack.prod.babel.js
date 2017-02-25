import webpack from 'webpack';
import { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {

  context: resolve(__dirname),

  entry: [
    './client.js'
  ],

  output: {
    filename: 'fund.js',
    path: resolve(__dirname, 'dist')
  },

  devtool: 'cheap-module-source-map',

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
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
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

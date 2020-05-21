const webpack = require('webpack')
const resolve = require('path').resolve
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  context: resolve(__dirname),

  entry: ['./client/index.js'],

  output: {
    filename: 'fund.js',
    path: resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'dist')
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        include: /\.json$/,
        loader: 'json'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        ie8: false,
        ecma: 6,
        compress: {},
        sourceMap: true,
        output: {
          comments: false
        }
      }
    })]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new MiniCssExtractPlugin('stylesheets/fund.compiled.css'),

    new webpack.LoaderOptionsPlugin({ options: {} }),

    new webpack.DefinePlugin({
      DEV: false
    })
  ]
}

import webpack from 'webpack';
import { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  context: resolve(__dirname),

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client.js'
  ],

  output: {
    filename: 'fund.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    pathinfo: true
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader', 'babel-loader']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('stylesheets/fund.compiled.css'),
    new webpack.DefinePlugin({
      'DEV': true
    }),
  ]
};

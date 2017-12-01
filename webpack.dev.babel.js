const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
});

module.exports = {
  context: resolve(__dirname),

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.js'
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
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.js?$/,
        exclude: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'dist')
        ]
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
    configPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('stylesheets/fund.compiled.css'),
    new webpack.DefinePlugin({
      DEV: true
    })
  ]
};

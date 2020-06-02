const webpack = require('webpack')
const resolve = require('path').resolve
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const configPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
})

module.exports = {
  mode: 'development',

  context: resolve(__dirname),

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'src/index.tsx'
  ],

  output: {
    filename: 'fund.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    pathinfo: true
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
        test: /\.js?$/,
        exclude: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'dist')
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

  plugins: [
    configPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin('stylesheets/fund.compiled.css'),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.DefinePlugin({
      DEV: true
    })
  ]
}

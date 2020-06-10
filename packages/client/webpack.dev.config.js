const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = {
  distFolder: resolve(__dirname, 'dist'),
  assetsFolder: resolve(__dirname, 'assets')
}

module.exports = {
  entry: [
    resolve(__dirname, 'src', 'index.tsx')
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: resolve(paths.distFolder),
    filename: 'bundle.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'ts-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.compiled.css'
    }),
    new CopyPlugin([
      {
        from: resolve(paths.assetsFolder, 'images'),
        to: resolve(paths.distFolder, 'images')
      }
    ])
  ],
  devServer: {
    contentBase: resolve(__dirname, 'dist', 'src'),
    port: 8000,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': 'http://localhost:3000'
    },
    watchContentBase: true,
  }
}
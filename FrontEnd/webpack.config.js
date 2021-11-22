const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const { PORT, CSS_PREFIX } = dotenv.config().parsed;
const { NODE_ENV } = process.env;

module.exports = {
  entry: './src/index.jsx',
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `${CSS_PREFIX}[local]`,
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.scss'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    port: PORT,
    hot: true,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv(),
    new NodePolyfillPlugin(),
  ],
};

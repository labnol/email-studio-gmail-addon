const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const destination = 'dist';

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: true,
          mangle: false,
          compress: {
            properties: false
          },
          output: {
            beautify: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          failOnError: false,
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json',
        to: path.resolve(__dirname, destination)
      }
    ]),
    new GasPlugin()
  ]
};

import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';

export default {
  context: path.resolve(__dirname, './client'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  postcss: [
    autoprefixer()
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    ...process.env.NODE_ENV === 'production' ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ] : []
  ]
};

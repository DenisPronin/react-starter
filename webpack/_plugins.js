import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'

const isProduction = config.env === 'production';

export let plugins = [
  new webpack.DefinePlugin(config.globals)
];

if (!isProduction) {
  plugins = plugins.concat([
    new HtmlWebpackPlugin({
      template: `${config.path_client}/index.html`,
      hash: false,
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
}
else {
  plugins = plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: `${config.path_client}/index.html`,
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].css')
  ]);
}

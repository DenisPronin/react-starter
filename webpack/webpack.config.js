import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: `${config.path_base}/${config.dir_client}`,
    extensions: ['', '.js']
  },
  entry: {
    app: config.compiler_enable_hmr
      ? [`${config.path_base}/${config.dir_client}/main.js`, 'webpack-hot-middleware/client?path=/__webpack_hmr']
      : [`${config.path_base}/${config.dir_client}/main.js`]
  },
  output: {
    filename: `[name].js`,
    path: `${config.path_base}/${config.dir_dist}`,
    publicPath: config.compiler_public_path
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${config.path_base}/${config.dir_client}/index.html`,
      hash: false,
      //favicon: paths.client('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      compact: false,
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: config.compiler_enable_hmr
          ? ['es2015', 'react', 'stage-0', 'react-hmre']
          : ['es2015', 'react', 'stage-0']
      }
    }]
  }
};

export default webpackConfig

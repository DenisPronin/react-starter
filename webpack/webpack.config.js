import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'

const isProduction = config.env === 'production';

/*
 * Entry
 * */
const entry = {
  app: config.compiler_enable_hmr
    ? [`${config.path_client}/main.js`, 'webpack-hot-middleware/client?path=/__webpack_hmr']
    : [`${config.path_client}/main.js`]
};

/*
 * Output
 * */
const output = {
  filename: `[name].js`,
  path: config.path_dist,
  publicPath: config.compiler_public_path
};

/*
 * Plugins
 * */
let plugins = [
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

/*
 * Loaders
 * */
let cssLoaders = isProduction
  ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  : 'style-loader!css-loader!postcss-loader';

let loaders = [
  // ES-2015
  {
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
  },
  // Styles
  {
    test: /\.css$/,
    include: /app/,
    loader: cssLoaders
  },
  // Fonts
  {test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&mimetype=application/font-woff'},
  {test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&mimetype=application/font-woff2'},
  {test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&mimetype=application/octet-stream'},
  {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
  {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&mimetype=image/svg+xml'},
  // Images
  {test: /\.(png|jpg)$/, loader: 'url'}
];

let postcss = [
  cssnano({
    sourcemap: true,
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    safe: true,
    discardComments: {
      removeAll: true
    }
  })
];

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: config.path_client,
    extensions: ['', '.js']
  },
  entry,
  output,
  plugins,
  module: {
    preLoaders: [],
    loaders
  },
  postcss
};

export default webpackConfig

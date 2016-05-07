import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'

const isProduction = config.env === 'production';

// ------------------------------------
// Pre-Loaders
// ------------------------------------
export let preLoaders = [{
  test: /\.js$/,
  loader: 'eslint',
  exclude: /node_modules/
}];

export let eslint = {
  configFile: `${config.path_base}/.eslintrc`,
  emitWarning: config.compiler_enable_hmr
};

// ------------------------------------
// Loaders
// ------------------------------------
let cssLoaders = isProduction
  ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
  : 'style-loader!css-loader!postcss-loader!sass-loader';

export let loaders = [
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
        ? ['es2015', 'react', 'react-hmre']
        : ['es2015', 'react']
    }
  },
  // Styles
  {
    test: /\.scss$/,
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

export let postcss = [
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

export let sassLoader = {
  includePaths: `${config.path_client}/styles`
};

import config from '../config'

export const entry = {
  app: config.compiler_enable_hmr
    ? [`${config.path_client}/main.js`, 'webpack-hot-middleware/client?path=/__webpack_hmr']
    : [`${config.path_client}/main.js`]
};

export const output = {
  filename: `[name].js`,
  path: config.path_dist,
  publicPath: config.compiler_public_path
};

export const resolve = {
  root: config.path_client,
    extensions: ['', '.js']
};

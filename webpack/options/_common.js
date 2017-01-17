import config from '../../config'

const isProduction = config.env === 'production';

const buildEntryPoint = function (entryPoint) {
  let entry = [entryPoint];
  if (!isProduction) {
    entry.unshift(
      `webpack-dev-server/client?http://${config.server_host}:${config.server_port}`,
      'webpack/hot/dev-server'
    );
  }
  return entry;
};

export const entry = {
  app: buildEntryPoint(`${config.path_client}/main.js`)
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

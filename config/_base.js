import path from 'path'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProd = env === 'production';

let config = {
  env : env,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../'),
  dir_client : 'app',
  dir_dist   : 'dist',
  dir_server : 'server',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 5075,
  webpack_port : process.env.PORT || 5076,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool   : !isProd ? 'cheap-module-eval-source-map' : null,
  compiler_enable_hmr: false,
  compiler_public_path: '',

  // ------------------------------------
  // Environment
  // ------------------------------------
  globals: {
    'process.env'  : {
      'NODE_ENV' : JSON.stringify(env)
    },
    'NODE_ENV'     : env,
    '__DEV__'      : !isProd,
    '__PROD__'     : isProd,
    '__DEBUG__'    : !isProd,
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
  }

};

export default config;

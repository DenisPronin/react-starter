import webpack from 'webpack'
import config from '../config'

import { entry, output, resolve } from './_common'
import { plugins } from './_plugins'
import { preLoaders, loaders, postcss } from './_loaders'

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve,
  entry,
  output,
  plugins,
  module: {
    preLoaders,
    loaders
  },
  postcss
};

export default webpackConfig

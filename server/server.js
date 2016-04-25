import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import http from 'http';

import config from '../config';
import webpackConfig from '../webpack/webpack.config';

const app = express();

// Webpack dev server
if (config.globals.__DEV__) {

  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  if (config.compiler_enable_hmr) {
    app.use(webpackHotMiddleware(compiler));
  }

  app.listen(config.webpack_port, config.server_host, function (err) {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:' + config.webpack_port);
  });
}

app.use(express.static(config.path_base));

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (request, response) {
  response.sendFile(`${config.path_base}/${config.dir_client}/index.html`);
});

// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);
const port = config.server_port;

server.listen(port, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Server running on port ' + port);
});

import webpack from 'webpack'
import webpackConfig from './webpack.config'

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  console.log(stats.toString({
    chunks : false,
    chunkModules : false,
    colors : true
  }));

  const jsonStats = stats.toJson();

  if (err) {
    console.log('Webpack compiler encountered a fatal error.', err);
    process.exit(1);
  }
  else if (jsonStats.errors.length > 0) {
    console.log('Webpack compiler encountered errors.');
    process.exit(1);
  }
  else if (jsonStats.warnings.length > 0) {
    console.log('Webpack compiler encountered warnings.');
    process.exit(1);
  }
  else {
    console.log('No errors or warnings encountered.')
  }
});

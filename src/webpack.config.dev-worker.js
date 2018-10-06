/* <project-root>/src/webpack.config.dev-worker.js */

const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.worker.js');

module.exports = merge(baseConfig, {
  'mode': 'development',
  'watch': true
});

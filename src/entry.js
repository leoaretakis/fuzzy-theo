import { coreInit, loadCore } from 'isolated-core';

coreInit({
  scriptURL: 'bundle.js',
  run(core) {
    core.ready(require('./app'));
  }
});

require('webpack/hot/dev-server');
require('webpack-dev-server/client?http://0.0.0.0:3000');

module.hot.accept('./app.js', () => {
  loadCore({ scriptURL: 'bundle.js' })
    .then((core) => core.launchCore(), (core) => {
      console.error(`core #${core.id} failed to load: ${core.type} error`)
      core.destroyCore();
    });
});

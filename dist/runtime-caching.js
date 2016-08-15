(function (global) {
  'use strict';

  // See https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxroutergeturlpattern-handler-options
  // and https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxfastest
  // for more details on how this handler is defined and what the toolbox.fastest strategy does.
  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: /\.(?:googleapis|gstatic|firebaseio)\.com$/
  });
  global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
    origin: 'https://utage-7e146.firebaseio.com'
  });
  global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
    origin: 'https://utage-7e146.appspot.com'
  });
  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: 'https://cdnjs.cloudflare.com'
  });
})(self);

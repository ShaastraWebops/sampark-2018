/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/certificates', require('./api/certificate'));
  app.use('/api/samparks', require('./api/sampark'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);
  app.use(function(err, req, res, next) {
    if(401 == err.status) {
        res.redirect('/login')
    }
  });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}

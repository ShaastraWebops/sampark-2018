'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'sampark-secret',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',
  
  GOOGLE_ID: '766047559031-s0a2plts4jsu14vmdoaf7o15u77vgba7.apps.googleusercontent.com ',
  GOOGLE_SECRET: ' XM5Lh2a65yeDkKvBegc32rst ',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

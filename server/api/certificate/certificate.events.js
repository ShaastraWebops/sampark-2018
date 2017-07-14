/**
 * Certificate model events
 */

'use strict';

import {EventEmitter} from 'events';
var CertificateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CertificateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Certificate) {
  for(var e in events) {
    let event = events[e];
    Certificate.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CertificateEvents.emit(event + ':' + doc._id, doc);
    CertificateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CertificateEvents;

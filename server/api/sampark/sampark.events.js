/**
 * Sampark model events
 */

'use strict';

import {EventEmitter} from 'events';
var SamparkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SamparkEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Sampark) {
  for(var e in events) {
    let event = events[e];
    Sampark.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SamparkEvents.emit(event + ':' + doc._id, doc);
    SamparkEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SamparkEvents;

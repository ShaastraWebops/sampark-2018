/**
 * Feedback model events
 */

'use strict';

import {EventEmitter} from 'events';
var FeedbackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeedbackEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Feedback) {
  for(var e in events) {
    let event = events[e];
    Feedback.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    FeedbackEvents.emit(event + ':' + doc._id, doc);
    FeedbackEvents.emit(event, doc);
  };
}

export {registerEvents};
export default FeedbackEvents;

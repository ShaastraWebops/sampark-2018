'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  venue: String,
  time: String,
  sampark: {
  	type: Schema.Types.ObjectId
  },
  instructions: String,
  registered: {
  	type: Array,
  	default: []
  }
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);

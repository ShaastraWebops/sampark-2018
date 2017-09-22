'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import {registerEvents} from './sampark.events';

var SamparkSchema = new mongoose.Schema({
  name: String,
  venue: String,
  date: {
    day: Number,
    month: String
  },
  venuelink: String,
  contact: {
    name:String,
    phnumber: Number
  },
  events: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Event',
  	default: []
  }]
});

registerEvents(SamparkSchema);
export default mongoose.model('Sampark', SamparkSchema);

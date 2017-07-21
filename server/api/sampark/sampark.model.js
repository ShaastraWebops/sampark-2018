'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sampark.events';

var SamparkSchema = new mongoose.Schema({
  name: String,
  venue: String,
  time: String,
  venueLink: String,
  contact: String
});

registerEvents(SamparkSchema);
export default mongoose.model('Sampark', SamparkSchema);

'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sampark.events';

var SamparkSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SamparkSchema);
export default mongoose.model('Sampark', SamparkSchema);

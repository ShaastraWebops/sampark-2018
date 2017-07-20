'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import {registerEvents} from './event.events';

//admins can be shifted to Sampark

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  venue: String,
  time: String,
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sampark: {
    type: Schema.Types.ObjectId,
    ref: 'Sampark'
  },
  instructions: String,
  registerations: [{
  participant: {
    type: Schema.Types.ObjectId,
    ref: 'User'}, 
  attendence:{
    type:Boolean, 
    default: false}
  }]
});

// var RegisSchema = new mongoose.schema({
//   participant:{type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post'},
//   attendence:{type:Boolean, 
//     default: false
//   }
// });

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);

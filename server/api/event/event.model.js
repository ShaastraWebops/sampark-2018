'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import {registerEvents} from './event.events';

//admins can be shifted to Sampark

var EventSchema = new mongoose.Schema({
  name: String,
  venue: String,
  time: String,
  
  // admins: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  // commenting admins as of now
  // there is going to be a single id for the entire M&SR team
  // so the concept of admin for each event does not come into play.

  sampark: {
    type: Schema.Types.ObjectId,
    ref: 'Sampark'
  },
  instructions: String,
  registrations: [{
  participant: {
    type: Schema.Types.ObjectId,
    ref: 'User'}, 
  attendance:{
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

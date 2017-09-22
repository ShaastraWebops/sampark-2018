'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './feedback.events';

var FeedbackSchema = new mongoose.Schema({
	quality:Number,
	materials:Number,
	event:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    suggestions:String
});

registerEvents(FeedbackSchema);
export default mongoose.model('Feedback', FeedbackSchema);

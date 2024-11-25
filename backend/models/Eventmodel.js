const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    isOnline: { type: Boolean, required: true },
    location: { 
      type: String, 
      validate: {
        validator: function(value) {
          // Only validate 'location' if the event is offline
          if (!this.isOnline) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Location is required for offline events',
      },
      default: null
    },
    eventImage: {
      data: Buffer,
      contentType: String,
    },
    postedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
  });
module.exports = mongoose.model("Event", eventSchema);

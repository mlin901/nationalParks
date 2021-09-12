const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedParks` array in User.js
const parkSchema = new Schema({
  parkId: {
    type: String,
    required: true,
  },
  parkName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = parkSchema;

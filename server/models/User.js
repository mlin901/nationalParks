const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const parkSchema = require('./Park');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  // savedParks: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Park',
  //   },
  // ],
  savedParks: [parkSchema],

// });

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.virtual('parkCount').get(function () {
//   return this.savedParks.length;
// });

// const User = model('User', userSchema);

// module.exports = User;

},
// set this to use virtual below
{
  toJSON: {
    virtuals: true,
  },
}
);

// hash user password
userSchema.pre('save', async function (next) {
if (this.isNew || this.isModified('password')) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
}

next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('parkCount').get(function () {
return this.savedParks.length;
});

const User = model('User', userSchema);

module.exports = User;

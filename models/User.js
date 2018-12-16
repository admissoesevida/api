const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  githubId: String,
  username: String,
  password: String
});

userSchema.statics.findOrCreate = (condition, done) => {
  const self = mongoose.model('user');
  self.findOne(condition, (err, result) => {
    return result
      ? done(err, result)
      : self.create(condition, (err, result) => {
        return done(err, result);
      });
  });
};

mongoose.model('user', userSchema);

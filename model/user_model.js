const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    require: [true, " A user must have a email"],
    trim: true,
    unique: true,
  },

  first_name: {
    type: String,
    minLength: 2,
    require: true,
  },

  last_name: {
    type: String,
    minLength: 2,
    require: true,
  },

  password: {
    type: String,
    minLength: 2,
    require: true,
    trim: true,
    require: [true, "kindly enter your password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const user = mongoose.model("user", userSchema);
module.exports = user;



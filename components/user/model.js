import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter your first name."],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter your last name."],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Please enter your phone number."],
  },
  photo: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Enter an email address."],
    validate: [validator.isEmail, "Enter a valid email address."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Missing password."],
    minLength: [7, "Your password must contain at least 8 characters"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const objToken = {
    _id: user._id,
    date: new Date(),
  };
  const token = jwt.sign(objToken, config.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  if (!validator.isEmail(email)) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const user = await User.findOne({ email, active: true }).select("-__v");

  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);
export default User;

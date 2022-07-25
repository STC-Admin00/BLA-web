const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 24
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 24
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    profilePhoto: {
      type: String,
      default: "https://blacklitapp.com/wp-content/uploads/2022/06/User-Photo.png"
    },
    password: {
      type: String
    },
    username: {
      type: String,
      default: "",
      unique: true
    },
    works: {
      type: Array,
      default: []
    },
    worksCt: {
      type: Number,
      default: 0
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    favorites: {
      type: Array,
      default: []
    },
    desc: {
      type: String,
      max: 60
    },
    roles: {
      User: {
        type: Number,
        default: 8008
      },
      Editor: Number,
      Admin: Number,
      Author: Number
    },
    website: {
      type: String,
      default: ""
    },
    twtAddress: {
      type: String,
      default: ""
    },
    igAddress: {
      type: String,
      default: ""
    },
    fbAddress: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: "eng"
    },
    gender: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    refreshToken: [String],
    resetLink: {
      data: String,
      default: ''
    }
  });
  module.exports = User = mongoose.model("users", UserSchema);
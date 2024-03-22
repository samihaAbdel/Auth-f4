//require mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  phone: Number,
  image: String, 
  cloudinary_id: String
});

module.exports = User = mongoose.model("user", userSchema);

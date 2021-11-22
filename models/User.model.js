const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
  postcode: Number,
  serviceType:{
    type: String,
    enum: ['Limpieza', 'Canguro', 'Jardinería'],
  },
  role: {
    type: String,
    enum: ['Client', 'Worker']
  },
  price: Number,
  image: String //poner imagen default
});

const User = model("User", userSchema);

module.exports = User;

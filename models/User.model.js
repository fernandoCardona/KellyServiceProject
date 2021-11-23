const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
  postcode: Number,
  serviceType:{
    type: [String],
    enum: ['Limpieza', 'Canguro', 'Jardineria'],
  },
  role: {
    type: String,
    enum: ['Client', 'Worker'],
    required: true
  },
  price: Number,
  image: {type :String, default:'/images/avatar.png'} //poner imagen default
});

const User = model("User", userSchema);

module.exports = User;

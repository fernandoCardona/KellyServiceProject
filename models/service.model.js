const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const serviceSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    postcode: {type: Number, required: true},
    serviceType: {
      type: String,
      enum: ['Limpieza', 'Canguro', 'Jardineria'],
      required: true
    },
    candidates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    worker: { type: Schema.Types.ObjectId, ref: 'User' },

    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
      required: true
    },


  },
  {
    timestamps: true

  }

);

const Service = model("Service", serviceSchema);

module.exports = Service;
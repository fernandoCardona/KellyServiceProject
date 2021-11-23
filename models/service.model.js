const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const serviceSchema = new Schema(
  {
    title: String,
    description: String,
    serviceType:{
      type: String,
      enum: ['Limpieza', 'Canguro', 'Jardinería']
    },
    candidates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    worker: { type: Schema.Types.ObjectId, ref: 'User' },
    
    status: {
      type: String,
      enum: ['Pending', 'Completed']
    },
 
    
  },
  {
    timestamps: true

  }

);

const Service = model("Service", serviceSchema);

module.exports = Service;
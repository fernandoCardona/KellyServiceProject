const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const contactSchema = new Schema(
    {
        name: String,
        email: String,
        title: String,
        comment: String,
    },
    {
        timestamps: true

    }

);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
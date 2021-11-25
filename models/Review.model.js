const { Schema, model } = require("mongoose");


const reviewSchema = new Schema({

    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service'}
});

const Review = model("Review", reviewSchema);

module.exports = Review;
const { Schema, model } = require("mongoose");


const reviewSchema = new Schema({
    
    
        comment: String,
        rating: Number,

    
    service: { type: Schema.Types.ObjectId, ref: 'Service' }
});

const Review = model("Review", reviewSchema);

module.exports = Review;
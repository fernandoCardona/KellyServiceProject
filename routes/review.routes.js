const router = require("express").Router();
const Service = require("../models/Service.model")
const User = require("../models/User.model")
const Review = require("../models/Review.model")



// LISTA DE REVIEWS

router.get('/', (req, res) => {

    Review.find()
        .then(allReviews => res.render('reviews/reviews', {allReviews}))
        .catch(err => console.log(err))
})


// CREACION DE LA REVIEW

router.get("/new", (req, res) => {

    Review.find()
        .then(allReviews => res.render("reviews/review-new", { allReviews }))
        .catch(err => console.log(err))
})

router.post("/new", (req, res) => {

    const { comment, rating, service } = req.body

    Review.create({ comment, rating, service })
        .then(newReview => res.redirect("/reviews"))
        .catch(err => console.log(err))
})







module.exports = router;
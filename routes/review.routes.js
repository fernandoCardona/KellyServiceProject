const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const { capitalizeText, checkMongoID, isClient, isWorker } = require("../utils");


const Service = require("../models/Service.model")
const User = require("../models/User.model")
const Review = require("../models/Review.model")



//TODO: HACER QUE la review QUE CREE TENGA POR DEFECTO COMO EL SERVICIO QUE CORRESPONDE DENTRO DE CLIENT-SERVICES

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

    const { id } = req.query

    // Service.find(id)
    //     .then(serviceId => {
    //         Review.create({ comment, rating, service })
                
    //             .then(newReview => res.redirect("/reviews", {serviceId, newReview}))
    //             .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))

})




// DELETE REVIEW 

router.get("/delete", (req, res) => {
    const { id } = req.query

    Review.findByIdAndDelete(id)
        .then(info => res.redirect("/reviews"))
        .catch(err => console.log(err))

})






module.exports = router;
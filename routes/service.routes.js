const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Service.model");
const Service = require("../models/Service.model")
const User = require("../models/User.model")



// LISTA GENERAL DE SERVICIOS CREADOS

router.get("/", (req, res) => {

    Service.find()
        .populate('client worker candidates')
        .then(allServices => {
            // console.log("--------------->", allServices)
            res.render("services/services", { allServices })
        })
        .catch(err => console.log(err))

})



// [CLIENTE] LISTA PROPIA DE SERVICIOS CREADOS 

router.get("/my-services", (req, res) => {

    const currentUser = req.session.currentUser
    const id = currentUser._id

    Service.find({ client: id })
        .populate('client worker candidates')
        .then(myServices => res.render('client/client-services', { myServices }))
        .catch(err => console.log(err))

})



// [TRABAJADOR] LISTA PROPIA DE SERVICIOS APLICADOS

router.get("/applied-services", (req, res) => {

    const currentUser = req.session.currentUser
    const id = currentUser._id

    Service.find({ candidates: [id] })
        .populate('client worker candidates')
        .then(appliedServices => res.render('worker/worker-services', { appliedServices }))
        .catch(err => console.log(err))

})











// DETALLES DEL SERVICIO

router.get("/details/:id", (req, res) => {

    const { id } = req.params

    Service.findById(id)
        .populate('client worker candidates')
        .then(service => res.render("services/service-details", service))
        .catch(err => console.log(err))

})








// CREACION DE SERVICIO

router.get('/new', (req, res) => {

    User.find()
        .then(allUsers => {
            res.render("client/client-service-new", { allUsers })
        })
        .catch(err => console.log(err))
})


router.post('/new', (req, res) => {

    const currentUser = req.session.currentUser
    const id = currentUser._id

    const { title, description, address, postcode, serviceType, candidates, client, worker, status } = req.body

    Service.create({ title, description, address, postcode, serviceType, candidates, client: id, worker, status })
        .then(newService => res.redirect("/services"))
        .catch(err => console.log(err))
})






// EDICION DE SERVICIO

router.get("/edit", (req, res) => {

    // const currentUser = req.session.currentUser
    // const id = currentUser._id
    // console.log('>>>>>>>>>>>>>>>>>>>', currentUser)
    // console.log('---------------------------->', id)

    const { id } = req.query

    Service.findById(id)
        .then(service => {
            User.find()
                .then(allUsers => res.render("client/client-service-edit", { service, allUsers }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post("/edit", (req, res) => {

    const { id } = req.query
    const { title, description, address, postcode, serviceType, candidates, client, worker, status } = req.body

    Service.findByIdAndUpdate(id, { title, description, address, postcode, serviceType, candidates, client, worker, status }, { new: true })
        .then(updatedService => {
            res.redirect("/services/my-services")
        })
        .catch(err => console.log(err))


})



// APPLY TRABAJADOR

// Para añadir trabajador al array de candidatos (pushear)
// findByIdAndUpdate(ID, {$push: {field: value}})
router.post("/apply", (req, res) => {

    const currentUser = req.session.currentUser
    const userId = currentUser._id

    const { id } = req.query
    const { candidates } = req.body

    Service.findByIdAndUpdate(id, { $push: { candidates: userId } }, { new: true })
        .populate("candidates")
        .then(newCandidate => res.redirect(`/services/details/${id}`))
        .catch(err => console.log(err))

})














// DELETE SERVICE

router.get("/delete", (req, res) => {
    const { id } = req.query

    Service.findByIdAndDelete(id)
        .then(info => res.redirect("/services"))
        .catch(err => console.log(err))

})












module.exports = router;
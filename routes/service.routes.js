const router = require("express").Router();
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


// servicio por :id
//SE ACEPTA UN SERVICIO
// editar servicio añadiendo como worker el usuario logueado

//Completa un servicio
// pasar status a Completed

// LISTA PROPIA DE SERVICIOS CREADOS

router.get("/my-services", (req, res) => {

    // const currentUser = req.session.currentUser
    // const id = currentUser._id

    Service.find()
        .then(myServices => res.render('client/client-services', {myServices}) )
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
    console.log(id)
    const { title, description, address, postcode, serviceType, candidates, client, worker, status } = req.body

    Service.findByIdAndUpdate(id, { title, description, address, postcode, serviceType, candidates, client, worker, status }, { new: true })
        .then(updatedService => {
            res.redirect("/services")
        })
        .catch(err => console.log(err))


})




module.exports = router;
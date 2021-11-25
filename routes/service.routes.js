const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const { capitalizeText, checkMongoID, isClient, isWorker } = require("../utils");


const { findByIdAndUpdate } = require("../models/Service.model");
const Service = require("../models/Service.model")
const User = require("../models/User.model")



// LISTA GENERAL DE SERVICIOS CREADOS

router.get("/", (req, res) => {

    Service.find()
        .populate('client worker candidates')
        .then(allServices => {
            res.render("services/services", { 
                allServices,
                loggedUser: req.session.currentUser,
                isClient: isClient(req.session.currentUser),
                isWorker: isWorker(req.session.currentUser)
             })
        })
        .catch(err => console.log(err))

})



router.get("/api", (req, res) => {

    Service.find()
        .populate('client worker candidates')
        .then(allServices => {
            res.json(allServices)
        })
        .catch(err => console.log(err))

})

//TODO: Servicios por Código postal de usuario, 
//buscar servicio que coincida el codigo postal del usuario logeado con el del servicio creado


// [CLIENTE] LISTA PROPIA DE SERVICIOS CREADOS 

router.get("/my-services", checkRoles("Client"), (req, res) => {

    const currentUser = req.session.currentUser
    const id = currentUser._id

    Service.find({ client: id })
        .populate('client worker candidates')
        .then(myServices => res.render('client/client-dashboard', { myServices }))
        .catch(err => console.log(err))

})



// [TRABAJADOR] LISTA PROPIA DE SERVICIOS APLICADOS

// router.get("/applied-services", checkRoles("Worker"), (req, res) => {

//     const currentUser = req.session.currentUser
//     const id = currentUser._id

//     Service.find({ candidates: id })
//         .populate('client worker candidates')
//         .then(appliedServices => res.render('worker/worker-Dashboard', { appliedServices }))
//         .catch(err => console.log(err))

// })











// DETALLES DEL SERVICIO

router.get("/details/:id", (req, res) => {

    const { id } = req.params

    Service.findById(id)
        .populate('client worker candidates')
        .then(service => res.render("services/service-details", {
            loggedUser: req.session.currentUser,
            isClient: isClient(req.session.currentUser),
            isWorker: isWorker(req.session.currentUser),
            service
        }))
        .catch(err => console.log(err))

})








// CREACION DE SERVICIO

router.get('/new', checkRoles("Client"), (req, res) => {

    User.find()
        .then(allUsers => {
            res.render("client/client-service-new", { allUsers })
        })
        .catch(err => console.log(err))
})


router.post('/new', checkRoles("Client"), (req, res) => {

    const currentUser = req.session.currentUser
    const id = currentUser._id

    const { title, description, address, postcode, serviceType, candidates, client, worker, status } = req.body

    Service.create({ title, description, address, postcode, serviceType, candidates, client: id, worker, status })
        .then(newService => res.redirect("/client/dashboard"))
        .catch(err => console.log(err))
})






// EDICION DE SERVICIO

router.get("/edit", checkRoles("Client"), (req, res) => {

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

router.post("/edit", checkRoles("Client"), (req, res) => {

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
router.post("/apply", checkRoles("Worker"), (req, res) => {

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

router.get("/delete", checkRoles("Client"), (req, res) => {
    const { id } = req.query

    Service.findByIdAndDelete(id)
        .then(info => res.redirect("/client/dashboard"))
        .catch(err => console.log(err))

})







module.exports = router;
const router = require("express").Router();

const { isLoggedIn, checkRoles } = require("../middlewares")
const { capitalizeText, checkMongoID, isClient, isWorker } = require("../utils");

const Worker = require("../models/User.model")
const bcrypt = require("bcrypt");
const Service = require("../models/Service.model")

// SIGNUP

router.post("/signup", (req, res) => {

  const { fullName, email, password, role, address, postcode, serviceType } = req.body
  console.log("sagdjhasgdja");
  //res.json(req.body);

  Worker.find({ email })
    .then(user => {

      //Si ya existe devolvemos error
      if (user.length) {
        res.render("/", { errorMessage: "Usuario ya existente." })
      } else {

        //Si no generamos el salt...
        const bcryptSalt = 10
        const salt = bcrypt.genSaltSync(bcryptSalt)
        //Y encriptamos la contraseña
        const hashPass = bcrypt.hashSync(password, salt)


        Worker.create({ fullName, email, role: 'Worker', password: hashPass, address, postcode, serviceType })
          .then(createdUser => res.redirect("/"))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))
})

//LOGIN
// DASHBOARD WORKER

router.get("/dashboard", (req, res) => {

  const currentUser = req.session.currentUser;

  Service.find()
    .populate('client worker candidates')
    .then(services => {
      // console.log("--------------->", services)
      res.render("worker/worker-dashboard", { services, currentUser })
    })
    .catch(err => console.log(err))

})

router.post("/login", (req, res) => {

  const { email, password } = req.body

  //Buscamos si existe el usuario
  Worker.findOne({ email })
    .then(user => {

      //Si el usuario no existe enviamos error
      if (!user) {
        res.render('/', { errorMessage: 'Usuario no reconocido' })
        return
      }

      //Si la contraseña no coincide con el hash enviamos error
      if (bcrypt.compareSync(password, user.password) === false) {
        res.render('/', { errorMessage: 'Contraseña incorrecta' })
        return
      }

      //5. Enganchar el objeto de usuario al req.session
      req.session.currentUser = user
      res.redirect("/worker/dashboard")
    })
    .catch(err => console.log(err))
})


//  LOGOUT

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})



// ----------------------------------------------------------------------------------------------------//


// API LISTA TRABAJADORES 

router.get('/api', (req, res) => {

  Worker.find()
    .then(allWorkers => {
      res.json(allWorkers)
    })
    .catch(err => console.log(err))
})
















module.exports = router;
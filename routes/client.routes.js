const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const { capitalizeText, checkMongoID, isClient, isWorker } = require("../utils");

const Client = require("../models/User.model")
const Service = require("../models/Service.model")
const bcrypt = require("bcrypt")


// SIGNUP

router.post("/signup", (req, res) => {

  const { fullName, email, password, role, address, postcode } = req.body

  //Comprobamos si existe el usuario
  Client.find({ email })
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


        Client.create({ fullName, email, role: 'Client', password: hashPass, address, postcode })
          .then(createdUser => res.redirect("/"))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))

})



// LOGIN

// DASHBOARD CLIENTE

router.get("/dashboard", (req, res) => {
  // const currentUser = req.session.currentUser;
  // res.render("client/client-dashboard", currentUser);

  const currentUser = req.session.currentUser
    const id = currentUser._id

    Service.find({ client: id })
        .populate('client worker candidates')
        .then(myServices => res.render('client/client-dashboard', { myServices, currentUser }))
        .catch(err => console.log(err))

})

router.post("/login", (req, res) => {
  const { email, password } = req.body
  //Buscamos si existe el usuario
  Client.findOne({ email })
    .then(user => {

      //Si el usuario no existe enviamos error
      if (!user) {
        res.redirect('/', { errorMessage: 'Usuario no reconocido' })
        return
      }

      //Si la contraseña no coincide con el hash enviamos error
      if (bcrypt.compareSync(password, user.password) === false) {
        res.render('/', { errorMessage: 'Contraseña incorrecta' })
        return
      }

      //5. Enganchar el objeto de usuario al req.session
      req.session.currentUser = user
      console.log(req.session)
      ///////////TODO PROFILE CLIENT
      res.redirect("/client/dashboard")
    })
    .catch(err => console.log(err))
})


// LOGOUT

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})


// ----------------------------------------------------------------------------------------------------//



module.exports = router;
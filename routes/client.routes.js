const router = require("express").Router();
const Client = require("../models/User.model")
const bcrypt = require("bcrypt")
////LOGICA DE SIGNUP////////

// router.get("/client-signup", (req, res) => res.render("authClient/signupClient"))

router.post("/", (req, res) => {

  const { fullName, email, password, role } = req.body

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


        Client.create({ fullName, email, role: 'Client', password: hashPass })
          .then(createdUser => res.redirect("/"))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))

})
/////////FIN LOGICA SIGNUP/////////////
/////////LOGICA LOGIN/////////////
// router.get("/", (req, res) => {
//   res.render("index")
// })



// LOGIN

router.post("/", (req, res) => {

  

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
        res.render("client/client-dashboard")
      })
      .catch(err => console.log(err))
  })



  // DASHBOARD CLIENTE

  router.get("/dashboard", (req, res) => {
    res.render("client/client-dashboard")
    console.log('--------------------------------')
  })




  
  
  router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
  })


/////////LOGICA LOGIN/////////////

module.exports = router;
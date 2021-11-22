const router = require("express").Router();
const Worker = require("../models/User.model")
const bcrypt = require("bcrypt")


////LOGICA DE SIGNUP///////
router.post("/", (req, res) => {

  const { fullName, email, password, role } = req.body

  //Comprobamos si existe el usuario
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


        Worker.create({ fullName, email, role: 'Worker', password: hashPass })
          .then(createdUser => res.redirect("/"))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))
})
/////////FIN LOGICA SIGNUP/////////////
/////////LOGICA LOGIN/////////////
// router.get("/worker-login", (req, res) => {
//   // res.render("worker/loginWorker")
// })

router.post("/", (req, res) => {

  

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
        console.log(req.session)
    /////////////// TODO PROFILE WORKER
        res.redirect("/dashboard")
      })
      .catch(err => console.log(err))
  })


  // DASHBOARD WORKER

  router.get("/dashboard", (req, res) => {
    res.render("worker/worker-dashboard")
  })



  
  
  router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
  })


/////////LOGICA LOGIN/////////////

module.exports = router;
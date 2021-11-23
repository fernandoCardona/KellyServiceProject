const router = require("express").Router();
const Worker = require("../models/User.model")
const bcrypt = require("bcrypt");
const { restart } = require("nodemon");


////LOGICA DE SIGNUP///////
router.post("/", (req, res) => {

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
/////////FIN LOGICA SIGNUP/////////////
/////////LOGICA LOGIN/////////////
// router.get("/worker-login", (req, res) => {
//   // res.render("worker/loginWorker")
// })

//LOGIN
 // DASHBOARD WORKER

router.get("/dashboard", (req, res) => {

  const currentUser = req.session.currentUser;

  res.render("worker/worker-dashboard", currentUser)
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
        console.log(req.session)
    /////////////// TODO PROFILE WORKER
        res.redirect("/worker/dashboard")
      })
      .catch(err => console.log(err))
  })


 
  
  router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
  })


/////////LOGICA LOGIN/////////////

module.exports = router;
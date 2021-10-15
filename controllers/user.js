require('dotenv').config();
const User = require('../models/User')
const nodemailer = require("nodemailer");
const generator = require('generate-password');
const controller = {} // Objeto vazio
const bcrypt = require('bcrypt');

controller.signup = async (req, res) => {
   let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
 /* } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });  */
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Email inserido inválido",
    });
  /*}  else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid date of birth entered",
    });  */
   } else if (password.length < 5) {
      res.json({
        status: "FAILED",
        message: "A senha é muito curta!",
      });
    } else {
      // Checking if user already exists
      User.find({ email })
        .then((result) => {
          if (result.length) {
            // A user already exists
            res.json({
              status: "FAILED",
              message: "O usuário com o e-mail já existe",
            });
          } else {
            // Try to create new user
  
            // password handling
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                const newUser = new User({
                  //name,
                  email,
                  password: hashedPassword,
                  //dateOfBirth,
                });
  
                newUser
                  .save()
                  .then((result) => {
                    res.json({
                      status: "SUCCESS",
                      message: "Signup successful",
                      data: result,
                    });
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "An error occurred while saving user account!",
                    });
                  });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while hashing password!",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user!",
          });
        });
    }

}


controller.signin = async (req, res) => {
   let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }

}

controller.recuperaPassword = async (req, res) => {
   let { email } = req.body;
  email = email.trim();

  if (email == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
   // Check if user exist
   const data = await User.find({ email  }, {password: 0})
      //console.log('data: ',data[0].email)
      
      if (data.length) {
         const password = generator.generate({
            length: 10,
            numbers: true
         });

         const transporte =  nodemailer.createTransport({
            host: 'smtp.hostinger.com',
                port: 465,
                secure: true, //SSL/TLS
                auth: {
                    user: process.env.nodemailerUserRecuperaSenha,
                    pass: process.env.nodemailerPassRecuperaSenha
                }
        })
    
        transporte.sendMail({
            from: process.env.nodemailerUserRecuperaSenha,
            to: data[0].email,
            subject: `Recuperação de senha - App Comparando`,
            //text: mensagem,
            html: `<p>Olá, tudo bem? </p>
            <p>Você pediu para recuperar a sua senha</p>
            <p>Geramos uma nova senha para você, caso deseje trocar a senha basta logar no app e ir na opção de alterar senha.</p>
            <p>sua nova senha é: <b>${password}</b></p>
            <br><p>Atenciosamente,</b></p>`
        }).then(info => {
            //console.log('info: ', info)
            //User.updateOne({email: email}, { $set: {password: password}} )
           
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                User.updateOne({email: email}, { $set: {password: hashedPassword}}, function(err, res) {
                  if (err) throw err;
                  console.log("1 document updated SENHA ");
                 });
              })

            res.send({error: false, message: 'E-mail enviado com sucesso'})
        }).catch(error => {
            console.log('error: ', error)
            res.send({error: false, message: 'E-mail não encontrado'})
        })

      } else {
         res.send({error: true, message: 'E-mail não encontrado'})
      }
      
      
   }  
}

controller.finduser = async (req, res) => {
   console.log('Busca USER', )
   const { email } = req.body
   //let teste = "rsr@gmail.com"
   try {
      console.log(req.body)
      const data = await User.find({email: email},{password: 0})
      console.log('CHEGOU ALGO',data)
      
        res.send({data})
        res.status(201).end()
      
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      //console.log('---> ', erro.code)
        if (erro.name = 'MongoError') {
            //res.status(400).send(erro)
        } else {
            //res.status(500).send(erro)
        }

      
   }
}

controller.createUserPeloEmail = async (req, res) => {
   console.log('NOVO USER CRIADO')
   try {

    const data = await User.create(req.body)
    
    if(data._id) {
      res.send({"error": false})
      res.status(201).end()
    }
    
   
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro.name)
      if (erro.name === 'MongoError' && erro.code === 11000) {
        res.status(400).send({error: 'E-mail já existe'})
      } else {
        res.status(500).send(erro)
      }
      
   }
}

module.exports = controller
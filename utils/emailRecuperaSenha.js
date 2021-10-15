const nodemailer = require("nodemailer");
 
// EMAIL: recuperasenha-appcomparando@msmultisistema.com
// SENHA : @Testando12345

async function recuperaSenha() {

    const transporte = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
            port: 465,
            secure: true, //SSL/TLS
            auth: {
                user: 'recuperasenha-appcomparando@msmultisistema.com',
                pass: '@Testando12345'
            }
    })

    transporte.sendMail({
        from: "recuperasenha-appcomparando@msmultisistema.com",
        to: 'rodrigo.s.romualdo@gmail.com',
        subject: `te enviou uma mensagem`,
        //text: mensagem,
        html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }).then(info => {
        console.log('info: ', info)
        return res.send('Email enviado')
    }).catch(error => {
        console.log('error: ', error)
        return res.send('Error ao Enviar e-mail')
    })
  

}

module.exports = recuperaSenha
// @ts-nocheck
const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   email: {type: String, required: true, unique: [true, "email deve ser unico"]},
   password: {
        type: String,
        required: true // Atributo obrigatório se tiver TRUE
    },
    token: {
        type: String,
        required: false // Atributo obrigatório se tiver TRUE
    },
    outro_sistema_login: {
        type: Boolean,
     },
    
})

module.exports = mongoose.model('users', esquema, 'users')









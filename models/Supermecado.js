// @ts-nocheck
const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   razao_social: {
      type: String,
      //required: false // Atributo obrigatório
   },
   dataCadastro: {
      type: Date,
      default: Date.now()
   },
   nome_fantasia: {
      type: String,
      //required: false
   },
   cnpj: {
      type: String,
      //required: false
   },
   endereco: {
      type: String,
      //required: false
   },
   estado: {
      type: String,
      //required: false
   },
   municipio: {
      type: String,
      //required: false
   },
   telefone: {
      type: String,
      //required: false
   },
   celular: {
      type: String,
      //required: false
   },
   email: {
      type: String,
      //required: false
   },
   location: {
      type: { type: String},
      coordinates: [],
   },

});

esquema.index({ location: '2dsphere' })

/*
   Parâmetros de mongoose.model():
   1º -> o nome do modelo (entidade)
   2º -> a descrição da estrutura (esquema) da entidade
   3º -> o nome da coleção (collection) onde os objetos
      criados a partir do modelo serão armazenados no MongoDB
*/
module.exports = mongoose.model('Supermecado', esquema, 'supermecados')
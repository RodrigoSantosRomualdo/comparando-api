// @ts-nocheck
const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   categoria: {
      type: String,
      required: false
   },
   descricao: {
      type: String,
      required: false // Atributo obrigatório se tiver TRUE
   },
   codigo_barras: {
    type: String,
    required: false // Atributo obrigatório se tiver TRUE
   },
   preco_venda: {
      type: Number,
      required: false,
      min: 0
   },
   data_validade: {
      Type: Date,
      required: false,
   },
   quantidade: {
      type: Number,
      required: false,
      min: 0
   },
   unidade_medida: {
      type: String,   // Unidade, peça, kg, litro, m2...
      required: false
   },
   
   // Fererência Posto_Combustivel
   posto_combustivel: {
       type: mongoose.ObjectId,
       ref: 'PostoCombustivel', // Nome do model referenciado
       //required: true
       required: true
   }
})

/*
   Parâmetros de mongoose.model():
   1º -> o nome do modelo (entidade)
   2º -> a descrição da estrutura (esquema) da entidade
   3º -> o nome da coleção (collection) onde os objetos
      criados a partir do modelo serão armazenados no MongoDB
*/
module.exports = mongoose.model('PrecosCombustivel', esquema, 'PrecosCombustivel')
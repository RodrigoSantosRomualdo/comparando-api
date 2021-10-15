// @ts-nocheck
const mongoose = require('mongoose')

const esquema = mongoose.Schema({
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
   categoria: {
      type: String,
      required: false
   },
   // Fererência Supermecados
   supermecado: {
       type: mongoose.ObjectId,
       ref: 'Supermecado', // Nome do model referenciado
       //required: true
       required: false
   }
})

/*
   Parâmetros de mongoose.model():
   1º -> o nome do modelo (entidade)
   2º -> a descrição da estrutura (esquema) da entidade
   3º -> o nome da coleção (collection) onde os objetos
      criados a partir do modelo serão armazenados no MongoDB
*/
module.exports = mongoose.model('ProdutoMercado', esquema, 'produtosMercados')
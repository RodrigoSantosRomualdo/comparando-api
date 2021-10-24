const ProdutoMercado = require('../models/ProdutoMercado')
//const { find } = require('../models/Supermecado')
//const Supermecado = require('../models/Supermecado')

const controller = {} // Objeto vazio 

controller.novo = async (req, res) => {
   console.log('NOVO PRODUTO MERCADO')
   try {
      await ProdutoMercado.create(req.body)
      // HTTP status 201: Created (criado)

      res.send({"resposta": "Produdo cadastrado com sucesso!"})
      res.status(201).end()
     
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.listar = async (req, res) => {
   console.log('listar PRODUTO MERCADO')
   // Se houver query string, desvia para busca personalizada
   if(Object.keys(req.query).length > 0) {
      busca(req, res)
   }
   else {
   
      try {
         // find() sem parâmetros: retorna todos
         // O parâmetro populate() é o *ATRIBUTO* relacionado model supermecado
         //const lista = await ProdutoMercado.find().populate('supermecado')
         const lista = await ProdutoMercado.find().populate('supermecado')
         res.send(lista) // O status HTTP 200 (OK) é implícito
      }
      catch(erro) {
         console.log(erro)
         res.status(500).send(erro)
      }
   }
}


controller.buscarIdSup_UnidadeMed_Desc = async (req, res) => {
   
   console.log('obterPelaDescricao PRODUTO MERCADO buscarIdSup_UnidadeMed_Desc')
   console.log(req.body)
   const {id, unidade_medida, descricao} = req.body; 
   let maxDistance = 300; 
   let obj
   console.log('UNIDADE MEDIDA --> ',req.body.unidade_medida)

   try {

     if (unidade_medida) {
     obj = await ProdutoMercado.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1}).populate('supermecado')
     //console.log('OBJ 1', obj)
   } else {
     obj = await ProdutoMercado.find({supermecado: id, descricao: new RegExp(descricao, 'i')}).sort({preco_venda: 1}).populate('supermecado')
     //console.log('OBJ 2', obj)
   }   
   console.log('idddd ', id.length)
     //console.log('obj ',obj)
      if(id.length === 0) { // obj foi encontrado
         console.log('ENTREOU AQUI')
         res.send({error: false, status: 0, message: "Nenhum supermecado ou produto encontrado perto de você!"}) // HTTP 200
      } else if(obj) {
         res.send(obj) // HTTP 200
      }
      else {
         // HTTP 404: Not found
         res.status(404).end()
      }
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}
 //var NumberLong = require('mongodb').NumberLong;
    //var Long = require('mongodb').Long;
   //let maxDistance = 3000;  codigo_barras: codigo_barras

   //var value = Long.fromString("635186135151387725");
   //console.log( value );


controller.buscar_codigo_barras_findone = async (req, res) => {
   
   console.log('buscar_codigo_barras')
   console.log(req.body)
   const {codigo_barras} = req.body; 
   
   try {
     console.log('codigo_barras: ', codigo_barras)
     const obj = await ProdutoMercado.findOne({codigo_barras: codigo_barras }).populate('supermecado')
     //console.log('obj: ', obj)
     res.send(obj)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.buscar_codigo_barras_findall = async (req, res) => {
   
   console.log('buscar_codigo_barras buscar_codigo_barras_findall')
   console.log(req.body)
   const {codigo_barras, id} = req.body; 
   
   try {
     console.log('codigo_barras: ', codigo_barras)
     const obj = await ProdutoMercado.find({supermecado: id, codigo_barras: codigo_barras }).populate('supermecado')
     //console.log('obj: ', obj)
     if (id.length === 0) {
      res.send({error: false, status: 0, message: "Nenhum supermecado encontrado perto de você!"})
     } else if (obj.length === 0) {
      res.send({error: false, status: 0, message: "Nenhum supermecado ou produto foi encontrado perto de você!"})
     } else {
      res.send(obj)
     }
     
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}


controller.obterUm = async (req, res) => {
   console.log('OBTER UM PRODUTO MERCADO')
   try {
      const id = req.params.id
      const obj = await ProdutoMercado.findById(id)
      if(obj) { // obj foi encontrado
         res.send(obj) // HTTP 200
      }
      else {
         // HTTP 404: Not found
         res.status(404).end()
      }
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.obterPelaDescricao = async (req, res) => {
   console.log('obterPelaDescricao PRODUTO MERCADO')
   console.log(req.body)
   const {id, unidade_medida} = req.body;  
   //let obj
   console.log('UNIDADE MEDIDA ',req.body.unidade_medida)
   try {

   
      
     //const obj = await ProdutoMercado.find({_id: req.body.id, unidade_medida: req.body.unidade_medida}).sort({preco_venda: 1})
      
     if (unidade_medida) {
     obj = await ProdutoMercado.find({_id: id, unidade_medida: unidade_medida}).sort({preco_venda: 1})
     } else {
     obj = await ProdutoMercado.find({_id: id}).sort({preco_venda: 1})
   }  
     
      if(obj) { // obj foi encontrado
         res.send(obj) // HTTP 200
      }
      else {
         // HTTP 404: Not found
         res.status(404).end()
      }
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.atualizar = async (req, res) => {
   console.log('atualizar PRODUTO MERCADO')
   try {
      const id = req.body._id
      const obj = await ProdutoMercado.findByIdAndUpdate(id, req.body)
      if(obj) { // obj foi encontrado e atualizado 
         // HTTP 204: No content
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.excluir = async (req, res) => {
   console.log('excluir PRODUTO MERCADO')
   try {
      const id = req.body._id
      const obj = await ProdutoMercado.findByIdAndDelete(id)
      if(obj) {
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

async function busca (req, res) {
   
   let criterio = {}
   let atrib = Object.keys(req.query)[0]
   let valor = Object.values(req.query)[0]
   
   // /i no final da expressão regular significa que a
   // busca será case insensitive
   criterio[atrib] = { $regex: valor, $options: 'i' }
   console.log(criterio)
   
   try{
      let lista = await ProdutoMercado.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }

}

module.exports = controller
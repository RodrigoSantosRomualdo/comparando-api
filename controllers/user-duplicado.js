const User = require('../models/User')
const { find } = require('../models/Supermecado')

const controller = {} // Objeto vazio

controller.createuser = async (req, res) => {
   console.log('NOVO USER CRIADO')
   try {
      console.log(req.body)

    await User.create(req.body)
    res.status(201).end()
   
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

controller.finduser = async (req, res) => {
   console.log('Busca USER')
   let teste = "rsr@gmail.com"
   try {
      console.log(req.body)
      const obj = await User.find({email: teste},{password: 0})
      console.log('CHEGOU ALGO',obj)

    
        res.send(obj)
        res.status(201).end()
      
      

      /* if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await User.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "existe": true})
         res.status(201).end()
      }  */
    
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

controller.findlist = async (req, res) => {
   console.log('FIND NA LISTA SELECIONADA')
   try {
      console.log(req.body)
      const obj = await User.find({id_user: req.body.id_user,
         nome_lista: req.body.nome_lista,
         primeira_lista_true: false }).sort({ data_cadastro : -1})
      console.log('Se igual a 0 é vazio: ',obj.length)

      res.send(obj)
      res.status(201).end()

      /* if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await User.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "existe": true})
         res.status(201).end()
      }  */
    
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.createprodutolista = async (req, res) => {
   console.log('NOVA LISTA USER SUPERMECADO')
   try {
      console.log(req.body)
      /*const obj = await User.find($AND([{nome_lista: req.body.id_user,
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true }])) */
      
        // const obj = await User.find({nome_lista: req.body.id_user
          //  ,nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true})


         const obj = await User.create({
            id_user: req.body.id_user,
            id_produto: req.body._id,
            nome_lista: req.body.nome_lista, 
            primeira_lista_true: false,
            descricao: req.body.descricao,
            codigo_barras: req.body.codigo_barras,
            preco_venda: req.body.preco_barras,
            quantidade: req.body.quantidade,
            unidade_medida: req.body.unidade_medica,
            categoria: req.body.categoria,
            supermecado: req.body.supermecado
         })

            res.send({"resposta": "Lista de produto criado com sucesso"})
            res.status(201).end()
      
         console.log('Se igual a 0 é vazio: ',obj.length)
         console.log('---',obj)
      /*if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "status": 0})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await User.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "status": 1})
         res.status(201).end()
      } */
      //obj = await User.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
      //console.log('OBJ 1', obj)

      //await User.create(req.body)
      // HTTP status 201: Created (criado)

      //res.send({"resposta": "LISTA cadastrado com sucesso!"})
      //res.status(201).end()
     
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}


controller.addlista = async (req, res) => {
   console.log('ADD MINHA LISTA')
   try {
      console.log(req.body)
      const obj = await User.find({nome_lista: req.body.id_user, 
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true })
      console.log('Se igual a 0 é vazio: ',obj.length)
      if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await User.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "existe": true})
         res.status(201).end()
      }
    
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
         //const lista = await User.find().populate('supermecado')
         //const lista = await User.find().populate('supermecado')
         const lista = await User.find()
         res.send(lista) // O status HTTP 200 (OK) é implícito
      }
      catch(erro) {
         console.log(erro)
         res.status(500).send(erro)
      }
   }
}


controller.findlista = async (req, res) => {
   
   console.log('obterPelaDescricao PRODUTO MERCADO findlista')
   console.log(req.body)
   const {id, unidade_medida, descricao} = req.body; 
   let maxDistance = 300000; 
   let obj
   console.log('UNIDADE MEDIDA ',req.body.unidade_medida)
   

   try {
      

     if (unidade_medida) {
     obj = await User.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
     console.log('OBJ 1', obj)
   } else {
     obj = await User.find({supermecado: id, descricao: new RegExp(descricao, 'i')}).sort({preco_venda: 1}).populate('supermecado')
     console.log('OBJ 2', obj)
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


controller.obterUm = async (req, res) => {
   console.log('OBTER UM PRODUTO MERCADO')
   try {
      const id = req.params.id
      const obj = await User.findById(id)
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

   
      
     //const obj = await User.find({_id: req.body.id, unidade_medida: req.body.unidade_medida}).sort({preco_venda: 1})
      
     if (unidade_medida) {
     obj = await User.find({_id: id, unidade_medida: unidade_medida}).sort({preco_venda: 1})
     } else {
     obj = await User.find({_id: id}).sort({preco_venda: 1})
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
      const obj = await User.findByIdAndUpdate(id, req.body)
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
      const obj = await User.findByIdAndDelete(id)
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
      let lista = await User.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }

}

module.exports = controller
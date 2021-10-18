const { find } = require('../models/Supermecado')
const PostoCombustivel = require('../models/PostoCombustivel')

const controller = {} // Objeto vazio

controller.novo = async (req, res) => {
   console.log('REQ NOVO SUPERMECADO ')
   try {
      await PostoCombustivel.create(req.body)
      // HTTP status 201: Created (criado)
      res.status(201).end()
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}

// FAZENDO PARA VERIFICAR O LOCAL DE CADA ESTABELECIMENTO

controller.location = async (req, res) => {
   console.log('req PASSOU location COMBUSTIVEL', req.body)
   
   let maxDistance = 200000;
   //let coordinates = [-20.255341918373244, -40.29290930653548],
   if (req.body.maxDistance) {
      console.log('ENTROUNO IF')
      maxDistance = req.body.distancia;
   }  
   //const id = req.params.id

   try {
      const obj = await PostoCombustivel.aggregate([
         {
            $geoNear: {
               near: {
                  type: 'Point',
                  coordinates: req.body.coordinates
               },
               distanceField: 'location_distance',
               spherical: true,
               maxDistance: maxDistance
            }
         }
      ])

      
      if(obj) { // obj foi encontrado
         //res.send(obj) // HTTP 200
         res.send(obj)
         //console.log(obj)
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
// FIM TESTE LOCAL ESTABELECIMENTO



controller.listar = async (req, res) => {
   console.log('req LISTAR  ')
   // Se houver query string, desvia para busca personalizada
   if(Object.keys(req.query).length > 0) {
      busca(req, res)
   }
   else {
   
      try {
         // find() sem parâmetros: retorna todos
         const lista = await PostoCombustivel.find()
         res.send(lista) // O status HTTP 200 (OK) é implícito
      }
      catch(erro) {
         console.log(erro)
         res.status(500).send(erro)
      }
   }
}  

controller.obterUm = async (req, res) => {
   console.log('req obterUm')
   try {
      const id = req.params.id
      const obj = await PostoCombustivel.findById(id)
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

controller.locationn = async (req, res) => {
   
   console.log('AQUI LOCATION req ')
   
   try {
      const id = req.params.id
      const { coordinates } = req.body

      const obj = await PostoCombustivel.findByIdAndUpdate(id, {
         location: {
            type: 'Point',
            coordinates,
         }
      })
      
      
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
   console.log('req atualizar')
   try {
      const id = req.body._id
      const obj = await PostoCombustivel.findByIdAndUpdate(id, req.body)
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
   console.log('req excluir',)
   try {
      const id = req.body._id
      const obj = await PostoCombustivel.findByIdAndDelete(id)
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
   console.log('req busca',)
   let criterio = {}
   let atrib = Object.keys(req.query)[0]
   let valor = Object.values(req.query)[0]
   
   // /i no final da expressão regular significa que a
   // busca será case insensitive
   criterio[atrib] = { $regex: valor, $options: 'i' }
   console.log(criterio)
   
   try{
      let lista = await PostoCombustivel.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }

}

module.exports = controller
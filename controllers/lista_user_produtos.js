const ListaUserProdutos = require('../models/ListaUserProdutos')
const { supermecado } = require('../models/Supermecado')

const controller = {} // Objeto vazio

controller.createlista = async (req, res) => {
   console.log('NOVA LISTA USER SUPERMECADO')
   try {
      console.log(req.body)
      /*const obj = await ListaUserProdutos.find($AND([{nome_lista: req.body.id_user,  
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true }])) */
      
        // const obj = await ListaUserProdutos.find({nome_lista: req.body.id_user
          //  ,nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true})

          const resultFind = await ListaUserProdutos.findOne({id_user: req.body.id_user, 
            primeira_lista_true: true, lista_padrao_add_produto : true })
            console.log('resultFind: ',resultFind)

            if(resultFind !== null) {
               console.log('ENTROU AQUI QUANDO PRECISO')
               ListaUserProdutos.updateOne({id_user: req.body.id_user, 
                  primeira_lista_true: true, lista_padrao_add_produto : true },
                  { $set: {lista_padrao_add_produto: false}}, function(err, res) {
                  if (err) throw err;
                  console.log("1 document Atualizado para False");
                 });
            }

         const obj = await ListaUserProdutos.find({id_user: req.body.id_user, nome_lista: req.body.nome_lista, 
            primeira_lista_true: req.body.primeira_lista_true, lista_padrao_add_produto: req.body.lista_padrao_add_produto })
      
         console.log('Se igual a 0 é vazio: ',obj.length)
         console.log('---',obj)
      if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "status": 0})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "status": 1})
         res.status(201).end()
      } 
      //obj = await ListaUserProdutos.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
      //console.log('OBJ 1', obj)

      //await ListaUserProdutos.create(req.body)
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

controller.findlistpadrao = async (req, res) => {
   console.log('NOVA LISTA USER SUPERMECADO')
   try {
      console.log(req.body)
      /*const obj = await ListaUserProdutos.find($AND([{nome_lista: req.body.id_user,  
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true }])) */
      
        // const obj = await ListaUserProdutos.find({nome_lista: req.body.id_user
          //  ,nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true})

          const obj = await ListaUserProdutos.findOne({id_user: req.body.id_user, 
            primeira_lista_true: true, lista_padrao_add_produto : true})
            console.log('resultFind: ',obj)

            res.send(obj)


      /*
            if(resultFind !== null) {
               console.log('ENTROU AQUI QUANDO PRECISO')
               ListaUserProdutos.updateOne({id_user: req.body.id_user, 
                  primeira_lista_true: true, lista_padrao_add_produto : true },
                  { $set: {lista_padrao_add_produto: false}}, function(err, res) {
                  if (err) throw err;
                  console.log("1 document Atualizado para False");
                 });
            }

         const obj = await ListaUserProdutos.find({id_user: req.body.id_user, nome_lista: req.body.nome_lista, 
            primeira_lista_true: req.body.primeira_lista_true, lista_padrao_add_produto: req.body.lista_padrao_add_produto })
      
         console.log('Se igual a 0 é vazio: ',obj.length)
         console.log('---',obj)
      if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "status": 0})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "status": 1})
         res.status(201).end()
      }  */
      //obj = await ListaUserProdutos.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
      //console.log('OBJ 1', obj)

      //await ListaUserProdutos.create(req.body)
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

controller.updatefindlistpadrao = async (req, res) => {
   console.log('updatefindlistpadrao LISTA PADRAO')
   try {
      console.log('updatefindlistpadrao: ', req.body)
      /*const obj = await ListaUserProdutos.find($AND([{nome_lista: req.body.id_user,  
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true }])) */
      
        // const obj = await ListaUserProdutos.find({nome_lista: req.body.id_user
          //  ,nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true})

          const resultFind = await ListaUserProdutos.findOne({id_user: req.body.id_user, 
            primeira_lista_true: true, lista_padrao_add_produto : true })
            console.log('resultFind: ',resultFind)

            if(resultFind !== null) {
               console.log('ENTROU AQUI QUANDO PRECISO')
               const resultUpdate = await ListaUserProdutos.updateOne({id_user: req.body.id_user, 
                  primeira_lista_true: true, lista_padrao_add_produto : true },
                  { $set: {lista_padrao_add_produto: false}}, function(err, res) {
                  if (err) throw err;
                  console.log("1 document Atualizado para False updatefindlistpadrao");
                  
               });
               console.log(resultUpdate.ok)
               if (resultUpdate.ok === 1) {
                  const updateListPadrao = await ListaUserProdutos.updateOne({id_user: req.body.id_user, 
                     primeira_lista_true: true, nome_lista : req.body.nome_lista },
                     { $set: {lista_padrao_add_produto: true}}, function(err, res) {
                     if (err) throw err;
                     console.log("1 document Atualizado para False updateListPadrao");
                  });
                  if (updateListPadrao.ok === 1) {
                     res.send({error: false, message: "Atualização realizada com sucesso!"})
                  } else {
                     res.send({error: true, message: "Não foi possível alterar agora, tente mais tarde!"})
                  }
                  
               } else {
                  res.send({error: true, message: "Não foi possível alterar agora, tente mais tarde!"})
               }
            } else {
               console.log('NÂO TEM NENHUMA LISTA PADRAO')
               const updateListPadrao = await ListaUserProdutos.updateOne({id_user: req.body.id_user, 
                  primeira_lista_true: true, nome_lista : req.body.nome_lista },
                  { $set: {lista_padrao_add_produto: true}}, function(err, res) {
                  if (err) throw err;
                  console.log("1 document Atualizado para False updateListPadrao");
               });
               if (updateListPadrao.ok === 1) {
                  res.send({error: false, message: "Atualização realizada com sucesso!"})
               } else {
                  res.send({error: true, message: "Não foi possível alterar agora, tente mais tarde!"})
               }
            }   

        /* const obj = await ListaUserProdutos.find({id_user: req.body.id_user, nome_lista: req.body.nome_lista, 
            primeira_lista_true: req.body.primeira_lista_true, lista_padrao_add_produto: req.body.lista_padrao_add_produto })
      
         console.log('Se igual a 0 é vazio: ',obj.length)
         console.log('---',obj)
         res.send(obj) */
     /* if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "status": 0})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "status": 1})
         res.status(201).end()
      } */

   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}




controller.findlistaall = async (req, res) => {
   console.log('FIND MINHA LISTA')
   try {
      console.log(req.body)
      const obj = await ListaUserProdutos.find({id_user: req.body.id_user, 
         primeira_lista_true: true }).sort({ data_cadastro: -1})
      console.log('Se igual a 0 é vazio: ',obj.length)
      
      if (obj.length === 0) {
         res.send({message: "Não existe lista para o seu usuário", status: 0})
         res.status(201).end()
      } else {
         res.send(obj)
         res.status(201).end()
      }
      

      /* if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
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

controller.findlistaddProdpadrao = async (req, res) => {
   console.log('FIND MINHA LISTA lista_padrao_add_produto VERIFICAR SE PRECISA ')
   try {
      console.log(req.body)
      const obj = await ListaUserProdutos.find({id_user: req.body.id_user, 
         primeira_lista_true: true }).sort({ data_cadastro: -1})
      console.log('Se igual a 0 é vazio: ',obj.length)
      
      if (obj.length === 0) {
         res.send({message: "Não existe lista para o seu usuário", status: 0})
         res.status(201).end()
      } else {
         res.send(obj)
         res.status(201).end()
      }
      
   }
   catch(erro) {
      // HTTP status 500: Internal Server Error
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.findlistprod = async (req, res) => {
   console.log('FIND NA LISTA SELECIONADA')
   try {
      console.log(req.body)
      const obj = await ListaUserProdutos.find({id_user: req.body.id_user,
         nome_lista: req.body.nome_lista,
         primeira_lista_true: false }).sort({ data_cadastro : -1}).populate('supermecado')
      console.log('Se igual a 0 é vazio: ',obj.length)

      res.send(obj)
      res.status(201).end()

      /* if (obj.length === 1) {  {id_user: "6136be273d77ff5c8179eb74", primeira_lista_true: false}
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
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

controller.findfilterlistprod = async (req, res) => {
   console.log('FIND NA LISTA SELECIONADA')
 /*  "filterprodutos": "Mercado"
   "filterprodutos": "Maior Preço"
   "filterprodutos": "Menor Preço"   */
   try {
      console.log(req.body)
      let obg = {};

      if (req.body.filterprodutos === 'Mercado') {
         obj = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ 'supermecado' : -1}).populate('supermecado')
      } else if (req.body.filterprodutos === 'Maior Preço') {
         console.log('Maior Preço UN')
         obj = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ 'preco_venda' : -1}).populate('supermecado')
      } else if (req.body.filterprodutos === 'Menor Preço') {
         console.log('Menor Preço UN')
         obj = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ 'preco_venda' : 1}).populate('supermecado')
      } else if (req.body.filterprodutos === 'Maior Preço Total') {
         console.log('Maior Preço Total')
         obj = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ 'preco_total' : -1}).populate('supermecado')
      } else if (req.body.filterprodutos === 'Menor Preço Total') {
         console.log('Menor Preço Total')
         obj = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ 'preco_total' : 1}).populate('supermecado')
      }





      /*
      const obj = await ListaUserProdutos.find({id_user: req.body.id_user,
         nome_lista: req.body.nome_lista,
         primeira_lista_true: false }).sort({ data_cadastro : -1}).populate('supermecado')
      console.log('Se igual a 0 é vazio: ',obj.length) */

      res.send(obj)
      res.status(201).end()

      /* if (obj.length === 1) {  {id_user: "6136be273d77ff5c8179eb74", primeira_lista_true: false}
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
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
      /*const obj = await ListaUserProdutos.find($AND([{nome_lista: req.body.id_user,
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true }])) */
      
        // const obj = await ListaUserProdutos.find({nome_lista: req.body.id_user
          //  ,nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true})


         const obj = await ListaUserProdutos.create({
            id_user: req.body.id_user, 
            nome_lista: req.body.nome_lista, 
            primeira_lista_true: false,
            descricao: req.body.descricao,
            codigo_barras: req.body.codigo_barras,
            preco_venda: req.body.preco_venda,
            quantidade: req.body.quantidade,
            unidade_medida: req.body.unidade_medica,
            categoria: req.body.categoria,
            supermecado: req.body.supermecado,
            preco_total: req.body.preco_total
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
         await ListaUserProdutos.create(req.body)
         res.send({"resposta": "LISTA cadastrado com sucesso!", "status": 1})
         res.status(201).end()
      } */
      //obj = await ListaUserProdutos.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
      //console.log('OBJ 1', obj)

      //await ListaUserProdutos.create(req.body)
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
      const obj = await ListaUserProdutos.find({nome_lista: req.body.id_user, 
         nome_lista: req.body.nome_lista, primeira_lista_true: req.body.primeira_lista_true })
      console.log('Se igual a 0 é vazio: ',obj.length)
      if (obj.length === 1) {
         console.log('ID --- ENCONTRADO')
         res.send({"resposta": "Lista de produto já existe", "existe": true})
         res.status(201).end()
      }
      if (obj.length === 0) {
         console.log('ID NÂO ENCONTRADO')
         await ListaUserProdutos.create(req.body)
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
         //const lista = await ListaUserProdutos.find().populate('supermecado')
         //const lista = await ListaUserProdutos.find().populate('supermecado')
         const lista = await ListaUserProdutos.find()
         res.send(lista) // O status HTTP 200 (OK) é implícito
      }
      catch(erro) {
         console.log(erro)
         res.status(500).send(erro)
      }
   }
}


controller.findlista = async (req, res) => {
   
   console.log('obterPelaDescricao PRODUTO MERCADO')
   console.log(req.body)
   const {id, unidade_medida, descricao} = req.body; 
   let maxDistance = 3000; 
   let obj
   console.log('UNIDADE MEDIDA ',req.body.unidade_medida)
   

   try {
      

     if (unidade_medida) {
     obj = await ListaUserProdutos.find({supermecado: id, unidade_medida: unidade_medida, descricao: new RegExp(descricao, 'i') }).sort({preco_venda: 1})
     console.log('OBJ 1', obj)
   } else {
     obj = await ListaUserProdutos.find({supermecado: id, descricao: new RegExp(descricao, 'i')}).sort({preco_venda: 1}).populate('supermecado')
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
   console.log('OBTER UM PRODUTO MERCADO ', req.body)
   try {
      const obj = await ListaUserProdutos.findOne({id_user: req.body.id_user, nome_lista: req.body.nome_lista,
         primeira_lista_true: true })

         console.log('obj: ', obj)
      if(obj === null) { // obj foi encontrado
         res.send({erro: false, status: 0, message: "Não é possível criar lista duplicada!"})
      } else if (obj.length !== 0) {
         res.send({erro: false, status: 1, message: "Lista já existe, não é possível criar uma lista igual!"})
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
      
     //const obj = await ListaUserProdutos.find({_id: req.body.id, unidade_medida: req.body.unidade_medida}).sort({preco_venda: 1})
      
     if (unidade_medida) {
     obj = await ListaUserProdutos.find({_id: id, unidade_medida: unidade_medida}).sort({preco_venda: 1})
     } else {
     obj = await ListaUserProdutos.find({_id: id}).sort({preco_venda: 1})
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

controller.excluirProdutoList = async (req, res) => {
   console.log('excluir PRODUTO MERCADO: ', req.body) 
   try {
      //const id = req.body._id
      const obj = await ListaUserProdutos.findByIdAndDelete(req.body._id)
      //console.log('obj: ', obj)
      if(obj) {

         const objFind = await ListaUserProdutos.find({id_user: req.body.id_user,
            nome_lista: req.body.nome_lista,
            primeira_lista_true: false }).sort({ data_cadastro : -1}).populate('supermecado')
         console.log('Se igual a 0 é vazio: ',objFind.length)
   
         res.send(objFind)
         res.status(201).end()
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

controller.excluirList = async (req, res) => {
   
   try {
      console.log('excluir excluirList MERCADO: ', req.body) 
      let obj = [];
      //const objDelete = await ListaUserProdutos.findByIdAndDelete(req.body._id)
      const objDelete = await ListaUserProdutos.deleteMany({id_user: req.body.id_user, nome_lista: req.body.nome_lista })
      console.log('objDelete::: ', objDelete)

      if (objDelete === null) {
         res.send({error: false, message: "Lista não encontrada para excluir!"})
      } else {
         obj = await ListaUserProdutos.find({id_user: req.body.id_user, 
            primeira_lista_true: true }).sort({ data_cadastro: -1})
            console.log('Se igual a 0 é vazio: ',obj.length)

            res.send({error: false, obj})

      }

      /*
      const objDelete = await ListaUserProdutos.findByIdAndDelete(req.body._id)
      console.log('objDelete::: ', objDelete)
      if (objDelete) {
         obj = await ListaUserProdutos.find({id_user: req.body.id_user, 
         primeira_lista_true: true }).sort({ data_cadastro: -1})
         console.log('Se igual a 0 é vazio: ',obj.length)
      
         console.log(obj)
         res.send({error: false, obj})
      }

       */

      
  /*

      let obj = await ListaUserProdutos.find({id_user: "marcosgbr19@gmail.com", 
         primeira_lista_true: true }).sort({ data_cadastro: -1})
         console.log('Se igual a 0 é vazio: ',obj.length)
      
         console.log(obj)
       
       

            "_id": "6157adfcb6f6b61f198603c9",
    "data_cadastro": "2021-10-02T00:31:02.701Z",
    "id_user": "marcosgbr19@gmail.com",
    "lista_padrao_add_produto": false,
    "nome_lista": "2",
    "primeira_lista_true": true,







      if (obj.length === 0) {
         res.send({message: "Não existe lista para o seu usuário", status: 0})
         res.status(201).end()
      } else {
         res.send(obj)
         res.status(201).end()
      } */
      //const id = req.body._id
      //const objDelete = await ListaUserProdutos.findByIdAndDelete(req.body._id)
      //console.log('obj: ', obj)
      //console.log(objDelete)
     /* if(objDelete) {
            obj = await ListaUserProdutos.find({id_user: req.body.id_user, 
            primeira_lista_true: true }).sort({ data_cadastro: -1})
            console.log('Se igual a 0 é vazio: ',obj.length)
         
         if (obj.length === 0) {
            res.send({message: "Não existe lista para o seu usuário", status: 0})
            res.status(201).end()
         } else {
            res.send(obj)
            res.status(201).end()
         }
      } */
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
      const obj = await ListaUserProdutos.findByIdAndUpdate(id, req.body)
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
      const obj = await ListaUserProdutos.findByIdAndDelete(id)
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
      let lista = await ListaUserProdutos.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }

}

module.exports = controller
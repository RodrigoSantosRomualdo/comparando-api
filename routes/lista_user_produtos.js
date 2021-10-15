const express = require('express');
const router = express.Router();

const controller = require('../controllers/lista_user_produtos');
const { route } = require('./posto_combustivel');

router.post('/createlista', controller.createlista)
router.post('/findlistaall', controller.findlistaall)
router.post('/findlistprod', controller.findlistprod)
router.post('/createprodutolista', controller.createprodutolista)
router.post('/excluirprodutolist',controller.excluirProdutoList)
router.post('/findfilterlistprod', controller.findfilterlistprod)
router.post('/excluirList', controller.excluirList)
router.post('/findlistpadrao', controller.findlistpadrao)
router.post('/updatefindlistpadrao', controller.updatefindlistpadrao)
router.post('/obterUm', controller.obterUm)


//router.get('/listar', controller.listar)
//router.get('/:id', controller.obterUm)
//router.put('/', controller.atualizar)
//router.delete('/', controller.excluir)
//router.get('/desc/', controller.obterPelaDescricao)

module.exports = router
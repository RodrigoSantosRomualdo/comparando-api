var express = require('express');
var router = express.Router();

const controller = require('../controllers/user')

router.post('/signup', controller.signup)
router.post('/signin', controller.signin)
router.post('/recupera-password', controller.recuperaPassword)
router.post('/finduser', controller.finduser)
router.post('/create-user-email', controller.createUserPeloEmail)
//router.get('/findlist', controller.findlist)
//router.post('/createprodutolista', controller.createprodutolista)
//router.get('/listar', controller.listar)
//router.get('/:id', controller.obterUm)
//router.put('/', controller.atualizar)
//router.delete('/', controller.excluir)
//router.get('/desc/', controller.obterPelaDescricao)

module.exports = router
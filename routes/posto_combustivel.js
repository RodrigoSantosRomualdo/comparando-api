const express = require('express');
const router = express.Router();

const controller = require('../controllers/PostoCombustivel')
const controllerPrecosCombustivel = require('../controllers/precos_combustivel')

// Local do combustivel
router.post('/location', controller.location)

// Precos Combustivel
router.post('/create', controllerPrecosCombustivel.novo)
router.post('/listar', controllerPrecosCombustivel.listartudo)
router.post('/busca-ordenado', controllerPrecosCombustivel.buscarOrdenado)











/*
router.post('/', controller.novo)
router.get('/', controller.listar)
router.get('/:id', controller.obterUm)
router.put('/', controller.atualizar)
router.delete('/', controller.excluir)

router.post('/:id', controller.location)
router.post('/', controller.listar)

router.get('/', controller.location)  */



module.exports = router
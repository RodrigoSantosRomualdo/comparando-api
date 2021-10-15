const express = require('express');
const router = express.Router();

const controller = require('../controllers/supermecado')

/*
router.post('/', controller.novo)
router.get('/', controller.listar)
router.get('/:id', controller.obterUm)
router.put('/', controller.atualizar)
router.delete('/', controller.excluir)

router.post('/:id', controller.location)
router.post('/', controller.listar)

router.get('/', controller.location)  */

router.post('/', controller.location)

module.exports = router
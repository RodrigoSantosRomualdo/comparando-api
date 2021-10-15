const express = require('express');
const router = express.Router();

const controller = require('../controllers/produto_mercado')

router.post('/novo', controller.novo)
router.get('/listar', controller.listar)
router.post('/buscar-id-un-desc', controller.buscarIdSup_UnidadeMed_Desc)
router.post('/buscar-codigo-barras-findone', controller.buscar_codigo_barras_findone)
router.post('/buscar-codigo-barras-findall', controller.buscar_codigo_barras_findall)
//router.get('/:id', controller.obterUm)
router.put('/', controller.atualizar)
router.delete('/', controller.excluir)
router.get('/desc/', controller.obterPelaDescricao)

module.exports = router
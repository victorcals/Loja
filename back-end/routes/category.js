var express = require('express');
var router = express.Router();

const categoryController = require("../controllers/categoryController")

router.get('/', categoryController.listarCategoria);
router.post('/', categoryController.salvarCategoria);
router.get('/:codigoCategory', categoryController.buscarPorCodigoCategoria);
router.put('/:codigoCategory', categoryController.atualizarCategoria);
router.delete('/:codigoCategory', categoryController.excluirCategoria);

module.exports = router;

var express = require('express');
var router = express.Router();

const categoryController = require("../controllers/categoryController")

router.get('/', categoryController.listarCategoria);
router.post('/', categoryController.salvarCategoria);
router.get('/:codigo', categoryController.buscarPorCodigoCategoria);
router.put('/:codigo', categoryController.atualizarCategoria);
router.delete('/:codigo', categoryController.excluirCategoria);

module.exports = router;

var express = require('express');
var router = express.Router();

const productController = require("../controllers/productController")

router.get('/', productController.listarProduct);
router.post('/', productController.salvarProduct);
router.get('/:codigoCategory', productController.buscarPorCodigoProduct);
router.put('/:codigoCategory', productController.atualizarProduct);
router.delete('/:codigoCategory', productController.excluirProduct);

module.exports = router;

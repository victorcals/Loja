var express = require('express');
var router = express.Router();

const productController = require("../controllers/productController")

router.get('/', productController.listarProduct);
router.post('/', productController.salvarProduct);
router.get('/:codigo', productController.buscarPorCodigoProduct);
router.put('/:codigo', productController.atualizarProduct);
router.delete('/:codigo', productController.excluirProduct);

module.exports = router;

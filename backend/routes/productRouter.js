var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer();
const productController = require("../controllers/productController")

router.get('/', productController.listarProduct);
router.post('/',upload.single('image'), productController.salvarProduct);
router.get('/:codigo', productController.buscarPorCodigoProduct);
router.put('/:codigo', productController.atualizarProduct);
router.delete('/:codigo', productController.excluirProduct);

module.exports = router;
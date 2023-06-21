var express = require('express');
var router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productController")

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}. ${file.originalname}`)
    }
  })

  const upload = multer({
    storage:imgconfig,
  });

router.get('/', productController.listarProduct);
router.post('/',upload.single('image'), productController.salvarProduct);
router.get('/:codigo', productController.buscarPorCodigoProduct);
router.put('/:codigo', productController.atualizarProduct);
router.delete('/:codigo', productController.excluirProduct);

module.exports = router;

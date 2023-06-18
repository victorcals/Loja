var express = require('express');
var router = express.Router();
const multer = require("multer");
const clientController = require("../controllers/clientController")

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
  })

  const upload = multer({
    storage:imgconfig,
  });

router.get('/', clientController.listar);
router.post('/', upload.single('image'), clientController.salvar);
router.get('/:codigoClient', clientController.buscarPorCodigo);
router.put('/:codigoClient', clientController.atualizar);
router.delete('/:codigoClient', clientController.excluir);

module.exports = router;

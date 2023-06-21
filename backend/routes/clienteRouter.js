const express = require('express');
const router = express.Router();
const multer = require("multer");
const clienteController = require('../controllers/clienteController');

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
  });
  const upload = multer({
    storage:imgconfig,
  });

router.get('/', clienteController.listar);
router.post('/', upload.single('image'), clienteController.salvar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.put('/:codigo', clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);

module.exports = router;

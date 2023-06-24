const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', upload.single('image'), clienteController.salvar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.put('/:codigo', clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);

module.exports = router;

var express = require('express');
var router = express.Router();

const comentariosController = require("../controllers/comentariosController.js")

router.get('/', comentariosController.listarComentarios);
router.post('/', comentariosController.salvarComentarios);
router.get('/:codigo', comentariosController.buscarPorCodigoComentarios);
router.put('/:codigo', comentariosController.atualizarComentarios);
router.delete('/:codigo', comentariosController.excluirComentarios);

module.exports = router;

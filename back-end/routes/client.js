var express = require('express');
var router = express.Router();

const clientController = require("../controllers/clientController")

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', clientController.listar);
router.post('/', clientController.salvar);
router.get('/:codigoClient', clientController.buscarPorCodigo);
router.put('/:codigoClient', clientController.atualizar);
router.delete('/:codigoClient', clientController.excluir);

// router
//     .route('/')
//     .post((req, res)=> clientController.create(req, res))

module.exports = router;

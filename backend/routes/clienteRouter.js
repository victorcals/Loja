const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const clienteController = require('../controllers/clienteController');



/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos os clientes
 *     description: Obtém uma lista de todos os clientes cadastrados.
 *     responses:
 *       200:
 *         description: Lista de clientes obtida com sucesso.
 */

router.get('/', clienteController.listar);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Criar um novo cliente
 *     description: Cria um novo cliente com as informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso.
 */

router.post('/', upload.single('image'), clienteController.salvar);

/**
 * @swagger
 * /clientes/{codigo}:
 *   get:
 *     summary: Obter um cliente pelo código
 *     description: Obtém as informações de um cliente específico com base no código fornecido.
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código do cliente a ser obtido.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informações do cliente obtidas com sucesso.
 */

router.get('/:codigo', clienteController.buscarPorCodigo);

/**
 * @swagger
 * /clientes/{codigo}:
 *   put:
 *     summary: Atualizar um cliente existente
 *     description: Atualiza as informações de um cliente existente com base no código fornecido.
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código do cliente a ser atualizado.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso.
 */

router.put('/:codigo', clienteController.atualizar);

/**
 * @swagger
 * /clientes/{codigo}:
 *   delete:
 *     summary: Excluir um cliente existente
 *     description: Exclui um cliente existente com base no código fornecido.
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código do cliente a ser excluído.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso.
 */

router.delete('/:codigo', clienteController.excluir);

module.exports = router;

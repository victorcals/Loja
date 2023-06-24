const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: API de Pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       401:
 *         description: Não autorizado
 */

router.post('/', auth.autorizar, pedidoController.salvar);

/**
 * @swagger
 * /pedidos/{clienteId}:
 *   get:
 *     summary: Retorna os pedidos de um cliente
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de pedidos do cliente
 *       401:
 *         description: Não autorizado
 */

router.get('/:clienteId', auth.autorizar, pedidoController.listar);

/**
 * @swagger
 * /pedidos/{clienteId}/{codigo}:
 *   get:
 *     summary: Retorna um pedido pelo código
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */

router.get('/:clienteId/:codigo', auth.autorizar, pedidoController.buscarPorCodigo);

module.exports = router;

const express = require('express');
const router = express.Router();

const comentariosController = require("../controllers/comentariosController.js")

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: API de Comentários
 */

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Retorna todos os comentários
 *     tags: [Comentários]
 *     responses:
 *       200:
 *         description: Lista de comentários
 */

router.get('/', comentariosController.listarComentarios);

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

router.post('/', comentariosController.salvarComentarios);

/**
 * @swagger
 * /comentarios/{codigo}:
 *   get:
 *     summary: Retorna um comentário pelo código
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do comentário
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *       404:
 *         description: Comentário não encontrado
 */

router.get('/:codigo', comentariosController.buscarPorCodigoComentarios);

/**
 * @swagger
 * /comentarios/{codigo}:
 *   put:
 *     summary: Atualiza um comentário pelo código
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Comentário não encontrado
 */

router.put('/:codigo', comentariosController.atualizarComentarios);

/**
 * @swagger
 * /comentarios/{codigo}:
 *   delete:
 *     summary: Exclui um comentário pelo código
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do comentário
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       404:
 *         description: Comentário não encontrado
 */

router.delete('/:codigo', comentariosController.excluirComentarios);

module.exports = router;

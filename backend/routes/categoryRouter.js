var express = require('express');
var router = express.Router();

const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     responses:
 *       200:
 *         description: Retorna a lista de categorias
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Objeto JSON contendo os detalhes da categoria
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /categories/{codigo}:
 *   get:
 *     summary: Obtém uma categoria pelo código
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código da categoria
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna os detalhes da categoria
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /categories/{codigo}:
 *   put:
 *     summary: Atualiza uma categoria pelo código
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código da categoria
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: Objeto JSON contendo os detalhes atualizados da categoria
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /categories/{codigo}:
 *   delete:
 *     summary: Exclui uma categoria pelo código
 *     parameters:
 *       - name: codigo
 *         in: path
 *         description: Código da categoria
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Categoria excluída com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/', categoryController.listarCategoria);
router.post('/', categoryController.salvarCategoria);
router.get('/:codigo', categoryController.buscarPorCodigoCategoria);
router.put('/:codigo', categoryController.atualizarCategoria);
router.delete('/:codigo', categoryController.excluirCategoria);

module.exports = router;

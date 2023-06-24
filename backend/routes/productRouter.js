const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API de Produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro ao listar produtos
 */

router.get('/', productController.listarProduct);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NovoProduto'
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       404:
 *         description: Dado não encontrado
 *       500:
 *         description: Erro ao salvar dado
 */

router.post('/', upload.single('image'), productController.salvarProduct);

/**
 * @swagger
 * /produtos/{codigo}:
 *   get:
 *     summary: Retorna um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Dado não encontrado
 *       500:
 *         description: Erro ao buscar dado por ID
 */

router.get('/:codigo', productController.buscarPorCodigoProduct);

/**
 * @swagger
 * /produtos/{codigo}:
 *   put:
 *     summary: Atualiza um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarProduto'
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       404:
 *         description: Dado não encontrado
 *       500:
 *         description: Erro ao atualizar dado
 */

router.put('/:codigo', productController.atualizarProduct);

/**
 * @swagger
 * /produtos/{codigo}:
 *   delete:
 *     summary: Exclui um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do produto
 *     responses:
 *       200:
 *         description: Registro deletado com sucesso
 *       404:
 *         description: Dado não encontrado
 *       500:
 *         description: Erro ao excluir dado
 */

router.delete('/:codigo', productController.excluirProduct);

module.exports = router;

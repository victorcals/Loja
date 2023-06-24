const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: API de Autenticação
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Credenciais:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *       required:
 *         - email
 *         - senha
 */

router.post('/', loginController.login);

module.exports = router;

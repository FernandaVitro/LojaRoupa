const express = require('express');

const router = express.Router();

const FuncionariosController = require('../controllers/funcionariosController');

router.get('/funcionarios', FuncionariosController.listar);

router.post('/funcionarios', FuncionariosController.criar);

router.put('/funcionarios/:id', FuncionariosController.atualizar);

router.delete('/funcionarios/:id', FuncionariosController.deletar);

module.exports = router;
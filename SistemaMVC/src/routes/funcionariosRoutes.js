const express = require('express');

const router = express.Router();

const FuncionariosControllers = require('../controllers/funcionariosControllers');

router.get('/funcionarios', FuncionariosControllers.listar);

router.post('/funcionarios', FuncionariosControllers.criar);

router.put('/funcionarios/:id', FuncionariosControllers.atualizar);

router.delete('/funcionarios/:id', FuncionariosControllers.deletar);

module.exports = router;
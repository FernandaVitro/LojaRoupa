const express = require('express');
const router = express.Router();
const FornecedoresController = require('../controllers/fornecedoresControllers');

router.get('/fornecedores', FornecedoresController.listar);
router.post('/fornecedores', FornecedoresController.criar);
router.put('/fornecedores/:id', FornecedoresController.atualizar);
router.delete('/fornecedores/:id', FornecedoresController.deletar);

module.exports = router;
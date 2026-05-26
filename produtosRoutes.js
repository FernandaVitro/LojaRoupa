const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtosController');

router.get('/produtos', produtoController.index);
router.delete('/produto/:id', produtoController.delete);
router.post('/produto', produtoController.store);
router.put('/produto/:id', produtoController.update);

module.exports = router;
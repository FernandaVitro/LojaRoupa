const express = require('express');
const router = express.Router();
const vendasController = require('../controller/vendasController');

router.get('/vendas', vendasController.index);
router.post('/vendas', vendasController.store);
router.put('/vendas/:id', vendasController.update);
router.delete('/vendas/:id', vendasController.delete);

module.exports = router;
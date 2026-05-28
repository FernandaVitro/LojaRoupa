const express = require('express');
const router = express.Router();
const vendasControllers = require('../controllers/vendasControllers');

router.get('/vendas', vendasControllers.index);
router.post('/vendas', vendasControllers.store);
router.put('/vendas/:id', vendasControllers.update);
router.delete('/vendas/:id', vendasControllers.delete);

module.exports = router;
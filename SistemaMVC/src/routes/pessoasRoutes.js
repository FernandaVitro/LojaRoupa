const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');

// Rota para listar (GET)
router.get('/pessoas', pessoasController.index);

// Rota para criar (POST) 
router.post('/pessoas', pessoasController.store);

// Rota para criar (DELETE) 
router.delete('/pessoas/:id', pessoasController.delete);

router.put('/pessoas/:id', pessoasController.update);

module.exports = router;
const express = require('express');
const router = express.Router();
const pessoasControllers = require('../controllers/pessoasControllers');

// Rota para listar (GET)
router.get('/pessoas', pessoasControllers.index);

// Rota para criar (POST) 
router.post('/pessoas', pessoasControllers.store);

// Rota para criar (DELETE) 
router.delete('/pessoas/:id', pessoasControllers.delete);

router.put('/pessoas/:id', pessoasControllers.update);

module.exports = router;
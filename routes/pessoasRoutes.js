const express = require('express');
const router = express.Router();
const pessoaController = require('../controller/pessoasController')

router.get('/pessoa', pessoaController.index);
router.delete('/pessoa/:id', pessoaController.delete);
router.post('/pessoa', pessoaController.store);
router.put('/pessoas/:id', pessoaController.update);



module.exports = router;
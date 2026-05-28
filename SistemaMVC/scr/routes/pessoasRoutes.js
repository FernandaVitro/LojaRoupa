const express = require('express');
const router = express.Router();
const pessoaControllers = require('../controllers/pessoasControllers');

router.get('/pessoas', pessoaControllers.index);
router.post('/pessoas', pessoaControllers.store);
router.put('/pessoas/:id', pessoaControllers.update);
router.delete('/pessoas/:id', pessoaControllers.delete);

module.exports = router;
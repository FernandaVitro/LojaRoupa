const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasControllers');


router.get('/pessoas', pessoasController.index);

router.delete('/pessoas/:id', pessoasController.delete);

router.post('/pessoas', pessoasController.store);

router.put('/pessoas/:id', pessoasController.update);



module.exports = router;

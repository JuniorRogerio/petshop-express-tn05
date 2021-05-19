const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');
const servicosController = require('../controllers/servicosController');
const institucionalController = require('../controllers/institucionalController');

// rota para paginas instutucionais

//http://localhost:3000/
router.get('/', institucionalController. index);

// rota para /pets que retorna o método index da petsController
router.get('/pets', petsController.index);

router.get('/pets/:nome', petsController.show);

router.get('/servicos', servicosController.index);

router.get('/servicos/:servico', servicosController.show);

module.exports = router;

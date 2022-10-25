const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controllers')

router.get('/concerts', concertsController.getAll);
router.get('/concerts/random', concertsController.getRandom);
router.get('/concerts/:id', concertsController.getById);
router.post('/concerts', concertsController.create);
router.put('/concerts/:id', concertsController.update);
router.delete('/concerts/:id', concertsController.delete);

module.exports = router;

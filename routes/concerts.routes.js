const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controllers')

// GET
router.get('/concerts', concertsController.getAll);
router.get('/concerts/random', concertsController.getRandom);
router.get('/concerts/:id', concertsController.getById);
router.get('/concerts/performer/:performer', concertsController.getByPerformer);
router.get('/concerts/genre/:genre', concertsController.getByGenre);
router.get('/concerts/price/:price_min/:price_max', concertsController.getByPriceRange);
router.get('/concerts/day/:day', concertsController.getByDay);
// CREATE
router.post('/concerts', concertsController.create);
// UPDATE
router.put('/concerts/:id', concertsController.update);
// DELETE
router.delete('/concerts/:id', concertsController.delete);

module.exports = router;

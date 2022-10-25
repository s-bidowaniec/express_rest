const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller')

router.get('/seats', seatsController.getAll);
router.get('/seats/random', seatsController.getRandom);
router.get('/seats/:id', seatsController.getById);
router.post('/seats', seatsController.create);
router.put('/seats/:id', seatsController.update);
router.delete('/seats/:id', seatsController.delete);

module.exports = router;

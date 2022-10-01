const short = require("shortid");
const express = require('express');
const router = express.Router();
const db = require('./../db');
router.get('/seats', (req, res) => {
    res.json(db.seats);
});
router.get('/seats/random', (req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});
router.get('/seats/:id', (req, res) => {
    res.json(db.seats.find((seat) => String(seat.id) === req.params.id));
});
router.post('/seats', (req, res) => {
    db.seats.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/seats/:id', (req, res) => {
    const seat = db.seats.find((seat) => String(seat.id) === req.params.id);
    const seatId = db.seats.indexOf(seat)
    db.seats[seatId]={ id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/seats/:id', (req, res) => {
    const seat = db.seats.find((seat) => String(seat.id) === req.params.id);
    const seatId = db.seats.indexOf(seat)
    db.seats.splice(db.seats.indexOf(seatId), 1);
    res.json({ message: 'OK' });
});

module.exports = router;

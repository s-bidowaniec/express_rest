const short = require("shortid");
const express = require('express');
const db = require('./../db');
const router = express.Router();

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
    const alreadyReservedSeat = db.seats.some((seat) => seat.day == req.body.day && seat.seat == req.body.seat);
    if (alreadyReservedSeat){
        res.status(500)
        res.json({ message: 'The slot is already taken...'  });
    } else {
        db.seats.push({id: short(), ...req.body});
        res.json({ message: 'OK' });
    }
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

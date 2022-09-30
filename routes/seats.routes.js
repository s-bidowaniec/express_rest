const short = require("shortid");
const express = require('express');
const router = express.Router();
const db = require('./../db');
router.get('/seats', (req, res) => {
    res.json(db.seats);
});
router.get('/seats/:id', (req, res) => {
    res.json(db.seats.find((x)=> String(x.id) === req.params.id));
});
router.get('/seats/random', (req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});
router.post('/seats', (req, res) => {
    db.seats.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/seats/:id', (req, res) => {
    const element = db.seats.find((x)=>String(x.id)===req.params.id);
    db.seats[db.seats.indexOf(element)]={ id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/seats/:id', (req, res) => {
    const element = db.seats.find((x)=>String(x.id)===req.params.id);
    db.seats.splice(db.seats.indexOf(element), 1);
    res.json({ message: 'OK' });
});

module.exports = router;

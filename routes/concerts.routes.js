const short = require("shortid");
const express = require('express');
const db = require('./../db');
const router = express.Router();

router.get('/concerts', (req, res) => {
    res.json(db.concerts);
});
router.get('/concerts/random', (req, res) => {
    res.json(db.concerts[Math.floor(Math.random()*db.concerts.length)]);
});
router.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find((concert)=> String(concert.id) === req.params.id));
});
router.post('/concerts', (req, res) => {
    db.concerts.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/concerts/:id', (req, res) => {
    const concert = db.concerts.find((concert)=>String(concert.id)===req.params.id);
    const concertId = db.concerts.indexOf(concert)
    db.concerts[concertId]={ id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/concerts/:id', (req, res) => {
    const concert = db.concerts.find((concert)=>String(concert.id)===req.params.id);
    const concertId = db.concerts.indexOf(concert)
    db.concerts.splice(concertId, 1);
    res.json({ message: 'OK' });
});

module.exports = router;

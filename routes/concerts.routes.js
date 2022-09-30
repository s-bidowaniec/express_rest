const short = require("shortid");
const express = require('express');
const router = express.Router();
const db = require('./../db');
router.get('/concerts', (req, res) => {
    res.json(db.concerts);
});
router.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find((x)=> String(x.id) === req.params.id));
});
router.get('/concerts/random', (req, res) => {
    res.json(db.concerts[Math.floor(Math.random()*db.concerts.length)]);
});
router.post('/concerts', (req, res) => {
    db.concerts.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/concerts/:id', (req, res) => {
    const element = db.concerts.find((x)=>String(x.id)===req.params.id);
    db.concerts[db.concerts.indexOf(element)]={ id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/concerts/:id', (req, res) => {
    const element = db.concerts.find((x)=>String(x.id)===req.params.id);
    db.concerts.splice(db.concerts.indexOf(element), 1);
    res.json({ message: 'OK' });
});

module.exports = router;

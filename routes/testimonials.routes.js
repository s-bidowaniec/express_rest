const short = require("shortid");
const express = require('express');
const router = express.Router();
const db = require('./../db');
router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});
router.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find((x)=> String(x.id) === req.params.id));
});
router.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random()*db.testimonials.length)]);
});
router.post('/testimonials', (req, res) => {
    db.testimonials.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/testimonials/:id', (req, res) => {
    const element = db.testimonials.find((x)=>String(x.id)===req.params.id);
    db.testimonials[db.testimonials.indexOf(element)]={ id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/testimonials/:id', (req, res) => {
    const element = db.testimonials.find((x)=>String(x.id)===req.params.id);
    db.testimonials.splice(db.testimonials.indexOf(element), 1);
    res.json({ message: 'OK' });
});

module.exports = router;

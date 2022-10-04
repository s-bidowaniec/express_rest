const short = require("shortid");
const express = require('express');
const db = require('./../db');
const router = express.Router();

router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});
router.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});
router.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find((testimonial) => String(testimonial.id) === req.params.id));
});
router.post('/testimonials', (req, res) => {
    db.testimonials.push({ id: short(), ...req.body });
    res.json({ message: 'OK' });
});
router.put('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find((testimonial) => String(testimonial.id) === req.params.id);
    const testimonialId = db.testimonials.indexOf(testimonial)
    db.testimonials[testimonialId] = { id: req.params.id, ...req.body };
    res.json({ message: 'OK' });
});
router.delete('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find((testimonial) => String(testimonial.id) === req.params.id);
    const testimonialId = db.testimonials.indexOf(testimonial)
    db.testimonials.splice(db.testimonials.indexOf(testimonialId), 1);
    res.json({ message: 'OK' });
});

module.exports = router;

const Testimonial = require('../models/testimonial.model')

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find().populate('day'));
    } catch (err) {
        res.status(500).json({"message": err})
    }
}
exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments().populate('day');
        const rand = Math.floor(Math.random() * count);
        const testimonial = await Testimonial.findOne().skip(rand);
        if (!testimonial) res.status(404).json({message: 'Not found'});
        else res.json(testimonial);
    } catch (err) {
        res.status(500).json({message: err})
    }
}
exports.getById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id).populate('day');
        if(!testimonial) res.status(404).json({ message: 'Not found' });
        else res.json(testimonial);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
// POST
exports.create = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newTestimonial = new Testimonial({id, performer, genre, price, day, image})
        await newTestimonial.save()
        res.json(newTestimonial)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
// UPDATE
exports.update = async (req, res) => {
    const { author, text } = req.body;
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            testimonial.author = author;
            testimonial.text = text;
            await testimonial.save()
            res.json(testimonial);
        } else {
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}
// DELETE
exports.delete = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if(testimonial){
            await testimonial.remove();
            res.json(testimonial);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

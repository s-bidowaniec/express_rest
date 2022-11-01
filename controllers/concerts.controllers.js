const Concert = require('../models/concert.model')

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({"message": err})
    }
}
exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const concert = await Concert.findOne().skip(rand);
        if (!concert) res.status(404).json({message: 'Not found'});
        else res.json(concert);
    } catch (err) {
        res.status(500).json({message: err})
    }
}
exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
exports.getByPerformer = async (req, res) => {
    try {
        const concerts = await Concert.find({'performer': req.params.performer});
        if(!concerts || concerts.length === 0) res.status(404).json({ message: 'Not found' });
        else res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
exports.getByGenre = async (req, res) => {
    try {
        const concerts = await Concert.find({'genre': req.params.genre});
        if(!concerts || concerts.length === 0 ) res.status(404).json({ message: 'Not found' });
        else res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
exports.getByPriceRange = async (req, res) => {
    try {
        const concerts = await Concert.find({'price': { $gt: req.params.price_min, $lt: req.params.price_max}});
        if(!concerts || concerts.length === 0) res.status(404).json({ message: 'Not found' });
        else res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
exports.getByDay = async (req, res) => {
    try {
        const concerts = await Concert.find({'day': req.params.day});
        if(!concerts || concerts.length===0) res.status(404).json({ message: 'Not found' });
        else res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
// POST
exports.create = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer, genre, price, day, image })
        await newConcert.save()
        res.json(newConcert)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
// UPDATE
exports.update = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const concert = await Concert.findById(req.params.id);
        if (concert) {
            concert.performer = performer;
            concert.genre = genre;
            concert.price = price;
            concert.day = day;
            concert.image = image;
            await concert.save()
            res.json(concert);
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
        const concert = await Concert.findById(req.params.id);
        if(concert){
            await concert.remove();
            res.json(concert);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
}
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
// POST
exports.create = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({id, performer, genre, price, day, image})
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
const Seat = require('../models/seat.model')

// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch (err) {
        res.status(500).json({"message": err})
    }
}
exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if (!seat) res.status(404).json({message: 'Not found'});
        else res.json(seat);
    } catch (err) {
        res.status(500).json({message: err})
    }
}
exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    } catch (err) {
        res.status(500).json({message: err});
    }
}
// POST
exports.create = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({ day, seat, client, email })
        await newSeat.save()
        res.json(newSeat)
        req.io.emit('seatsUpdated', await Seat.find())
    } catch (err) {
        res.status(500).json({message: err})
    }
}
// UPDATE
exports.update = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const updatedSeat = await Seat.findById(req.params.id);
        if (updatedSeat) {
            updatedSeat.day = day;
            updatedSeat.seat = seat;
            updatedSeat.client = client;
            updatedSeat.email = email;
            await updatedSeat.save()
            res.json(updatedSeat);
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
        const seat = await Seat.findById(req.params.id);
        if(seat){
            await seat.remove();
            res.json(seat);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

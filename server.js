const express = require('express');
const cors = require('cors')
const path = require('path')
const socket = require('socket.io')
const mongoose = require('mongoose')
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    "origin": "http://localhost:3000", //origin sets domains that we approve
    "methods": "GET,POST", //we allow only GET and POST methods
}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve main react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
mongoose.connect('mongodb+srv://kodilla_29:kamved-kuzxiq-5woPto@cluster0.f63nfzn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', ()=>{
    console.log('Connected to the database')
})
db.on('err', err => {console.log(`Error:  ${err}`)})
// Start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

// Websocket communication
const io = socket(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket)=>{
    console.log(`New client! Its id – ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log(`Client disconnect, id ${socket.id}`)
    })
})
app.use((req, res, next) => {
    req.io = io;
    next();
})
// use routes
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Handle bad requests
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})
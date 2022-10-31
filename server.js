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
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve main react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
// Connect DB
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.dbname}:${process.env.dbpass}@cluster0.f63nfzn.mongodb.net/?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Serve main react app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.get('/order-a-ticket', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.get('/prices', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Handle bad requests
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

// export
module.exports = server;

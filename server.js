const express = require('express');
const cors = require('cors')
const path = require('path')
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
// use routes
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
// Serve main react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
// Handle bad requests
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})
// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
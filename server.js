const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    "origin": "http://localhost:3000", //origin sets domains that we approve
    "methods": "GET,POST", //we allow only GET and POST methods
}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
app.use('/api', testimonialsRoutes);
const concertsRoutes = require('./routes/concerts.routes');
app.use('/api', concertsRoutes);
const seatsRoutes = require('./routes/seats.routes');
app.use('/api', seatsRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
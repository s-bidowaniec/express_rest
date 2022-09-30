const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
app.use('/', testimonialsRoutes);
const concertsRoutes = require('./routes/concerts.routes');
app.use('/', concertsRoutes);
const seatsRoutes = require('./routes/seats.routes');
app.use('/', seatsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
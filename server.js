const express = require('express');
const mongoose = require('mongoose');
const dburl = require('./dbcongif/config')
const bookRoutes = require('./Routers/BooksRouter');
// require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const server = dburl;
mongoose.connect(server).then(() => {
    console.log('Database Connected ! ! !');
}).catch((err) => {
    console.log(err);
});

// Book routes
app.use('/api', bookRoutes);

// Start the server
// const PORT = process.env.PORT || 5000;
app.listen(2003, () => {
    console.log(`Server running on port 2003`);
});

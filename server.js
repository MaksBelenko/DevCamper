const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
// const logger = require('./middleware/logger');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Routes files
const bootcamps = require('./routes/bootcamps');

const app = express();
const PORT = process.env.PORT || 5000;



// ---------------- Middleware ----------------
app.use(express.json()); // Parse JSON
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Dev Logging middleware
}
// app.use(logger);
app.use('/api/v1/bootcamps', bootcamps); // Mount routes




const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});




// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});

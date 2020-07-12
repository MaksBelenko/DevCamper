// @DESCRIPTION
// run "node seeder -importData" to import bootcamps.json from _data into database
// run "node seeder -deleteData" to remove everything from database

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Read JSON Files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported...'.green.bold);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed...'.magenta);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};




// ---------------------------------------------
if (process.argv[2] == '-importData') {
    importData();
} else if (process.argv[2] == '-deleteData') {
    deleteData();
}
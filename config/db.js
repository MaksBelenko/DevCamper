const mongoose = require('mongoose');

const connectDB = async () => {
//   try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);

//   } catch (error) {
//     console.log(`Error connecting to database: ${error}`);
//   }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'socialnetworkapp',
  });

  console.log(`db connected: ${conn.connection.host}`);
};

module.exports = connectDB;

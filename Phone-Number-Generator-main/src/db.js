const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://techteam:1234567890@cluster0.13yxblj.mongodb.net/test';

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;

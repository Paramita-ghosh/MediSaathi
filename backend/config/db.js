import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL ||
      'mongodb://127.0.0.1:27017/medisaathi';

    if (!process.env.MONGO_URI && !process.env.MONGODB_URI && !process.env.DATABASE_URL) {
      console.warn(
        'Warning: No MongoDB connection string found in environment. Falling back to local MongoDB at',
        mongoUri
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error(
      'Make sure the MONGO_URI (or MONGODB_URI / DATABASE_URL) environment variable is set,' +
        ' or that a local MongoDB instance is running at mongodb://127.0.0.1:27017'
    );
    process.exit(1);
  }
};

export default connectDB;
import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dragonball_gym';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[Database Error] Could not establish MongoDB connection: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      console.error(`[Database Notice] For Render production: Ensure MONGO_URI is set in Render Environment variables and Network Access in MongoDB Atlas allows 0.0.0.0/0.`);
    } else {
      console.warn(`[Database Notice] To connect to MongoDB Atlas locally, update MONGO_URI in 'server/.env' with your connection string.`);
    }
    return false;
  }
};

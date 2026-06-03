import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      const state = mongoose.connections[0].readyState;
      if (state === 1) { // 1 means connected
        isConnected = true;
        return;
      }
    }
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

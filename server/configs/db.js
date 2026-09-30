// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();


// const connectDB = async () => {
//   try {
//     mongoose.connection.on('connected', () => console.log("Database Connected"));
//     await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  mongoose.connection.on('connected', () => console.log("Database Connected"));
  await mongoose.connect(uri, { dbName: "car-rental" });
};

export default connectDB;
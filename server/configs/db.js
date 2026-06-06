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
  try {
    console.log("URI:", process.env.MONGODB_URI); // check what's being read
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
  dbName: "car-rental"
});
  } catch (error) {
    console.log("Full error:", error); // full error not just message
  }
};

export default connectDB;
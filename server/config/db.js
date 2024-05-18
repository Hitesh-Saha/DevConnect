import mongoose from "mongoose";

const connectDB = (db) => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("Database connected!!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

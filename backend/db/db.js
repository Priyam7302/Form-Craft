import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To DB");
  } catch (error) {
    console.log("Error Connecting to mongodb", error);
  }
}
export default connectToDB;

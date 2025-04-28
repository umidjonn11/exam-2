import { connect } from "mongoose";

const mongodb_uri =
  process.env.MONGODB_URI 
export const connectDB = async () => {
  try {
    await connect(mongodb_uri);
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
    
import { connect } from "mongoose";

const mongodb_uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://umidjonumedov308:XXj7wyToDtZwBsv4@nodejs.bon1v.mongodb.net/Exam n-18t?retryWrites=true&w=majority&appName=nodejs";

export const connectDB = async () => {
  try {
    await connect(mongodb_uri);
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
    
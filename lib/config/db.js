import mongoose from "mongoose";

export const ConnectDB = async () => {
  console.log("Connecting to database...");
  await mongoose.connect(
    "mongodb+srv://vigneshravi326:Y7eMsFxCedT5hSF4@cluster0.u0ibr7b.mongodb.net/"
  );
  console.log("DB connection established...");
};

import mongoose from "mongoose";

export async function main() {
  const url = process.env.MONGODB_URL;

  if (!url) {
    console.log("incorrect mongodb url");
    return;
  }

  await mongoose.connect(url);
  console.log("mongodb connected");
}

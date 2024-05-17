dotenv.config();
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Routes from "./routes/routes.js";
const app = express();

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("database connected"));
}

app.use("/api", Routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/v1", require("./src/v1/routes"));
// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL!);
} catch (error) {
  console.log(error);
}

const PORT = 3500;
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
});

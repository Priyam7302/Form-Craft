import express from "express";
import connectToDB from "./db/db.js";
import cors from "cors";
import "dotenv/config";
import formRouter from "./routes/form.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  }),
);

await connectToDB();
app.use("/form", formRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is running at PORT " + PORT));

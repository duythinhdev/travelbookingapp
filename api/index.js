import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import UsersRoute from "./routes/users.js";
import HotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bodyparser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/users", UsersRoute);
app.use("/api/hotels", HotelsRoute)
app.use("/api/rooms", roomsRoute);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(cors());
app.use(bodyparser.json());

app.listen(8800, () => {
    console.log("connected to backend ");
})
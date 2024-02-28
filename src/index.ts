import "dotenv/config";

import cors from "cors";

import express from "express";
import passport from "passport";

import initPassport from "./helper/passport";
import { connect } from "./db/database";
import {
  customerRouter,
  dispenseMedicineRouter,
  medicineRouter,
  userRouter,
} from "./routes";

const app = express();

initPassport(passport);
app.use(passport.initialize());

connect();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/customer", customerRouter);
app.use("/api/dispense", dispenseMedicineRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

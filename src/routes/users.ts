import express from "express";

import { checkToken } from "../middleware";

import { loginController, logoutUser } from "../controllers/auth.controller";

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/logout", checkToken, logoutUser);

export { userRouter };

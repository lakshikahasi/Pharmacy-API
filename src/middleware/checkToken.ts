import { NextFunction, Request, Response } from "express";

import ActiveSession from "../models/activeSession";
import { connection } from "../db/database";
import jwt from "jsonwebtoken";
import { IDecodedUser } from "./common";

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET not provided");
  }
  const token = String(req.headers.authorization || req.body.token);
  const activeSessionRepository = connection!.getRepository(ActiveSession);
  try {
    const session = await activeSessionRepository.findOne({ where: { token } });
    if (!session || !session?.token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      throw new Error();
    }
    req.user = {
      id: (decoded as IDecodedUser).id,
      username: (decoded as IDecodedUser).username,
      role: (decoded as IDecodedUser).role,
      email: (decoded as IDecodedUser).email,
    };
    return next();
  } catch (error) {
    return res.json({ success: false, msg: "User is not logged on" });
  }
};

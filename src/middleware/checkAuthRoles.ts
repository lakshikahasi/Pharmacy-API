import { NextFunction, Request, Response } from "express";

import { ROLE_TYPE } from "../common/enum";
import { IDecodedUser } from "./common";
export const checkAuthRole = (allowedRoles: ROLE_TYPE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error();
      }
      if (
        !allowedRoles.includes((req.user as IDecodedUser).role as ROLE_TYPE)
      ) {
        throw new Error();
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ msg: "Forbidden: Insufficient permissions" });
    }
  };
};

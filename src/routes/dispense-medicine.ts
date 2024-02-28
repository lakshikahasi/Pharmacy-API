import express from "express";
import {
  dispenseMedicine,
  hardDelete,
  softDelete,
} from "../controllers/dispense-medicine.controller";
import { checkAuthRole, checkToken } from "../middleware";
import { ROLE_TYPE } from "../common";

const dispenseMedicineRouter = express.Router();

dispenseMedicineRouter.post(
  "/",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.CASHIER]),
  dispenseMedicine
);
dispenseMedicineRouter.delete(
  "/hard/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER]),
  hardDelete
);
dispenseMedicineRouter.delete(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.CASHIER]),
  softDelete
);

export { dispenseMedicineRouter };

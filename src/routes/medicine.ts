import express from "express";
import {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  hardDelete,
  softDelete,
  updateMedicineById,
} from "../controllers/medicine.controller";
import { checkAuthRole, checkToken } from "../middleware";
import { ROLE_TYPE } from "../common";

const medicineRouter = express.Router();

medicineRouter.post(
  "/create",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER]),
  addMedicine
);
medicineRouter.get(
  "/all",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  getAllMedicine
);
medicineRouter.get(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  getMedicineById
);
medicineRouter.patch(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  updateMedicineById
);
medicineRouter.delete(
  "/hard/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER]),
  hardDelete
);
medicineRouter.delete(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER]),
  softDelete
);

export { medicineRouter };

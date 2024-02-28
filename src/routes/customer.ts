import express from "express";
import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  hardDelete,
  softDelete,
  updateCustomerById,
} from "../controllers/customer.controller";
import { checkAuthRole, checkToken } from "../middleware";
import { ROLE_TYPE } from "../common";

const customerRouter = express.Router();

customerRouter.post(
  "/create",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER]),
  addCustomer
);
customerRouter.get(
  "/all",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  getAllCustomers
);
customerRouter.get(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  getCustomerById
);
customerRouter.patch(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER, ROLE_TYPE.CASHIER]),
  updateCustomerById
);
customerRouter.delete(
  "/hard/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER]),
  hardDelete
);
customerRouter.delete(
  "/:id",
  checkToken,
  checkAuthRole([ROLE_TYPE.OWNER, ROLE_TYPE.MANAGER]),
  softDelete
);

export { customerRouter };

import Customer from "../models/customer";
import { connection } from "../db/database";

export const customerRepository = connection!.getRepository(Customer);
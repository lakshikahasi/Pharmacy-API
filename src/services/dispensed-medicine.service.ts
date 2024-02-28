import DispensedMedicine from "../models/dispensedMedicine";
import { connection } from "../db/database";

export const dispensedMedicineRepository = connection!.getRepository(DispensedMedicine);
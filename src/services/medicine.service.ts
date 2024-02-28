import Medicine from "../models/medicine";
import { connection } from "../db/database";

export const medicineRepository = connection!.getRepository(Medicine);
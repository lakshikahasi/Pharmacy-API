import User from "../models/user";
import { connection } from "../db/database";

export const userRepository = connection!.getRepository(User);
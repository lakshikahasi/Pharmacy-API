import ActiveSession from "../models/activeSession";
import { connection } from "../db/database";

export const activeSessionRepository = connection!.getRepository(ActiveSession);
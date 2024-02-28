import { Request, Response } from "express";
import Joi from "joi";
import { medicineRepository } from "../services/medicine.service";

export const addMedicine = (req: Request, res: Response) => {
  const addMedicineSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  const result = addMedicineSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  const { name, description, quantity } = req.body;
  medicineRepository
    .save({
      name,
      description,
      quantity,
    })
    .then((u) => {
      return res.json({
        success: true,
        id: u.id,
        msg: "Medicine successfully added",
      });
    });
};
export const getAllMedicine = (_req: Request, res: Response) => {
  medicineRepository
    .find({})
    .then((medicines) => {
      return res.json({ success: true, data: medicines });
    })
    .catch(() => res.json({ success: false }));
};
export const getMedicineById = (req: Request, res: Response) => {
  const medicineId = req.params.id;
  if (!medicineId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: medicine id not found`,
    });
  }
  medicineRepository
    .findOne({ where: { id: medicineId } })
    .then((medicines) => {
      return res.json({ success: true, data: medicines });
    })
    .catch(() => res.json({ success: false }));
};
export const updateMedicineById = async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  if (!medicineId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: medicine id not found`,
    });
  }
  const updateMedicineSchema = Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    quantity: Joi.number().optional(),
  });
  const result = updateMedicineSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  try {
    const medicine = await medicineRepository.findOneOrFail({
      where: { id: medicineId },
    });
    await medicineRepository.update({ id: medicine.id }, req.body);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};
export const softDelete = async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  if (!medicineId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: medicine id not found`,
    });
  }
  try {
    const medicine = await medicineRepository.findOneOrFail({
      where: { id: medicineId },
    });
    await medicineRepository.softDelete(medicine.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};
export const hardDelete = async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  if (!medicineId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: medicine id not found`,
    });
  }
  try {
    const medicine = await medicineRepository.findOneOrFail({
      where: { id: medicineId },
      withDeleted: true,
    });
    await medicineRepository.remove(medicine);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};

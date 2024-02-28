import { Request, Response } from "express";
import Joi from "joi";
import { dispensedMedicineRepository } from "../services/dispensed-medicine.service";
import { medicineRepository } from "../services/medicine.service";

export const dispenseMedicine = async (req: Request, res: Response) => {
  const addCustomerSchema = Joi.object().keys({
    medicine: Joi.string().required(),
    customer: Joi.string().required(),
    quantity: Joi.number().required().min(1),
  });
  const result = addCustomerSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  const { medicine: medicineID, customer, quantity } = req.body;
  try {
    const medicine = await medicineRepository.findOneOrFail({
      where: { id: medicineID },
    });

    if ((medicine.quantity || 0) - quantity < 0) {
      return res.status(400).json({
        success: false,
        msg: "Low on medicine stock cannot dispense",
      });
    }
    const response = await dispensedMedicineRepository.save({
      customer: { id: customer },
      medicine: { id: medicine.id },
      quantity,
    });

    await medicineRepository.update(
      { id: medicine.id },
      { quantity: medicine.quantity! - quantity }
    );
    return res.json({
      success: true,
      data: response,
      msg: "Medicine dispensed successfully added",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};

export const softDelete = async (req: Request, res: Response) => {
  const dMId = req.params.id;
  if (!dMId) {
    res.status(400).json({
      success: false,
      msg: `Validation err: id not found`,
    });
  }
  try {
    const dM = await dispensedMedicineRepository.findOneOrFail({
      where: { id: dMId },
    });
    await dispensedMedicineRepository.softDelete(dM.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};
export const hardDelete = async (req: Request, res: Response) => {
  const dMId = req.params.id;
  if (!dMId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err:  id not found`,
    });
  }
  try {
    const dM = await dispensedMedicineRepository.findOneOrFail({
      where: { id: dMId },
      withDeleted: true,
    });
    await dispensedMedicineRepository.remove(dM);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};

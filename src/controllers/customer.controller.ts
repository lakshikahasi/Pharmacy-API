import { Request, Response } from "express";
import Joi from "joi";
import { customerRepository } from "../services/customer.service";

export const addCustomer = (req: Request, res: Response) => {
  const addCustomerSchema = Joi.object().keys({
    name: Joi.string().required(),
  });
  const result = addCustomerSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  const { name } = req.body;
  customerRepository
    .save({
      name,
    })
    .then((u) => {
      return res.json({
        success: true,
        id: u.id,
        msg: "Customer successfully added",
      });
    });
};
export const getAllCustomers = (_req: Request, res: Response) => {
  customerRepository
    .find({})
    .then((customers) => {
      return res.json({ success: true, data: customers });
    })
    .catch(() => res.json({ success: false }));
};
export const getCustomerById = (req: Request, res: Response) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: customer id not found`,
    });
  }
  customerRepository
    .findOne({ where: { id: customerId } })
    .then((customers) => {
      return res.json({ success: true, data: customers });
    })
    .catch(() => res.json({ success: false }));
};
export const updateCustomerById = async (req: Request, res: Response) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: customer id not found`,
    });
  }
  const updateCustomerSchema = Joi.object().keys({
    name: Joi.string().optional(),
  });
  const result = updateCustomerSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  try {
    const customer = await customerRepository.findOneOrFail({
      where: { id: customerId },
    });
    await customerRepository.update({ id: customer.id }, req.body);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};
export const softDelete = async (req: Request, res: Response) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: customer id not found`,
    });
  }
  try {
    const customer = await customerRepository.findOneOrFail({
      where: { id: customerId },
    });
    await customerRepository.softDelete(customer.id);
    return res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};
export const hardDelete = async (req: Request, res: Response) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({
      success: false,
      msg: `Validation err: customer id not found`,
    });
  }
  try {
    const customer = await customerRepository.findOneOrFail({
      where: { id: customerId },
      withDeleted: true,
    });
    await customerRepository.remove(customer);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "There was an error. Please contract the administrator",
    });
  }
};

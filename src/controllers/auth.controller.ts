import Joi from "joi";
import { Request, Response } from "express";
import { userRepository } from "../services/user.service";
import bcrypt from "bcrypt";
import { activeSessionRepository } from "../services/session.service";
import jwt from "jsonwebtoken";

const userLoginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginController = (req: Request, res: Response) => {
  const result = userLoginSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
  }

  const { username } = req.body;
  const { password } = req.body;

  userRepository.findOne({ where: { username } }).then((user) => {
    if (!user) {
      return res.json({ success: false, msg: "Wrong credentials" });
    }

    if (!user.password) {
      return res.json({ success: false, msg: "No password" });
    }

    bcrypt.compare(password, user.password, (_err2, isMatch) => {
      if (isMatch) {
        if (!process.env.SECRET) {
          throw new Error("SECRET not provided");
        }

        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            role: user.role.id,
            email: user.name,
          },
          process.env.SECRET,
          {
            expiresIn: 86400, 
          }
        );

        const query = { userId: user.id, token };

        activeSessionRepository.save(query);
        (user as { password: string | undefined }).password = undefined;
        return res.json({
          success: true,
          token,
          user,
        });
      }
      return res.json({ success: false, msg: "Wrong credentials" });
    });
  });
};
export const logoutUser = (req: Request, res: Response) => {
  const { token } = req.body;
  activeSessionRepository
    .delete({ token })
    .then(() => res.json({ success: true }))
    .catch(() => {
      res.json({ success: false, msg: "Token revoked" });
    });
};

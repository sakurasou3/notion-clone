import { ValidationError, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

export const validate = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

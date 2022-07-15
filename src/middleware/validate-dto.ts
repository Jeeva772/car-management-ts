import { ValidateFunction } from "ajv";
import { Request, Response, NextFunction } from "express";

function validateDto(ajvValidate: ValidateFunction<{ [x: string]: {} }>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body);
    if (!valid) {
      const errors = ajvValidate.errors;
      return res.status(400).json(errors);
    }
    next();
  };
}

export { validateDto };

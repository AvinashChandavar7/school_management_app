import { Schema, ValidationResult } from 'joi';
import { Request, Response, NextFunction } from 'express';

const validateData = <T>(schema: Schema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationResult: ValidationResult<T> = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    next();
  };

export default validateData;
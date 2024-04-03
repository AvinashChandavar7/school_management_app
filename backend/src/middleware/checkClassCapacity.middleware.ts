import { Request, Response, NextFunction } from 'express';
import Student from '../models/student.model';

const checkClassCapacity = async (
  req: Request, res: Response, next: NextFunction
) => {
  const { id } = req.params;
  const { maxCapacity } = req.body;

  try {
    const currentStudentsCount = await Student.countDocuments({ class: id });

    if (currentStudentsCount >= maxCapacity) {
      return res.status(400).json({ error: 'Class has reached its maximum capacity' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkClassCapacity;
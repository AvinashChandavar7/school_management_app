import { Router } from "express";

import validateData from "../middleware/validateData.middleware";
import { studentSchema } from "../validation/validation";


import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

const router = Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);

router.post('/', validateData(studentSchema), createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);


export default router;
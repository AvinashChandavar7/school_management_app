import { Router } from "express";

import validateData from "../middleware/validateData.middleware";
import { teacherSchema } from "../validation/validation";

import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";


const router = Router();

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);

router.post('/', validateData(teacherSchema), createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
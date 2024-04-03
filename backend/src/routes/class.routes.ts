import { Router } from "express";

import checkClassCapacity from "../middleware/checkClassCapacity.middleware";

import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,

  getClassAnalytics,
} from "../controllers/class.controller";


const router = Router();


router.get('/', getAllClasses);
router.get('/:id', getClassById);

router.post('/', checkClassCapacity, createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

router.get('/:id/analytics', getClassAnalytics);

export default router;
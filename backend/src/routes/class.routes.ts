import { Router } from "express";

import checkClassCapacity from "../middleware/checkClassCapacity.middleware";

import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,

  getClassAnalytics,
  getFinancialAnalytics
} from "../controllers/class.controller";


const router = Router();

router.post('/', checkClassCapacity, createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

router.get('/', getAllClasses);
router.get('/:id', getClassById);

router.get('/:id/class-analytics', getClassAnalytics);
router.get('/:id/financial-analytics', getFinancialAnalytics);

export default router;
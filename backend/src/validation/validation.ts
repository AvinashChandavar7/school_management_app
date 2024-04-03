import Joi, { Schema } from 'joi';

import { ClassType } from '../models/class.model';
import { TeacherType } from '../models/teacher.model';
import { StudentType } from '../models/student.model';

const classSchema: Schema<ClassType> = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1990).required(),
  studentFees: Joi.number().positive().required(),
  maxCapacity: Joi.number().integer().min(1).max(60).required(),
  teacher: Joi.string().required(),
});

const teacherSchema: Schema<TeacherType> = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female').required(),
  dob: Joi.date().required(),
  contactDetails: Joi.string().required(),
  salary: Joi.number().positive().required(),
  assignedClass: Joi.string().required(),
});

const studentSchema: Schema<StudentType> = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female').required(),
  dob: Joi.date().required(),
  contactDetails: Joi.string().required(),
  feesPaid: Joi.number().positive().required(),
  class: Joi.string().required(),
});

export { classSchema, teacherSchema, studentSchema }
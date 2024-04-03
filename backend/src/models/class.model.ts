import { Schema, models, model, Document } from "mongoose";

import { TeacherDocument } from "./teacher.model";
import { StudentDocument } from "./student.model";

export interface ClassType extends Document {
  name: string;
  year: number;
  studentFees: number;
  maxCapacity: number;
  teacher: TeacherDocument['_id'];
  students: StudentDocument['_id'][];
}
export interface ClassDocument extends Document, ClassType { }

const classSchema: Schema<ClassDocument> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    year: { type: Number, required: true, min: 1990, },
    studentFees: { type: Number, required: true, },
    maxCapacity: { type: Number, required: true, min: 1, max: 60 },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student', default: [], }],
  },
  { timestamps: true }
);

classSchema.index({ name: 1, year: 1 });

const Class = models.Class || model<ClassType>("Class", classSchema);

export default Class;
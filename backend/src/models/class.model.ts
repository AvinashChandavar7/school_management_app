import { Schema, models, model, Document } from "mongoose";


export interface ClassType extends Document {
  name: string;
  year: number;
  studentFees: number;
  maxCapacity: number;
  teacher: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[];
}
export interface ClassDocument extends Document, ClassType { }

const classSchema: Schema<ClassDocument> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    year: { type: Number, required: true, min: 1990, },
    studentFees: { type: Number, required: true, },
    maxCapacity: { type: Number, required: true, min: 1, max: 60 },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student', }],
  },
  { timestamps: true }
);

classSchema.index({ name: 1, year: 1 });

const Class = models.Class || model<ClassType>("Class", classSchema);

export default Class;
import { Schema, models, model, Document } from "mongoose";

export interface TeacherType extends Document {
  name: string;
  gender: string;
  dob: Date;
  contactDetails: string;
  salary: number;
  assignedClass: Schema.Types.ObjectId;
}
export interface TeacherDocument extends Document, TeacherType { }

const teacherSchema: Schema<TeacherDocument> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ['male', 'female'], },
    dob: { type: Date, required: true, },
    contactDetails: { type: String, required: true, },
    salary: { type: Number, required: true, },
    assignedClass: { type: Schema.Types.ObjectId, ref: 'Class', },
  },
  { timestamps: true }
);

teacherSchema.index({ name: 1, dob: 1 });

const Teacher = models.Teacher || model<TeacherType>("Teacher", teacherSchema);

export default Teacher;
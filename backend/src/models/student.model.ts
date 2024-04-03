import { Schema, models, model, Document } from "mongoose";

export interface StudentType extends Document {
  name: string;
  gender: string;
  dob: Date;
  contactDetails: string;
  feesPaid: number;
  class: Schema.Types.ObjectId;
}
export interface StudentDocument extends Document, StudentType { }

const studentSchema: Schema<StudentDocument> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ['male', 'female'], },
    dob: { type: Date, required: true, },
    contactDetails: { type: String, required: true, },
    feesPaid: { type: Number, required: true, default: 0, },
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true, },
  },
  { timestamps: true }
);

studentSchema.index({ name: 1, dob: 1 });

const Student = models.Student || model<StudentType>("Student", studentSchema);

export default Student;
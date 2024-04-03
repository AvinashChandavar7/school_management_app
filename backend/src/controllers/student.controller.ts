import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Student from "../models/student.model";

const createStudent = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Student']

  const {
    name, gender, dob, contactDetails, feesPaid, class: studentClass
  } = req.body;

  if ([name, gender, dob].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field is required")
  }

  const existingStudent = await Student.findOne({ name });

  if (existingStudent) {
    throw new ApiError(400, "Student name already exists");
  }

  const newStudent = await Student.create({
    name, gender, dob, contactDetails, feesPaid, class: studentClass
  });

  if (!newStudent) {
    throw new ApiError(500, "Failed to create student");
  }

  return res.status(201).json(new ApiResponse(201, newStudent, "Student created successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Student']

  const { id } = req.params;

  const { name, gender, dob } = req.body;

  if ([name, gender, dob].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field is required")
  }


  const existingStudent = await Student.findById(id);

  if (!existingStudent) {
    throw new ApiError(404, "Student not found");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id, req.body, { new: true }
  );

  if (!updatedStudent) {
    throw new ApiError(500, "Failed to update student");
  }

  return res.status(200).json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Student']

  const { id } = req.params;

  const existingStudent = await Student.findById(id);

  if (!existingStudent) {
    throw new ApiError(404, "Student not found");
  }

  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    throw new ApiError(500, "Failed to delete student");
  }

  return res.status(200).json(new ApiResponse(200, deletedStudent, "Student deleted successfully"));
});

const getStudentById = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Student']

  const { id } = req.params;

  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res.status(200).json(new ApiResponse(200, student, "Student found"));
});

const getAllStudents = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Student']

  const students = await Student.find();

  return res.status(200).json(new ApiResponse(200, students, "All students retrieved successfully"));
});

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

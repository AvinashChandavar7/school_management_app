import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Teacher from "../models/teacher.model";


const createTeacher = asyncHandler(async (req, res) => {
  const {
    name, gender, dob, contactDetails, salary, assignedClass
  } = req.body;

  if ([name, gender, dob].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field is required")
  }

  const existingTeacher = await Teacher.findOne({ name });

  if (existingTeacher) {
    throw new ApiError(400, "Teacher name already exists");
  }

  const newTeacher = await Teacher.create(
    { name, gender, dob, contactDetails, salary, assignedClass }
  );


  if (!newTeacher) {
    throw new ApiError(500, "Failed to create teacher");
  }

  return res.status(201).json(new ApiResponse(201, newTeacher, "Teacher created successfully"));
});


const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTeacher = await Teacher.findById(id);

  if (!existingTeacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    id, req.body, { new: true }
  );

  return res.status(200).json(new ApiResponse(200, updatedTeacher, "Teacher updated successfully"));
});


const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTeacher = await Teacher.findById(id);

  if (!existingTeacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const deletedTeacher = await Teacher.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, deletedTeacher, "Teacher deleted successfully"));
});


const getTeacherById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res.status(200).json(new ApiResponse(200, teacher, "Teacher found"));
});

const getAllTeachers = asyncHandler(async (req, res) => {

  const teachers = await Teacher.find();

  return res.status(200)
    .json(new ApiResponse(200, teachers, "All teachers retrieved successfully"));
});


export {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
}
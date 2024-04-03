import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Class from "../models/class.model";

const createClass = asyncHandler(async (req, res) => {

  const {
    name, year, studentFees, maxCapacity, teacher
  } = req.body;

  if (!name || !year) {
    throw new ApiError(400, "All field is required")
  }

  const existingClass = await Class.findOne({ name });

  if (existingClass) {
    throw new ApiError(400, "Class name already exists");
  }

  const newClass = await Class.create(
    { name, year, studentFees, maxCapacity, teacher }
  );

  if (!newClass) {
    throw new ApiError(500, "Failed to create Class");
  }

  return res.status(201)
    .json(new ApiResponse(201, newClass, "Class created successfully"));
});

const updateClass = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { name, year } = req.body;

  if (!name || !year) {
    throw new ApiError(400, "All field is required")
  }

  const existingClass = await Class.findById(id);

  if (!existingClass) {
    throw new ApiError(404, "Class not found");
  }

  const updatedClass = await Class.findByIdAndUpdate(
    id, req.body, { new: true }
  );

  if (!updatedClass) {
    throw new ApiError(500, "Failed to update Class");
  }

  return res.status(200)
    .json(new ApiResponse(200, updatedClass, "Class updated successfully"));
});


const deleteClass = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const existingClass = await Class.findById(id);

  if (!existingClass) {
    throw new ApiError(404, "Class not found");
  }

  const deletedClass = await Class.findByIdAndDelete(id);

  if (!deletedClass) {
    throw new ApiError(500, "Failed to deleted Class");
  }

  return res.status(200)
    .json(new ApiResponse(200, deletedClass, "Class deleted successfully"));
});


const getClassById = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const foundClass = await Class.findById(id);

  if (!foundClass) {
    throw new ApiError(404, "Class not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, foundClass, "Class found"));
});

const getAllClasses = asyncHandler(async (req, res) => {

  const classes = await Class.find();

  return res.status(200)
    .json(new ApiResponse(200, classes, "All classes retrieved successfully"));
});


export {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
}
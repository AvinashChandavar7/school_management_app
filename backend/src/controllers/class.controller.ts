import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import { FilterQuery } from "mongoose";

import Class, { ClassDocument } from "../models/class.model";
import Student from "../models/student.model";


const createClass = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Class']

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
  //#swagger.tags = ['Class']

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
  //#swagger.tags = ['Class']

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
  //#swagger.tags = ['Class']

  const { id } = req.params;

  const foundClass = await Class.findById(id);

  if (!foundClass) {
    throw new ApiError(404, "Class not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, foundClass, "Class found"));
});

// const getAllClasses = asyncHandler(async (req, res) => {
//   //#swagger.tags = ['Class']

//   const { searchQuery, filter, pageNumber = "1", pageSize = "10" } = req.query as {
//     searchQuery?: string,
//     filter?: string,
//     pageNumber?: string,
//     pageSize?: string
//   };

//   const page: number = parseInt(pageNumber, 10) || 1;
//   const limit: number = parseInt(pageSize, 10) || 10;
//   const skipAmount: number = (page - 1) * limit;

//   const query: FilterQuery<ClassDocument> = {};

//   if (searchQuery) {
//     query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } },]
//   }

//   let sortOptions = {};

//   switch (filter) {
//     case "name":
//       sortOptions = { name: 1 };
//       break;
//     case "year":
//       sortOptions = { year: 1 };
//       break;
//     default:
//       sortOptions = { createdAt: 1 };
//       break;
//   }

//   const classes = await Class.find(query)
//     .sort(sortOptions)
//     .skip(skipAmount)
//     .limit(limit);

//   const classCount: number = await Class.countDocuments(query);

//   const isNext = classCount > skipAmount + classes.length;

//   const responseData = {
//     currentPage: page,
//     totalPages: Math.ceil(classCount / limit),
//     totalCount: classCount,
//     hasNextPage: isNext,
//     data: classes
//   };

//   return res.status(200)
//     .json(new ApiResponse(200, responseData, "All classes retrieved successfully"));
// });

const getAllClasses = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Class']

  const { searchQuery, filter, pageNumber = "1" } = req.query as {
    searchQuery?: string,
    filter?: string,
    pageNumber?: string,
  };

  const page: number = parseInt(pageNumber, 10) || 1;
  const limitPerPage: number = 10;
  const skipAmount: number = (page - 1) * limitPerPage;

  const query: FilterQuery<ClassDocument> = {};

  if (searchQuery) {
    query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } },]
  }

  let sortOptions = {};

  switch (filter) {
    case "name":
      sortOptions = { name: 1 };
      break;
    case "year":
      sortOptions = { year: 1 };
      break;
    default:
      sortOptions = { createdAt: 1 };
      break;
  }

  const classes = await Class.find(query)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(limitPerPage);

  const classCount: number = await Class.countDocuments(query);

  const totalCount = Math.ceil(classCount / limitPerPage)
  const isNext = classCount > skipAmount + classes.length;


  const responseData = {
    pagination: {
      currentPage: page,
      totalPages: totalCount,
      totalCount: classCount,
      hasNextPage: isNext,
    },
    data: classes
  };

  return res.status(200)
    .json(new ApiResponse(200, responseData, "All classes retrieved successfully"));
});



const getClassAnalytics = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Class Analytics']

  const { id } = req.params;

  // const classDetails = await Class.findById(id)
  //   .populate('teacher')
  //   .populate('students')

  // if (!classDetails) {
  //   return res.status(404).json({ error: 'Class not found' });
  // }

  const maleStudentsCount = await Student.countDocuments({ class: id, gender: 'male' });
  const femaleStudentsCount = await Student.countDocuments({ class: id, gender: 'female' });

  const classAnalyticsData = {
    // classDetails,
    maleStudentsCount,
    femaleStudentsCount,
  };

  return res.status(200)
    .json(new ApiResponse(200, classAnalyticsData, "Class Analytics Data"));
});

const getFinancialAnalytics = asyncHandler(async (req, res) => {
  //#swagger.tags = ['Class Analytics']

  const { id } = req.params;

  const classDetails = await Class.findById(id)
    .populate('teacher')
    .populate('students');

  if (!classDetails) {
    return res.status(404).json({ error: 'Class not found' });
  }

  const totalTeacherSalary = classDetails.teacher.salary;

  const totalFeesPaid = classDetails.students.reduce(
    (total: number, student: any) => total + student.feesPaid, 0
  );

  const financialAnalyticsData = {
    totalTeacherSalary,
    totalIncomeFromFees: totalFeesPaid
  };

  return res.status(200)
    .json(new ApiResponse(200, financialAnalyticsData, "Financial Analytics Data"));
})


export {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,

  getClassAnalytics,
  getFinancialAnalytics
}
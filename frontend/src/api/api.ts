import { useMutation } from "react-query";

import { StudentType } from "../components/forms/CreateStudentForm";
import { TeacherType } from "../components/forms/CreateTeacherForm";
import { ClassType } from "../components/forms/CreateClassForm";

import { API_BASE_URL } from "../constants/config";


export const useCreateTeacher = () => {
  const createTeacher = async (formData: TeacherType) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/teacher/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create teacher");
    }

    return response.json();
  };

  const {
    mutateAsync: createTeacherAsync,
    isLoading,
    isError,
    isSuccess
  } = useMutation(createTeacher);

  return { createTeacherAsync, isLoading, isError, isSuccess };
};

export const useCreateStudent = () => {
  const createStudent = async (formData: StudentType) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/student/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create student");
    }

    return response.json();
  };

  const {
    mutateAsync: createStudentAsync,
    isLoading,
    isError,
    isSuccess
  } = useMutation(createStudent);

  return { createStudentAsync, isLoading, isError, isSuccess };
};


export const useCreateClass = () => {
  const createClass = async (formData: ClassType) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create class");
    }

    return response.json();
  };

  const {
    mutateAsync: createClassAsync,
    isLoading,
    isError,
    isSuccess
  } = useMutation(createClass);

  return { createClassAsync, isLoading, isError, isSuccess };
};

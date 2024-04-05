import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

import { API_BASE_URL } from "../constants/config";

import { StudentType } from "../components/forms/CreateStudentForm";
import { TeacherType } from "../components/forms/CreateTeacherForm";
import { ClassType } from "../components/forms/CreateClassForm";





export const useCreateTeacher = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

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
  } = useMutation(createTeacher, {
    onSuccess: () => {
      showToast({ message: "Teacher created successfully", type: "SUCCESS" });
      navigate("/teacher-table");
    },
    onError: () => {
      showToast({ message: "Error creating teacher", type: "ERROR" });
    },
  });

  return { createTeacherAsync, isLoading };
};

export const useCreateStudent = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

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
  } = useMutation(createStudent, {
    onSuccess: () => {
      showToast({ message: "Student created successfully", type: "SUCCESS" });
      navigate("/student-table");
    },
    onError: () => {
      showToast({ message: "Error creating Student", type: "ERROR" });
    },
  });

  return { createStudentAsync, isLoading };
};


export const useCreateClass = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

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
  } = useMutation(createClass, {
    onSuccess: () => {
      showToast({ message: "Class created successfully", type: "SUCCESS" });
      navigate("/class-table");
    },
    onError: () => {
      showToast({ message: "Error creating class", type: "ERROR" });
    },
  });

  return { createClassAsync, isLoading };
};

import { useMutation } from "react-query";

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;

interface TeacherType {
  name: string;
  gender: string;
  dob: string;
  contactDetails: string;
  salary: number;
  assignedClass?: string;
}

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

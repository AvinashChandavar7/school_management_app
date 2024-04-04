import { useQuery } from 'react-query';

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;

export const useGetTeacher = () => {
  const getTeacher = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/teacher/`);

    if (!response.ok) {
      throw new Error('Failed to get teachers');
    }

    return response.json();
  };

  const {
    data: teacherData,
    isLoading,
    isError,
    isSuccess
  } = useQuery('teachers', getTeacher);

  // Ensure teacherData is initialized as an empty array if it's initially null or undefined
  const teachers = teacherData?.data || [];

  return { teachers, isLoading, isError, isSuccess };
};


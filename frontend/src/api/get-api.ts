import { useQuery } from 'react-query';

import { API_BASE_URL } from '../constants/config';


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

  const teachers = teacherData?.data || [];

  return { teachers, isLoading, isError, isSuccess };
};

export const useGetStudent = () => {
  const getStudent = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/student/`);

    if (!response.ok) {
      throw new Error('Failed to get students');
    }

    return response.json();
  };

  const {
    data: studentData,
    isLoading,
    isError,
    isSuccess
  } = useQuery('students', getStudent);

  const students = studentData?.data || [];

  return { students, isLoading, isError, isSuccess };
};


export const useGetClass = () => {
  const getClass = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/`);

    if (!response.ok) {
      throw new Error('Failed to get classes');
    }

    const data = response.json();

    return data
  };


  const {
    data: classData,
    isLoading,
    isError,
    isSuccess
  } = useQuery('classes', getClass);

  const classes = classData?.data || [];

  return { classes, isLoading, isError, isSuccess };
};

export const useGetClassPagination = (pageNumber: number, searchTerm: string = '') => {

  const getClass = async (pageNumber: number, searchTerm: string = '') => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class?pageNumber=${pageNumber}&searchQuery=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error('Failed to get classes');
    }

    const data = response.json();

    return data
  };


  const {
    data: classData,
    isLoading,
    isError,
    isSuccess
  } = useQuery(['classes', pageNumber, searchTerm],
    () => getClass(pageNumber, searchTerm),
    { staleTime: 5 * 60 * 1000 }
  );


  const classes = classData?.data || [];

  return { classes, isLoading, isError, isSuccess };
};





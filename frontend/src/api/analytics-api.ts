import { useQuery } from 'react-query';
import { API_BASE_URL } from '../constants/config';

export interface ClassAnalyticsData {
  femaleStudentsCount: number;
  maleStudentsCount: number;
}

export interface FinancialAnalyticsData {
  totalTeacherSalary: number;
  totalIncomeFromFees: number;
}

export const useClassAnalytics = (classId: string) => {
  const getClassAnalytics = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/${classId}/class-analytics`);

    if (!response.ok) {
      throw new Error('Failed to fetch class analytics');
    }

    const { data } = await response.json();

    return data
  };

  const {
    data: classAnalytics,
    isLoading,
    isError,
    refetch
  } = useQuery('classAnalytics', getClassAnalytics);

  return { classAnalytics, isLoading, isError, refetch };
};

export const useFinancialAnalytics = (classId: string) => {
  const getFinancialAnalytics = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/${classId}/financial-analytics`);

    if (!response.ok) {
      throw new Error('Failed to fetch financial analytics');
    }

    const { data } = await response.json();

    return data
  };

  const {
    data: financialAnalytics,
    isLoading,
    isError,
    refetch
  } = useQuery('financialAnalytics', getFinancialAnalytics);

  return { financialAnalytics, isLoading, isError, refetch };
};

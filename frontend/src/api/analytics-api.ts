import { useQuery } from 'react-query';

interface ClassAnalyticsData {
  date: string;
  average_time: number;
}

interface FinancialAnalyticsData {
  totalTeacherSalary: number;
  totalIncomeFromFees: number;
}

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL as string;

export const useClassAnalytics = (classId: string) => {
  const getClassAnalytics = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/${classId}/class-analytics`);

    if (!response.ok) {
      throw new Error('Failed to fetch class analytics');
    }

    return response.json() as Promise<ClassAnalyticsData[]>;
  };

  const {
    data: classAnalytics,
    isLoading,
    isError,
    refetch
  } = useQuery<ClassAnalyticsData[], Error>(
    'classAnalytics', getClassAnalytics
  );

  return { classAnalytics, isLoading, isError, refetch };
};

export const useFinancialAnalytics = (classId: string) => {
  const getFinancialAnalytics = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/class/${classId}/financial-analytics`);

    if (!response.ok) {
      throw new Error('Failed to fetch financial analytics');
    }

    return response.json() as Promise<FinancialAnalyticsData>; // Explicitly cast to FinancialAnalyticsData
  };

  const {
    data: financialAnalytics,
    isLoading,
    isError,
    refetch
  } = useQuery<FinancialAnalyticsData, Error>(
    'financialAnalytics', getFinancialAnalytics
  );

  return { financialAnalytics, isLoading, isError, refetch };
};

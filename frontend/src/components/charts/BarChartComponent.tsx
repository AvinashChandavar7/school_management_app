import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Heading from '../shared/Heading';

interface FinancialAnalyticsData {
  totalTeacherSalary: number;
  totalIncomeFromFees: number;
}

const BarChartComponent: React.FC<{ data: FinancialAnalyticsData }> = ({ data }) => {
  const barData = [
    { name: 'Total Teacher Salary', value: data.totalTeacherSalary },
    { name: 'Total Income From Fees', value: data.totalIncomeFromFees }
  ];

  return (
    <>
      <Heading title={"Financial Analytics Data"} />
      <ResponsiveContainer width="100%" height={300} className={"mt-5"}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartComponent;

import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Heading from '../shared/Heading';

interface ClassAnalyticsData {
  femaleStudentsCount: number;
  maleStudentsCount: number;
}

const PieChartComponent: React.FC<{ data: ClassAnalyticsData }> = ({ data }) => {
  const pieData = [
    { name: 'Female Students', value: data.femaleStudentsCount },
    { name: 'Male Students', value: data.maleStudentsCount }
  ];

  return (
    <>
      <Heading title={"Class Analytics Data"} />

      <ResponsiveContainer width="100%" height={300} className={"mt-5"}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieChartComponent;

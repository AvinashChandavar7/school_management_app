import React from 'react';
import { useGetTeacher } from '../../api/get-api';
import DataTable from './DataTable';

const TeacherTable: React.FC = () => {
  const { teachers, isLoading, isError } = useGetTeacher();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const headers = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Salary',];
  const excludeKeys = ['createdAt', 'updatedAt', '__v', '_id', 'assignedClass'];

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Teachers</h1>
      <DataTable data={teachers} headers={headers} excludeKeys={excludeKeys} />
    </div>
  );
};

export default TeacherTable;

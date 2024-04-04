import React from 'react';
import { useGetStudent } from '../../api/get-api';
import DataTable from './DataTable';

const StudentTable: React.FC = () => {
  const { students, isLoading, isError } = useGetStudent();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const headers = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Fees Paid',];
  const excludeKeys = ['createdAt', 'updatedAt', '__v', '_id', 'class'];

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Students</h1>
      <DataTable data={students} headers={headers} excludeKeys={excludeKeys} />
    </div>
  );
};

export default StudentTable;

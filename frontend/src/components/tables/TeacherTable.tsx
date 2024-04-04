import React from 'react';
import DataTable from './DataTable';
import Heading from '../shared/Heading';
import { useGetTeacher } from '../../api/get-api';

const TeacherTable: React.FC = () => {
  const { teachers, isLoading, isError } = useGetTeacher();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const headers = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Salary'];
  const excludeKeys = ['createdAt', 'updatedAt', '__v', '_id', 'assignedClass'];

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex items-center gap-3">
          <img src="/assets/icons/add-post.svg" alt="add-post" width={24} height={24} />
          <Heading title={"Teacher Table"} />
        </div>
        <DataTable data={teachers} headers={headers} excludeKeys={excludeKeys} />
      </div>
    </div>
  );
};

export default TeacherTable;

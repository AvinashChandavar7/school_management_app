import React from 'react';
import { useGetStudent } from '../../api/get-api';
import DataTable from './DataTable';
import Heading from '../shared/Heading';

const StudentTable: React.FC = () => {
  const { students, isLoading, isError } = useGetStudent();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const headers = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Fees Paid',];
  const excludeKeys = ['createdAt', 'updatedAt', '__v', '_id', 'class'];

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-10 px-5 py-10 overflow-scroll md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex flex-row items-center justify-start w-full max-w-5xl gap-3">
          <img src="/assets/icons/add-post.svg" alt="add-post" width={24} height={24} />
          <Heading title={"Student Table"} />
        </div>

        <DataTable data={students} headers={headers} excludeKeys={excludeKeys} />
      </div>
    </div>
  );
};

export default StudentTable;

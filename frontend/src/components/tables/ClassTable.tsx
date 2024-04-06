import React, { useState } from 'react';
import { useGetClassPagination } from '../../api/get-api';
import DataTable from './DataTable';
import Heading from '../shared/Heading';
import Pagination from './Pagination';
import LoadingSkeleton from '../skeleton/LoadingSkeleton';
import SearchBar from '../shared/SearchBar';

const ClassTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { classes, isLoading, isError } = useGetClassPagination(currentPage, searchTerm);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <div>Error fetching data</div>;

  const headers = ['Name', 'Year', 'Student Fees', 'Max Capacity',];
  const excludeKeys = ['createdAt', 'updatedAt', '__v', '_id', 'teacher', 'students'];

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-3 px-5 py-10 overflow-scroll md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex flex-row items-center justify-start w-full max-w-5xl gap-3">
          <img src="/assets/icons/add-post.svg" alt="add-post" width={24} height={24} />
          <Heading title={"Class Table"} />

        </div>

        <div className='flex justify-end'>
          <SearchBar onSearch={handleSearch} />
        </div>

        <DataTable data={classes.data} headers={headers} excludeKeys={excludeKeys} />

        <Pagination totalPages={classes.pagination.totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ClassTable;

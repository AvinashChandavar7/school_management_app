import React from 'react';
import { formatDate } from '../../lib/utils';

interface DataTableProps {
  data: { [key: string]: string }[];
  headers: string[];
  excludeKeys: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, headers, excludeKeys }) => {
  const renderTableHeader = () => {
    const extendedHeaders = [...headers, 'Actions'];
    return extendedHeaders.map((header, index) => (
      <th key={index} className="px-6 py-3 font-bold tracking-wider text-center text-gray-500 uppercase text-md text-balance">
        {header}
      </th>
    ));
  };

  const renderTableBody = () => {
    return data.map((item, index) => {
      const tableCells = Object.entries(item)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value], idx) => (
          <td key={idx} className="px-6 py-4 text-center text-balance whitespace-nowrap">
            {key === 'dob' ? formatDate(value) : value}
          </td>
        ));

      const actionCell = (
        <td key="actions" className="px-6 py-4 text-center text-balance whitespace-nowrap">
          <button className="mr-2" onClick={() => handleEdit(item._id)}>
            <img src="/assets/icons/edit.svg" alt="edit" className='size-5' />
          </button>
          <button onClick={() => handleRemove(item._id)}>
            <img src="/assets/icons/delete.svg" alt="delete" className='size-5' />
          </button>
        </td>
      );

      return (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
          {tableCells}
          {actionCell}
        </tr>
      );
    });
  };

  const handleEdit = (id: string) => {

    console.log('Editing', id);
  };

  const handleRemove = (id: string) => {

    console.log('Removing', id);
  };

  return (
    <div className="relative rounded-lg shadow-md">
      <table className="w-full text-left text-gray-500 border-collapse text-md rtl:text-right ">
        <thead className="uppercase bg-gray-200 w-fit text-md ">
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

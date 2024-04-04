import React from 'react';
import { formatDate } from '../../lib/utils';

interface DataTableProps {
  data: { [key: string]: string }[];
  headers: string[];
  excludeKeys: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, headers, excludeKeys }) => {
  const renderTableHeader = () => {
    return headers.map((header, index) => (
      <th key={index} className="px-6 py-3 font-bold tracking-wider text-center text-gray-500 uppercase text-md text-balance">
        {header}
      </th>
    ));
  };

  const renderTableBody = () => {
    return data.map((item, index) => {

      const tableCells = Object.entries(item)
        .filter(
          ([key]) => !excludeKeys.includes(key)
        )
        .map(
          ([key, value], idx) => (
            <td key={idx} className="px-6 py-4 text-center text-balance whitespace-nowrap">
              {key === 'dob' ? formatDate(value) : value}
            </td>
          )
        );

      return (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
          {tableCells}
        </tr>
      );
    });
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


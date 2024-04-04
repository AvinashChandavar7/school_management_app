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
      <th key={index} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
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
            <td key={idx} className="px-6 py-4 whitespace-nowrap">
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
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default DataTable;

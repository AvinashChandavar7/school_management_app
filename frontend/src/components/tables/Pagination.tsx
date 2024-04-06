import React, { useCallback, useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

  const handleClick = useCallback((page: number) => {
    onPageChange(page);
  }, [onPageChange]);

  const renderPagination = useMemo(() => {
    const rangeWithDots = Array
      .from({ length: totalPages }, (_, i) => i + 1)
      .filter((i) => i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2));

    return rangeWithDots.map((pageNumber, index) => (
      <button
        key={index}
        onClick={() => handleClick(pageNumber)}
        className={`mx-1 px-3 py-1 rounded-md ${pageNumber === currentPage
          ? "bg-blue-400 font-bold text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          } focus:outline-none`}
      >
        {pageNumber}
      </button>
    ));
  }, [totalPages, currentPage, handleClick]);

  return (
    <div className="flex items-center justify-center mt-1 mb-2">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
      >
        Prev
      </button>

      {renderPagination}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

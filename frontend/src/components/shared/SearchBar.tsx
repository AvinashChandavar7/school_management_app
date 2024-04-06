import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (
  { onSearch }
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      onSearch(debouncedSearchTerm);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className='flex items-center border rounded-md w-fit '>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm.trim()}
        onChange={handleInputChange}
        className='p-2 rounded-md outline-none'
      />
      <button onClick={handleSearchClick} className='p-2 px-4 border-l rounded-e outline-slate-300 hover:bg-blue-100'>
        <img src="/assets/icons/search.svg" alt="search" className='object-cover size-6' />
      </button>
    </div>
  );
};

export default SearchBar;


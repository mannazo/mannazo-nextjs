const SearchBar = () => {
  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Search...'
        className='w-full rounded-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
      />
    </div>
  );
};

export default SearchBar;

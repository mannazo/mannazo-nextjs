const InputArea = () => {
  return (
    <div className='flex items-center'>
      <input
        type='text'
        placeholder='메시지를 입력하세요...'
        className='flex-grow rounded-l-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
      />
      <button className='rounded-r-lg bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600'>
        전송
      </button>
    </div>
  );
};

export default InputArea;

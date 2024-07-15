//pagination 을 위해 사용
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-8 flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 rounded px-3 py-1 ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, pageSize, totalItems, onPageChange }: PaginationProps) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const renderPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (endPage - startPage < maxVisible - 1) {
      if (page < totalPages / 2) {
        endPage = Math.min(totalPages, startPage + maxVisible - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      {/* Controls ở giữa */}
      <div className="flex items-center gap-1">
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        {renderPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-full ${
              page === p ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      {/* Thông tin items */}
      <span className="text-sm text-gray-600">
        {start}-{end} of {totalItems} items
      </span>
    </div>
  );
};

export default Pagination;

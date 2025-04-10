// components/Pagination.js
import React from 'react'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleClick = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handleClick(currentPage - 1)}
        className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-700 rounded"
        disabled={currentPage === 1}
      >
        ⬅ Prev
      </button>
      <span className="px-4 py-2">{currentPage} / {totalPages}</span>
      <button
        onClick={() => handleClick(currentPage + 1)}
        className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-700 rounded"
        disabled={currentPage === totalPages}
      >
        Next ➡
      </button>
    </div>
  )
}

export default Pagination

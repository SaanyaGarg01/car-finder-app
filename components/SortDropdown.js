// components/SortDropdown.js
import React from 'react'

const SortDropdown = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="mb-3">
      <select
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value)}
        className="p-2 rounded border dark:bg-gray-800"
      >
        <option value="default">Sort by Price</option>
        <option value="asc">Price Low to High</option>
        <option value="desc">Price High to Low</option>
      </select>
    </div>
  )
}

export default SortDropdown

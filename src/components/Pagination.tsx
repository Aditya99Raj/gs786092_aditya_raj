import { Table } from '@tanstack/react-table'
import React from 'react'

const Pagination = ({table}:{table:Table<any>}) => {
  return (
    <div className="w-full flex justify-between mt-4">
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="bg-blue-600 text-white p-2 rounded"
    >
      Previous
    </button>
    <span>
      Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
      {table.getPageCount()}
    </span>
    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="bg-blue-600 text-white px-4 rounded"
    >
      Next
    </button>
  </div>
  )
}

export default Pagination
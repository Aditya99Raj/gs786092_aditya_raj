import { Table,flexRender } from '@tanstack/react-table'
import React from 'react'

const ReactTable = ({table}:{table:Table<any>}) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
    <thead className="bg-gray-100">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="border border-gray-300 p-4">
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="hover:bg-gray-50 p-2">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border border-gray-300 p-2">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ReactTable
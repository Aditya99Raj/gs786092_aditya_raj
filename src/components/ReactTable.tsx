import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';

const ReactTable = ({ table }: { table: Table<any> }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="w-full table-auto border-collapse text-sm text-left text-gray-800">
        <thead className="bg-grey-700 text-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;

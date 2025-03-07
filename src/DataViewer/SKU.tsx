import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addSku, removeSku } from '../redux/actions';
import { RootState } from '../redux';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Pagination from '../components/Pagination';

interface SKUData {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: string;
  Cost: string;
}


const SKU: React.FC = () => {
  const skus = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();
  const [newSKU, setNewSKU] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/db.json');
        const data: SKUData[] = response.data.skus || [];
        console.log(data)
        data.forEach((skus) => dispatch(addSku(skus)));
      } catch (error) {
        console.error('Error fetching SKU data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const columns = useMemo(() => 
  [
      { accessorKey: "ID", header: "ID" },
      { accessorKey: "Label", header: "Label" },
      { accessorKey: "Class", header: "Class" },
      { accessorKey: "Department", header: "Department" },
      { accessorKey: "Price", header: "Price" },
      { accessorKey: "Cost", header: "Cost" },
      {
        header: "Actions",
        cell: ({ row }: any) => (
          <button
            onClick={() => dispatch(removeSku(row.index))}
            className="text-red-600"
          >
            Remove
          </button>
        ),
      },
    ],
    [dispatch]
  );

  const table = useReactTable({
    data: skus,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  const handleaddSku = () => {
    if (newSKU.trim()) {
      dispatch(addSku({ SKU: newSKU, Description: 'New SKU', Category: 'General', Price: '$0.00' }));
      setNewSKU('');
    }
  };

  const handleremoveSku = (index: number) => {
    dispatch(removeSku(index));
  };
console.log()

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">SKU Management</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newSKU}
          onChange={(e) => setNewSKU(e.target.value)}
          placeholder="Enter SKU name"
          className="p-2 border rounded"
        />
        <button onClick={handleaddSku} className="bg-blue-600 text-white p-2 rounded">Add SKU</button>
      </div>
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
      <Pagination table={table} />
    </div>
  );
};

export default SKU;

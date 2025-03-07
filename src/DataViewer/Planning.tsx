import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { addPlanning } from '../redux/actions';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Pagination from '../components/Pagination';

interface PlanningData {
  Week: string;
  Target: string;
  Actual: string;
  Variance: string;
}

const Planning: React.FC = () => {
  const dispatch = useDispatch();
  const planning = useSelector((state: RootState) => state.planning);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanningData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/db.json');
        const data: PlanningData[] = response.data.planning || [];
        data.forEach((plan) => dispatch(addPlanning(plan)));
      } catch (error) {
        console.error('Error fetching planning data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanningData();
  }, [dispatch]);

  const columns = useMemo(() => 
  [
      { accessorKey: "Store", header: "Store" },
      { accessorKey: "SKU", header: "SKU" },
      { accessorKey: "Week", header: "Week" },
      { accessorKey: "Sales Units", header: "Sales Units" },
      {
        header: "Actions",
        cell: ({ row }: any) => (
          <button
            onClick={() =>({})}
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
    data: planning,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="p-8 w-full flex flex-col   items-center">
      <h1 className="text-3xl font-bold mb-4">Planning</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        
      <><table className="w-full table-auto border-collapse border border-gray-300">
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
          </table><Pagination table={table} /></>
      )}
    </div>
  );
};

export default Planning;

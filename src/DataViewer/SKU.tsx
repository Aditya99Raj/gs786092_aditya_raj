import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addSku, removeSku } from '../redux/actions';
import { RootState } from '../redux';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Pagination from '../components/Pagination';
import ReactTable from '../components/ReactTable';

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

  return (
    <div className="p-8 w-full flex flex-col items-center">
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
      <ReactTable table={table} />
      <Pagination table={table} />
    </div>
  );
};

export default SKU;

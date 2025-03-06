import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { addStore, removeStore } from "../redux/actions";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { JSX } from "react/jsx-runtime";

type Store = {
  ID: string;
  Label: string;
  City: string;
  State: string;
};

const Stores: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();
  const [newStore, setNewStore] = useState("");

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        data.stores.forEach((store: string) => dispatch(addStore(store)));
      });
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { accessorKey: "ID", header: "ID" },
      { accessorKey: "Label", header: "Label" },
      { accessorKey: "City", header: "City" },
      { accessorKey: "State", header: "State" },
      {
        header: "Actions",
        cell: ({ row }: any) => (
          <button
            onClick={() => dispatch(removeStore(row.index))}
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
    data: stores,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleAddStore = () => {
    if (newStore.trim()) {
      dispatch(addStore(newStore.trim()));
      setNewStore("");
    }
  };

  const handleRemoveStore = (index: number) => {
    dispatch(removeStore(index));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Stores</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newStore}
          onChange={(e) => setNewStore(e.target.value)}
          placeholder="Enter store name"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddStore}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Store
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 p-2">
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
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
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
          className="bg-blue-600 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stores;

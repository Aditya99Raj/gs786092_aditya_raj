import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { addStore, removeStore } from "../redux/actions";
import {useReactTable, getCoreRowModel, getPaginationRowModel, flexRender,} from "@tanstack/react-table";
import axios from "axios";
import Pagination from "../components/Pagination";
import ReactTable from "../components/ReactTable";

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
    const fetchStores = async () => {
      try {
        const response = await axios.get("/db.json");
        response.data.stores.forEach((store: string) => {
          dispatch(addStore(store));
        });
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
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
        pageSize: 8,
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
    <div className="p-8 w-full flex flex-col items-center">
      {/* <h1 className=" text-3xl font-bold mb-4">Manage Stores</h1> */}
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
      <ReactTable table={table} />
      <Pagination table={table} />
    </div>
  );
};

export default Stores;

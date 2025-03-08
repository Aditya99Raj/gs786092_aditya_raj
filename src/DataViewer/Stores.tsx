import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { addStore, removeStore } from "../redux/actions";
import {useReactTable, getCoreRowModel, getPaginationRowModel, flexRender,} from "@tanstack/react-table";
import axios from "axios";
import Pagination from "../components/Pagination";
import ReactTable from "../components/ReactTable";

export type Store = {
  ID: string;
  Label: string;
  City: string;
  State: string;
};

const Stores: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();
  const [newStore, setNewStore] = useState({
    ID: "",
    Label: "",
    City: "",
    State: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


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
            onClick={() => handleRemoveStore(row.original.ID)}
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

  // const handleAddStore = () => {
  //   if (Object.values(newStore).every((field) => field.trim() !== "")) {
  //     dispatch(addStore({ ...newStore }));
  //     setNewStore({ ID: "", Label: "", City: "", State: "" });
  //     setIsModalOpen(false);
  //   }
  // };

  const handleAddStore = async () => {
    if (Object.values(newStore).every((field) => field.trim() !== "")) {
      try {
        const updatedStores = [...stores, newStore];
        await axios.put("/db.json", { stores: updatedStores });
        dispatch(addStore({ ...newStore }));
        setNewStore({ ID: "", Label: "", City: "", State: "" });
      setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding store:", error);
      }
    }
  };

  // const handleAddStore = async () => {
  //   if (formData.ID && formData.Label && formData.City && formData.State) {
  //     try {
  //       const updatedStores = [...stores, formData];
  //       await axios.put("/db.json", { stores: updatedStores });
  //       dispatch(addStore(formData));
  //       setFormData({ ID: "", Label: "", City: "", State: "" });
  //       setIsDialogOpen(false);
  //     } catch (error) {
  //       console.error("Error adding store:", error);
  //     }
  //   }
  // };

  const handleRemoveStore = (id: string) => {
    console.log(id,"id")
    dispatch(removeStore(id));
  };

  // const handleRemoveStore = async (index: number) => {
  //   try {
  //     const updatedStores = stores.filter((_, i) => i !== index);
  //     await axios.put("/db.json", { stores: updatedStores });
  //     dispatch(removeStore(index));
  //   } catch (error) {
  //     console.error("Error removing store:", error);
  //   }
  // };

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <div className="w-full flex justify-end ">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white p-2 rounded mb-4 "
      >
        Add Store
      </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Store</h2>
            {Object.keys(newStore).map((key) => (
              <div key={key} className="mb-2">
                <label className="block mb-1 capitalize">{key}</label>
                <input
                  type="text"
                  value={(newStore as any)[key]}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  placeholder={`Enter ${key}`}
                  className="p-2 border rounded w-full"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStore}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Add Store
              </button>
            </div>
          </div>
        </div>
      )}

      <ReactTable table={table} />
      <Pagination table={table} />
    </div>
  );
};

export default Stores;

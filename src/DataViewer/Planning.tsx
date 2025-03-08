import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { addPlanning } from "../redux/actions";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagination from "../components/Pagination";
import ReactTable from "../components/ReactTable";

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
        const response = await axios.get("/db.json");
        const data: PlanningData[] = response.data.planning || [];
        data.forEach((plan) => dispatch(addPlanning(plan)));
      } catch (error) {
        console.error("Error fetching planning data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanningData();
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { accessorKey: "Store", header: "Store" },
      { accessorKey: "SKU", header: "SKU" },
      { accessorKey: "Week", header: "Week" },
      { accessorKey: "Sales Units", header: "Sales Units" },
      {
        header: "Actions",
        cell: ({ row }: any) => (
          <button onClick={() => ({})} className="text-red-600">
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ReactTable table={table} />
          <Pagination table={table} />
        </>
      )}
    </div>
  );
};

export default Planning;

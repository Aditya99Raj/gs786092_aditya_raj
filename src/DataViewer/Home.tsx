import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FaStore, FaBox, FaChartLine } from "react-icons/fa6";
import { IconType } from "react-icons";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chart from "./Chart";
import Planning from "./Planning";
import SKU from "./SKU";
import Stores from "./Stores";

const Icon: IconType = FaStore;

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center w-full min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/skus" element={<SKU />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/charts" element={<Chart />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default HomePage;

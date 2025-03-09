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
import Auth from "../components/Auth";
import { useAuth } from "../components/AuthContext";
import ProtectedRoute from "../components/ProtectedRoutes";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center w-full min-h-screen pt-20">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/stores" element={<ProtectedRoute><Stores /></ProtectedRoute>} />
            <Route path="/skus" element={<ProtectedRoute><SKU /></ProtectedRoute>} />
            <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
            <Route path="/charts" element={<Chart />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default HomePage;

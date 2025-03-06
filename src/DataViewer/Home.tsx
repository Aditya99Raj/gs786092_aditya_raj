import React from "react";
import { Link } from "react-router-dom";
import { FaStore, FaBox, FaChartLine } from "react-icons/fa6";
import { IconType } from "react-icons";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Icon: IconType = FaStore;

const HomePage: React.FC = () => {
  return (
    <>
    <Navbar/>
      <Sidebar/>
    </>
  );
};

export default HomePage;

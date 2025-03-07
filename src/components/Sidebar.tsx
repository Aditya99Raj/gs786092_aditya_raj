import React from 'react'
import { Link } from "react-router-dom";
import { FaStore, FaBox, FaChartLine } from "react-icons/fa6";
import { IconType } from "react-icons";

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* Left Navigation Menu */}
        <aside className="w-40 bg-blue-600 text-white flex flex-col p-4 space-y-4">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/stores"
                  className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded"
                >
                  <>{/* <FaStore size={20} /> */}</>
                  <span>Stores</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/skus"
                  className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded"
                >
                  {/* <FaBoxes /> */}
                  <span>SKUs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/planning"
                  className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded"
                >
                  {/* <FaCalendarAlt /> */}
                  <span>Planning</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/charts"
                  className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded"
                >
                  {/* <FaChartLine /> */}
                  <span>Charts</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
  )
}

export default Sidebar
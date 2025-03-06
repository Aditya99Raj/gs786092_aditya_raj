import React from 'react';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white-600 text-white w-full flex justify-between items-center p-4 shadow-lg">
        <div className="text-xl font-bold">GSynergy</div>
        <button className="bg-red text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Sign In / Sign Out</button>
      </nav>
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold">Data Viewer App</h1>
      </header>
      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mx-auto">
        <nav>
          <ul className="space-y-4">
            <li><Link to="/stores" className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">Manage Stores</Link></li>
            <li><Link to="/skus" className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">Manage SKUs</Link></li>
            <li><Link to="/planning" className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">Planning</Link></li>
            <li><Link to="/charts" className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">View Charts</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default HomePage;

import React from 'react'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  return (
    <nav className="p-2 flex items-center justify-between bg-red-100 fixed top-0 left-0 w-full z-50 shadow-md">
      <img src='/gsynergy_logo.svg' className='w-40' alt='gsynergy'/>
      <h1 className='text-3xl font-bold mb-4'>Data Viewer App</h1>
      {user ? (
        <button onClick={() => { logout(); navigate('/auth'); }} className='text-red-600'>Sign Out</button>
      ) : (
        <button onClick={() => navigate('/auth')} className='text-blue-600'>Sign In</button>
      )}
        
      </nav>

  )
}

export default Navbar

// netstat -ano | findstr :3000

import React from 'react'

const Navbar = () => {
  return (
    <nav className="p-2 flex items-center justify-between bg-red-100">
      <img src='/gsynergy_logo.svg' className='w-40' alt='gsynergy'/>
      <h1 className='text-3xl font-bold mb-4'>Data Viewer App</h1>
          <span>SignIn/Signout</span>
      </nav>

  )
}

export default Navbar
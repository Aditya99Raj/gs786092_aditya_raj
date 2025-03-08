import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //   login(JSON.parse(storedUser));
        //   navigate('/stores');
        // }
        const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.username) {
          login(parsedUser);
          navigate('/stores');
        } else {
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
    }
      }, [login, navigate]);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
          const user = { username };
          localStorage.setItem('user', JSON.stringify(user));
          login(username);
          navigate('/stores');
        } else {
          setError('Invalid username or password');
        }
      };
    
  
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className='p-8 bg-white shadow-md rounded-lg w-96'>
          <h2 className='text-2xl font-bold mb-6'>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className='mb-4'>
            <label className='block text-gray-700'>Username</label>
            <input 
              type='text' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className='w-full p-2 border rounded-lg' 
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700'>Password</label>
            <input 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className='w-full p-2 border rounded-lg' 
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-lg'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className='mt-4 text-center'>
            {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
            <button type='button' onClick={() => setIsSignUp(!isSignUp)} className='text-blue-600 underline ml-1'>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    );
};

export default Auth;

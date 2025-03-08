import React from 'react';
import './App.css';
import HomePage from './DataViewer/Home';
import "./index.css"
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
   <HomePage/>
   </AuthProvider>
  // <div>Hellooo world</div>
  );
}

export default App;

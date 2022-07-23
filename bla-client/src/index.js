import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { StoreProvider } from 'easy-peasy';
import Navbar from './components/box/Navbar';
import Footer from './components/box/Footer';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    
      <Navbar/>
      <Routes>
        <Route path="/*" element={<App/>} />
      </Routes>
      <Footer/>
    
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


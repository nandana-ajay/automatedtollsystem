import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserVehiclesPage from './pages/UserVehiclesPage';
import UserWalletPage from './pages/UserWalletPage';
import UserVehicles from './pages/UserVehicles'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>
          <center>Automated Toll System</center>
        </h1>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/userhome" element={<UserPage />} />
            <Route path="/user-details/:userId" element={<UserDetailsPage />} />
            <Route path="/:userId/register_vehicle" element={<UserVehiclesPage />} />
            <Route path="/:userId/vehicles" element={<UserVehicles />} />
            <Route path="/:userId/add_balance" element={<UserWalletPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}


export default App
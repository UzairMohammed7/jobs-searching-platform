import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginRoute from './components/LoginRoute';
import Home from './components/Home';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AllJobs from './components/AllJobs';
import JobItemDetails from './components/JobItemDetails';
import './App.css';

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginRoute />} />
    
    <Route 
      path="/" 
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/jobs" 
      element={
        <ProtectedRoute>
          <AllJobs />
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/jobs/:id" 
      element={
        <ProtectedRoute>
          <JobItemDetails />
        </ProtectedRoute>
      } 
    />
    
    <Route path="/not-found" element={<NotFound />} />
    
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
);

export default App;

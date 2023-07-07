import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RouterComponent;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RouterComponent;

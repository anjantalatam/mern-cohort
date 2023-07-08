import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import Courses from '../modules/Courses';
import Course from '../modules/Course';
import CreateCourse from '../modules/CreateCourse';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../modules/LandingPage';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/create"
        element={
          <ProtectedRoute>
            <CreateCourse mode="create" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/edit"
        element={
          <ProtectedRoute>
            <CreateCourse mode="edit" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterComponent;

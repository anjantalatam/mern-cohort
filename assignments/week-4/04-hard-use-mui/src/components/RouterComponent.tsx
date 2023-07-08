import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import Courses from '../modules/Courses';
import Course from '../modules/Course';
import CreateCourse from '../modules/CreateCourse';
import NotFound from './NotFound';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse mode="create" />} />
      <Route path="/courses/edit" element={<CreateCourse mode="edit" />} />
      <Route path="/courses/:courseId" element={<Course />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterComponent;

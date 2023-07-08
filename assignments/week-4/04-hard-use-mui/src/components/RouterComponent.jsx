import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import Courses from '../modules/Courses';
import Course from '../modules/Course';
import CreateCourse from '../modules/CreateCourse';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../modules/LandingPage';
import { useAuth } from '../contexts';

function RouterComponent() {
  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';

  console.log(currentRole, isTutor, 'currentRole');

  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Outlet />}>
        <Route index element={<LandingPage role="user" />} />

        <Route path="signup" element={<Signup role="user" />} />
        <Route path="login" element={<Login role="user" />} />

        {!isTutor && (
          <Route path="courses" element={<Outlet />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path=":courseId"
              element={
                <ProtectedRoute>
                  <Course />
                </ProtectedRoute>
              }
            />
          </Route>
        )}
      </Route>

      {/* admin routes */}
      <Route path="/tutor" element={<Outlet />}>
        <Route index element={<LandingPage role="admin" />} />

        <Route path="signup" element={<Signup role="admin" />} />
        <Route path="login" element={<Login role="admin" />} />

        {isTutor && (
          <Route path="courses" element={<Outlet />}>
            <Route
              index
              element={
                <ProtectedRoute redirectRoute="/tutor">
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute redirectRoute="/tutor">
                  <CreateCourse mode="create" />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute redirectRoute="/tutor">
                  <CreateCourse mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path=":courseId"
              element={
                <ProtectedRoute redirectRoute="/tutor">
                  <Course />
                </ProtectedRoute>
              }
            />
          </Route>
        )}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterComponent;

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import Courses from '../modules/Courses';
import Course from '../modules/Course';
import CreateCourse from '../modules/CreateCourse';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import AuthRoutes from './AuthRoutes';
import LandingPage from '../modules/LandingPage';
import BaseRoute from './BaseRoute';

function RouterComponent() {
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <BaseRoute>
              <LandingPage role="user" />
            </BaseRoute>
          }
        />

        <Route
          path="signup"
          element={
            <AuthRoutes>
              <Signup role="user" />
            </AuthRoutes>
          }
        />
        <Route
          path="login"
          element={
            <AuthRoutes>
              <Login role="user" />
            </AuthRoutes>
          }
        />

        {/* Tutor Login and Sign Up Routes and root routes */}

        <Route path="/tutor" element={<Outlet />}>
          <Route
            index
            element={
              <BaseRoute type="tutor">
                <LandingPage role="admin" />
              </BaseRoute>
            }
          />

          <Route
            path="signup"
            element={
              <AuthRoutes redirectRoute="/tutor">
                <Signup role="admin" />
              </AuthRoutes>
            }
          />
          <Route
            path="login"
            element={
              <AuthRoutes redirectRoute="/tutor">
                <Login role="admin" />
              </AuthRoutes>
            }
          />
        </Route>

        <Route path="courses" element={<Outlet />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          {/* admin routes */}
          <Route
            path="create"
            exact
            element={
              <ProtectedRoute type="adminRoute" redirectRoute="/tutor">
                <CreateCourse mode="create" />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            exact
            element={
              <ProtectedRoute type="adminRoute" redirectRoute="/tutor">
                <CreateCourse mode="edit" />
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

        <Route
          path="my-courses"
          element={
            <ProtectedRoute type="userRoute" redirectRoute="/">
              <Courses type={'purchased-courses'} />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/not-found" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default RouterComponent;

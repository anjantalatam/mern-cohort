import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import Courses from '../modules/Courses';
import Course from '../modules/Course';
import CreateCourse from '../modules/CreateCourse';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import AuthRoutes from './AuthRoutes';
import LandingPage from '../modules/LandingPage';
import { useAuth } from '../contexts';

function RouterComponent() {
  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';
  const isUser = currentRole === 'user';

  console.log(currentRole, isTutor, 'currentRole');

  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Outlet />}>
        <Route index element={<LandingPage role="user" />} />

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

        {isUser && (
          <Route
            path="my-courses"
            element={
              <ProtectedRoute>
                <Courses type={'purchased-courses'} />
              </ProtectedRoute>
            }
          />
        )}
      </Route>

      <Route path="/tutor" element={<Outlet />}>
        <Route index element={<LandingPage role="admin" />} />

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

      {/* admin routes */}
      {isTutor && (
        <Route path="courses" element={<Outlet />}>
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
        </Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterComponent;

import {
  AppBar,
  Button,
  GlobalStyles,
  Toolbar,
  Typography,
} from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import { useNavigate } from 'react-router-dom';
import { useAuth, useGetRole } from '../contexts';

function Navbar() {
  const navigate = useNavigate();

  const { isTutor: isTutorByRoute } = useGetRole();

  const { isAuthenticated, logout } = useAuth();

  const common = (customNavs) => [
    {
      key: 'courses',
      label: 'Courses',
      route: '/courses',
      isEnabled: isAuthenticated,
    },
    ...customNavs,
    {
      key: 'logout',
      label: 'Logout',
      route: '/',
      onClick: logout,
      isEnabled: isAuthenticated,
      btnProps: {
        variant: 'contained',
      },
    },
  ];

  const userNavItems = [
    {
      key: 'login',
      label: 'Login',
      route: '/login',
      isEnabled: !isAuthenticated,
    },
    {
      key: 'signup',
      label: 'Sign Up',
      route: '/signup',
      isEnabled: !isAuthenticated,
    },
    {
      key: 'joinAsTutor',
      label: 'Join as Tutor',
      route: '/tutor',
      isEnabled: !isAuthenticated,
      btnProps: {
        variant: 'contained',
      },
    },

    {
      key: 'myCourses',
      label: 'My Courses',
      route: '/my-courses',
      isEnabled: isAuthenticated,
    },
  ];

  const tutorNavItems = [
    {
      key: 'login',
      label: 'Login',
      route: '/tutor/login',
      isEnabled: !isAuthenticated,
    },
    {
      key: 'signup',
      label: 'Sign Up',
      route: '/tutor/signup',
      isEnabled: !isAuthenticated,
    },
    {
      key: 'joinAsUser',
      label: 'Join as User',
      route: '/',
      isEnabled: !isAuthenticated,
      btnProps: {
        variant: 'contained',
      },
    },
  ];

  const navItemsByRole = isTutorByRoute ? tutorNavItems : userNavItems;

  const navItems = common(navItemsByRole);

  return (
    <AppBar color="default" position="sticky">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
          <OndemandVideoIcon sx={{ mr: 1 }} />
          Course Hub
        </Typography>

        <nav>
          {navItems
            .filter((item) => item.isEnabled)
            .map((item) => (
              <Button
                key={item.key}
                variant="text"
                onClick={item?.onClick ?? (() => navigate(item.route))}
                {...item?.btnProps}>
                {item.label}
              </Button>
            ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

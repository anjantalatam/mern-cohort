const API_END_POINTS = {
  dev: 'http://localhost:3000',
};

const FALL_BACK_ERROR_MESSAGE = 'Something went wrong!';

//  stale
function getTutorRoute(path, role) {
  let route = path;

  if (role === 'admin') {
    route = `/tutor${path}`;
  }

  return route;
}

export { API_END_POINTS, FALL_BACK_ERROR_MESSAGE, getTutorRoute };

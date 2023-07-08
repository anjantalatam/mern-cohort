import PropTypes from 'prop-types';

function LandingPage({ role }) {
  const isTutor = role === 'admin';

  return <div>{isTutor ? 'LandingPage for Tutors' : 'Landing Page'}</div>;
}

LandingPage.propTypes = { role: PropTypes.string };

export default LandingPage;

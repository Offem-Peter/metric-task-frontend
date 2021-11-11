import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Metrics from './pages/Metrics';
import CreatePage from './pages/Create';

const AppRoutes = ({ children }) => {
  return (
    <Router>
      {children}
      <Routes>
        <Route exact path="/" element={<Navigate to="/metrics" />} />
        <Route exact path="*" element={<Navigate to="/metrics" />} />

        <Route path="/metrics" element={<Metrics />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
};

AppRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRoutes;

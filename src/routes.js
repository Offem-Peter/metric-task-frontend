import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Metrics from './pages/Metrics';
import CreatePage from './pages/Create';

export default function AppRoutes({ children }) {
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
}

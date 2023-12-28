import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import UsersPage from './pages/Users';
import { MUIAppBar } from './components/MUIAppBar';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <MUIAppBar />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

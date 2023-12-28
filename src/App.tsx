import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HomePage from './pages/Home';
import UsersPage from './pages/Users';
import { MUIAppBar } from './components/MUIAppBar';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <MUIAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

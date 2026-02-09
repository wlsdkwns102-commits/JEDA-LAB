import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Admin from './pages/Admin';
import PortfolioHyunjung from './pages/PortfolioHyunjung';
import PortfolioLeejina from './pages/PortfolioLeejina';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<CaseStudy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/portfolioHyunjung" element={<PortfolioHyunjung />} />
          <Route path="/PortfolioLeejina" element={<PortfolioLeejina />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

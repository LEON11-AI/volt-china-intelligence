import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import ResearchIndex from './src/pages/ResearchIndex';
import SolidStateReport from './src/pages/reports/SolidStateReport';
import BlogPage from './pages/BlogPage';
import HuaweiCostAnalysis from './src/pages/exclusive/HuaweiCostAnalysis';
import HuaweiStocksList from './src/pages/exclusive/HuaweiStocksList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<ResearchIndex />} />
        <Route path="/research/solid-state-battery" element={<SolidStateReport />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/exclusive/vip-cost-8848" element={<HuaweiCostAnalysis />} />
        <Route path="/exclusive/vip-supply-9961" element={<HuaweiStocksList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

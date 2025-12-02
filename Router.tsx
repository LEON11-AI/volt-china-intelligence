import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ResearchPage from './pages/ResearchPage';
import BlogPage from './pages/BlogPage';
import SolidStateReport from './src/pages/reports/SolidStateReport';
import ResearchIndex from './src/pages/ResearchIndex';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/index" element={<ResearchIndex />} />
        <Route path="/research/solid-state-battery" element={<SolidStateReport />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/reports/solid-state" element={<SolidStateReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

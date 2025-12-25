import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ResearchPage from './pages/ResearchPage';
import BlogPage from './pages/BlogPage';
import SolidStateReport from './src/pages/reports/SolidStateReport';
import ResearchIndex from './src/pages/ResearchIndex';
import BYD_ADAS_Strategy from './src/pages/reports/BYD_ADAS_Strategy';
import BYD_Song_Plus_2026 from './src/pages/reports/BYD_Song_Plus_2026';
import BYD_Humanoid_Robot from './src/pages/reports/BYD_Humanoid_Robot';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/index" element={<ResearchIndex />} />
        <Route path="/research/solid-state-battery" element={<SolidStateReport />} />
        <Route path="/research/byd-adas-strategy" element={<BYD_ADAS_Strategy />} />
        <Route path="/research/byd-song-plus-2026" element={<BYD_Song_Plus_2026 />} />
        <Route path="/research/byd-humanoid-robot" element={<BYD_Humanoid_Robot />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/reports/solid-state" element={<SolidStateReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

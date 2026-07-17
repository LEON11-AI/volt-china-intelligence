import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Business from './src/pages/Business';
import ResearchIndex from './src/pages/ResearchIndex';
import BlogPage from './pages/BlogPage';
import HuaweiCostAnalysis from './src/pages/exclusive/HuaweiCostAnalysis';
import HuaweiStocksList from './src/pages/exclusive/HuaweiStocksList';
import BYD_ADAS_Strategy from './src/pages/reports/BYD_ADAS_Strategy';
import BYD_Song_Plus_2026 from './src/pages/reports/BYD_Song_Plus_2026';
import BYD_Humanoid_Robot from './src/pages/reports/BYD_Humanoid_Robot';
import SubmitQuery from './src/pages/SubmitQuery';
import RequestAccess from './src/pages/RequestAccess';
import Media from './src/pages/Media';
import SupplierMapThanks from './src/pages/SupplierMapThanks';
import SampleBrief from './src/pages/SampleBrief';
import Legal from './src/pages/Legal';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<Business />} />
        <Route path="/intelligence" element={<Business />} />
        <Route path="/media" element={<Media />} />
        <Route path="/sample-brief" element={<SampleBrief />} />
        <Route path="/research/byd-solid-state-battery-2026" element={<SampleBrief />} />
        <Route path="/supplier-map-beta/thanks" element={<SupplierMapThanks />} />
        <Route path="/submit-query" element={<SubmitQuery />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/research" element={<ResearchIndex />} />
        <Route path="/research/index" element={<ResearchIndex />} />
        <Route path="/research/solid-state-battery" element={<SampleBrief />} />
        <Route path="/research/byd-adas-strategy" element={<BYD_ADAS_Strategy />} />
        <Route path="/research/byd-song-plus-2026" element={<BYD_Song_Plus_2026 />} />
        <Route path="/research/byd-humanoid-robot" element={<BYD_Humanoid_Robot />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/exclusive/vip-cost-8848" element={<HuaweiCostAnalysis />} />
        <Route path="/exclusive/vip-supply-9961" element={<HuaweiStocksList />} />
        <Route path="/privacy" element={<Legal type="privacy" />} />
        <Route path="/terms" element={<Legal type="terms" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

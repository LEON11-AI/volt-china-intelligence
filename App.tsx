import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import ResearchIndex from './src/pages/ResearchIndex';
import SolidStateReport from './src/pages/reports/SolidStateReport';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<ResearchIndex />} />
        <Route path="/research/solid-state-battery" element={<SolidStateReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

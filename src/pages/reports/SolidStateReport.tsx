import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import Navbar from '../../../components/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  Defaults
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
);

ChartJS.defaults.color = '#94a3b8';
ChartJS.defaults.borderColor = '#334155';

const marketSizeData = {
  labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
  datasets: [
    {
      label: 'Semi-Solid Battery Market Size (RMB Billions)',
      data: [150, 300, 600, 1200, 2000, 3000],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
    },
    {
      label: 'All-Solid Battery Market Size (RMB Billions)',
      data: [0, 50, 150, 400, 800, 2000],
      backgroundColor: 'rgba(139, 92, 246, 0.7)',
      borderColor: 'rgba(139, 92, 246, 1)',
      borderWidth: 1,
    },
  ],
};

const marketSizeOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Global Solid-State Battery Market Forecast',
      font: { size: 16, weight: 'bold' },
    },
    legend: { position: 'top' as const },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Market Size (RMB Billions)' },
    },
  },
};

const penetrationData = {
  labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
  datasets: [
    {
      label: 'Semi-Solid Penetration (%)',
      data: [5, 10, 15, 18, 20, 21],
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'All-Solid Penetration (%)',
      data: [0, 0.5, 2, 5, 7, 9],
      borderColor: 'rgba(249, 115, 22, 1)',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Total NEV Penetration (%)',
      data: [5, 10.5, 17, 23, 27, 30],
      borderColor: 'rgba(239, 68, 68, 1)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.3,
      fill: true,
    },
  ],
};

const penetrationOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'NEV Market Penetration Forecast',
      font: { size: 16, weight: 'bold' },
    },
    legend: { position: 'top' as const },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 35,
      title: { display: true, text: 'Penetration Rate (%)' },
    },
  },
};

const SolidStateReport: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const ref = document.referrer;
    try {
      const sameOrigin = ref && new URL(ref).origin === window.location.origin;
      if (sameOrigin) {
        navigate(-1);
      } else {
        navigate('/research');
      }
    } catch {
      navigate('/research');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-28 md:pt-32">
        <div className="flex justify-between items-center mb-6">
          <a href="#" onClick={handleBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </a>
          <a href="https://voltchina.gumroad.com/l/qa" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-volt hover:bg-volt-hover text-white text-sm font-semibold">Download Full PDF Report</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="md:col-span-4 p-8 flex flex-col justify-center items-center text-center relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">BYD Solid-State Battery Strategy & Market Landscape</h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-6">In-Depth Analysis: Technology Roadmap & Competitive Landscape</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base relative z-10">
              <span className="bg-blue-900/30 text-blue-300 border border-blue-800 px-4 py-2 rounded-full">Technology Roadmap</span>
              <span className="bg-purple-900/30 text-purple-300 border border-purple-800 px-4 py-2 rounded-full">Commercialization</span>
              <span className="bg-green-900/30 text-green-300 border border-green-800 px-4 py-2 rounded-full">Competition</span>
              <span className="bg-orange-900/30 text-orange-300 border border-orange-800 px-4 py-2 rounded-full">Investment Outlook</span>
            </div>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-center relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10" />
            <div className="flex items-center mb-4 relative z-10">
              <i className="fa-solid fa-battery-full text-4xl text-purple-400 mr-4" />
              <div>
                <p className="text-slate-500 text-sm">2030 Market Size Forecast</p>
                <p className="text-4xl font-bold text-white">RMB 500 Billion</p>
              </div>
            </div>
            <p className="text-slate-400 relative z-10">The global solid-state battery market is projected to exceed RMB 500 billion by 2030, with a CAGR surpassing 60%.</p>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-center relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10" />
            <div className="flex items-center mb-4 relative z-10">
              <i className="fa-solid fa-chart-line text-4xl text-green-400 mr-4" />
              <div>
                <p className="text-slate-500 text-sm">2025 Shipment Forecast</p>
                <p className="text-4xl font-bold text-white">8.5 GWh</p>
              </div>
            </div>
            <p className="text-slate-400 relative z-10">Commercial deployment begins in 2025. Global shipments are expected to reach 8.5 GWh, with ~5% penetration in China.</p>
          </div>

          <div className="md:col-span-4 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Technology Roadmap Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-800">
                    <i className="fa-solid fa-bolt text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sulfide-based</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
                  <div className="text-slate-500 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-blue-400">10⁻² to 10⁻³ S/cm</div>
                  <div className="text-slate-500 whitespace-nowrap">Energy Density</div>
                  <div className="text-right font-bold text-blue-400">600Wh/kg+</div>
                  <div className="text-slate-500 whitespace-nowrap">Challenges</div>
                  <div className="text-right font-bold text-red-400">High cost, moisture sensitivity</div>
                  <div className="text-slate-500 whitespace-nowrap">Major Players</div>
                  <div className="text-right font-bold text-blue-400">Toyota, CATL</div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3 border border-green-800">
                    <i className="fa-solid fa-shield-halved text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Oxide-based</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
                  <div className="text-slate-500 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-green-400">10⁻³ S/cm</div>
                  <div className="text-slate-500 whitespace-nowrap">Energy Density</div>
                  <div className="text-right font-bold text-green-400">300-400Wh/kg</div>
                  <div className="text-slate-500 whitespace-nowrap">Advantages</div>
                  <div className="text-right font-bold text-green-400">Stability, cost-effective</div>
                  <div className="text-slate-500 whitespace-nowrap">Major Players</div>
                  <div className="text-right font-bold text-green-400">WeLion, QingTao</div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 border border-purple-800">
                    <i className="fa-solid fa-layer-group text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Polymer-based</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
                  <div className="text-slate-500 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-purple-400">Low</div>
                  <div className="text-slate-500 whitespace-nowrap">Energy Density</div>
                  <div className="text-right font-bold text-purple-400">200-300Wh/kg</div>
                  <div className="text-slate-500 whitespace-nowrap">Advantages</div>
                  <div className="text-right font-bold text-purple-400">Ease of Processing</div>
                  <div className="text-slate-500 whitespace-nowrap">Major Players</div>
                  <div className="text-right font-bold text-purple-400">Bolloré Group</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Solid-State Battery Market Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="h-80">
                <Bar data={marketSizeData} options={marketSizeOptions} />
              </div>
              <div className="h-80">
                <Line data={penetrationData} options={penetrationOptions} />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Global Competitive Landscape</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-3 border border-red-800">
                    <i className="fa-solid fa-flag text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">China</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-2 border-blue-500">
                    <h4 className="font-bold text-white">CATL</h4>
                    <p className="text-slate-400 text-sm">Diversified strategy; sulfide all-solid pilot line; 450 Wh/kg target</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">BYD</h4>
                    <p className="text-slate-400 text-sm">Sulfide composite electrolyte; all-solid targeting 400 Wh/kg</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">WeLion</h4>
                    <p className="text-slate-400 text-sm">Oxide semi-solid in NIO ET7; 360 Wh/kg achieved</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-800">
                    <i className="fa-solid fa-flag text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Japan</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-2 border-blue-500">
                    <h4 className="font-bold text-white">Toyota</h4>
                    <p className="text-slate-400 text-sm">Leader in sulfide route; mass production targeted for 2027–2028</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">Panasonic</h4>
                    <p className="text-slate-400 text-sm">Diversified strategy; semi-solid prototypes up to 380 Wh/kg</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">AGC</h4>
                    <p className="text-slate-400 text-sm">Focused on oxide electrolytes; thin-film fabrication</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3 border border-green-800">
                    <i className="fa-solid fa-flag text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Europe & US</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-2 border-blue-500">
                    <h4 className="font-bold text-white">QuantumScape</h4>
                    <p className="text-slate-400 text-sm">Oxide/polymer composite; backed by Volkswagen</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">Solid Power</h4>
                    <p className="text-slate-400 text-sm">Dual-layer wound all-solid; BMW/Ford partnerships</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-2 border-slate-700">
                    <h4 className="font-bold text-white">Bolloré</h4>
                    <p className="text-slate-400 text-sm">Polymer solid-state pioneer; LMP systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Semi-Solid Batteries: Strategic Advantages</h2>
            <div className="space-y-4 relative z-10">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 mt-1 border border-purple-800">
                  <i className="fa-solid fa-rocket text-purple-400 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Core Innovation</h3>
                  <p className="text-slate-400 text-sm">Solid electrolyte framework supplemented by minimal liquid electrolyte</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 mt-1 border border-purple-800">
                  <i className="fa-solid fa-shield-virus text-purple-400 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Enhanced Safety Profile</h3>
                  <p className="text-slate-400 text-sm">Zero thermal runaway in nail penetration testing</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 mt-1 border border-purple-800">
                  <i className="fa-solid fa-charging-station text-purple-400 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Superior Fast-Charging</h3>
                  <p className="text-slate-400 text-sm">Supports ultra-fast charging (e.g., 400 kW+)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Commercial Applications</h2>
            <div className="space-y-4 relative z-10">
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">NIO ET7</h3>
                  <span className="bg-blue-900/30 text-blue-300 border border-blue-800 px-2 py-1 rounded text-xs">Premium</span>
                </div>
                <p className="text-slate-400 text-sm mb-2">WeLion 150 kWh semi-solid pack</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Density: <span className="font-bold text-blue-400">360 Wh/kg</span></span>
                  <span className="text-slate-500">Range: <span className="font-bold text-blue-400">1044 km</span></span>
                </div>
              </div>
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">IM L6</h3>
                  <span className="bg-green-900/30 text-green-300 border border-green-800 px-2 py-1 rounded text-xs">Mainstream</span>
                </div>
                <p className="text-slate-400 text-sm mb-2">QingTao 133 kWh semi-solid pack</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Density: <span className="font-bold text-green-400">368 Wh/kg</span></span>
                  <span className="text-slate-500">Power: <span className="font-bold text-green-400">400 kW</span></span>
                </div>
              </div>
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">MG4</h3>
                  <span className="bg-orange-900/30 text-orange-300 border border-orange-800 px-2 py-1 rounded text-xs">Economy</span>
                </div>
                <p className="text-slate-400 text-sm mb-2">First economy model integrating semi-solid tech</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Price: <span className="font-bold text-orange-400">RMB 99k</span></span>
                  <span className="text-slate-500">Goal: <span className="font-bold text-orange-400">Mass Adoption</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Supply Chain & Investment Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-3 border border-red-800">
                    <i className="fa-solid fa-mountain-sun text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Upstream Materials</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-white">Zirconia</h4>
                    <p className="text-slate-400 text-sm">Demand projected to reach 50k tons by 2028</p>
                    <p className="text-blue-400 font-bold text-sm">Dongfang Zirconium, CATL</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">High-Nickel Cathodes</h4>
                    <p className="text-slate-400 text-sm">Market share exceeding 60%</p>
                    <p className="text-blue-400 font-bold text-sm">RONBAY, Easpring</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Silicon-Based Anodes</h4>
                    <p className="text-slate-400 text-sm">Projected 5x market growth</p>
                    <p className="text-blue-400 font-bold text-sm">Ganfeng Lithium, BTR</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-800">
                    <i className="fa-solid fa-cogs text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Midstream Equipment</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-white">Dry Electrode Coating</h4>
                    <p className="text-slate-400 text-sm">Solvent-free; reduces costs by ~30%</p>
                    <p className="text-blue-400 font-bold text-sm">Lead Intelligent</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Isostatic Pressing</h4>
                    <p className="text-slate-400 text-sm">Critical for all-solid battery density</p>
                    <p className="text-blue-400 font-bold text-sm">Hefei Huitong</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Vacuum Drying</h4>
                    <p className="text-slate-400 text-sm">Required dew point below -80℃</p>
                    <p className="text-blue-400 font-bold text-sm">Domestic Supply Chain</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-lg p-5 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3 border border-green-800">
                    <i className="fa-solid fa-car text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Downstream Applications</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-white">Electric Vehicles</h4>
                    <p className="text-slate-400 text-sm">25% penetration forecast by 2030</p>
                    <p className="text-blue-400 font-bold text-sm">NIO, IM, BYD</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Energy Storage</h4>
                    <p className="text-slate-400 text-sm">10% penetration forecast by 2030</p>
                    <p className="text-blue-400 font-bold text-sm">Grid-Scale Solutions</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Aerospace</h4>
                    <p className="text-slate-400 text-sm">eVTOL applications</p>
                    <p className="text-blue-400 font-bold text-sm">CATL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Future Outlook & Market Winners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Technology Evolution</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 flex-shrink-0 border border-blue-800">
                      <span className="font-bold text-blue-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Semi-Solid Battery Dominance (2025–2027)</h4>
                      <p className="text-slate-400">Energy density 450–500 Wh/kg; &gt;500k vehicles deployed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-4 flex-shrink-0 border border-purple-800">
                      <span className="font-bold text-purple-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">All-Solid Battery Breakthrough (2027–2030)</h4>
                      <p className="text-slate-400">Cost reduction to RMB 0.8/Wh; 15–20% market penetration</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4 flex-shrink-0 border border-green-800">
                      <span className="font-bold text-green-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Tech Convergence (Post-2030)</h4>
                      <p className="text-slate-400">Composite electrolytes standard; AI-accelerated materials discovery</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Market Leaders Forecast</h3>
                <div className="space-y-4">
                  <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                    <h4 className="font-bold text-white mb-2">Technology Route Winners</h4>
                    <p className="text-slate-400 text-sm mb-2">Short-term: Oxide Semi-Solid; Mid-term: Sulfide All-Solid; Long-term: Hybrid Routes</p>
                  </div>
                  <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                    <h4 className="font-bold text-white mb-2">Market Leaders</h4>
                    <p className="text-slate-400 text-sm mb-2">Chinese firms with integrated supply chains expected to hold &gt;35% global share</p>
                  </div>
                  <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
                    <h4 className="font-bold text-white mb-2">Key Success Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-900/30 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-sm">Tech Leadership</span>
                      <span className="bg-green-900/30 text-green-300 border border-green-800 px-3 py-1 rounded-full text-sm">Cost Leadership</span>
                      <span className="bg-purple-900/30 text-purple-300 border border-purple-800 px-3 py-1 rounded-full text-sm">Scale Manufacturing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex justify-center mt-8">
            <a href="https://voltchina.gumroad.com/l/qa" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-volt hover:bg-volt-hover text-white font-semibold inline-flex items-center gap-2 shadow-lg shadow-volt/20 hover:shadow-volt/40 transition-all">
              <i className="fa-regular fa-file-lines" />
              <span>Download Full PDF Report</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolidStateReport;

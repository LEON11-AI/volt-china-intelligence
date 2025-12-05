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

const marketSizeData = {
  labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
  datasets: [
    {
      label: 'Semi-solid Battery Market Size (RMB billions)',
      data: [150, 300, 600, 1200, 2000, 3000],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
    },
    {
      label: 'All-solid Battery Market Size (RMB billions)',
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
      text: 'Global Solid-State Battery Market Size Forecast',
      font: { size: 16, weight: 'bold' },
    },
    legend: { position: 'top' as const },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Market Size (RMB billions)' },
    },
  },
};

const penetrationData = {
  labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
  datasets: [
    {
      label: 'Semi-solid Battery Penetration (%)',
      data: [5, 10, 15, 18, 20, 21],
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'All-solid Battery Penetration (%)',
      data: [0, 0.5, 2, 5, 7, 9],
      borderColor: 'rgba(249, 115, 22, 1)',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Total Penetration (%)',
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
      text: 'Penetration Forecast in NEV Market',
      font: { size: 16, weight: 'bold' },
    },
    legend: { position: 'top' as const },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 35,
      title: { display: true, text: 'Penetration (%)' },
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
    <div className="bg-white">
      <Navbar forceDark />
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-28 md:pt-32">
        <div className="flex justify-between items-center mb-6">
          <a href="#" onClick={handleBack} className="text-blue-600 hover:text-blue-700">Back</a>
          <a href="https://voltchina.gumroad.com/l/qa" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-volt hover:bg-volt-hover text-white">Download Full PDF Report</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="md:col-span-4 p-8 flex flex-col justify-center items-center text-center relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">BYD Solid-State Battery & Market Landscape</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">Technical Development and Market Competition Deep-Dive</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">Technology Pathways</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">Industrialization Progress</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">Competitive Landscape</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">Investment Opportunities</span>
            </div>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-center relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5" />
            <div className="flex items-center mb-4 relative z-10">
              <i className="fa-solid fa-battery-full text-4xl text-purple-500 mr-4" />
              <div>
                <p className="text-gray-500 text-sm">2030 Market Size</p>
                <p className="text-4xl font-bold text-gray-900">RMB 500 billion</p>
              </div>
            </div>
            <p className="text-gray-600 relative z-10">The global solid-state battery market is expected to exceed RMB 500 billion by 2030, with a CAGR over 60%.</p>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-center relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5" />
            <div className="flex items-center mb-4 relative z-10">
              <i className="fa-solid fa-chart-line text-4xl text-green-500 mr-4" />
              <div>
                <p className="text-gray-500 text-sm">2025 Shipments</p>
                <p className="text-4xl font-bold text-gray-900">8.5GWh</p>
              </div>
            </div>
            <p className="text-gray-600 relative z-10">Semi-solid batteries are entering Year 1 of commercialization. Global shipments are expected to reach 8.5 GWh in 2025, with ~5% penetration in China.</p>
          </div>

          <div className="md:col-span-4 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Three Technology Routes Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-bolt text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sulfide Route</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2">
                  <div className="text-gray-600 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-blue-600">10⁻² to 10⁻³ S/cm</div>
                  <div className="text-gray-600 whitespace-nowrap">Theoretical Energy Density</div>
                  <div className="text-right font-bold text-blue-600">600Wh/kg+</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Challenges</div>
                  <div className="text-right font-bold text-red-500">High cost, strict environment</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Companies</div>
                  <div className="text-right font-bold text-blue-600">Toyota, CATL</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-shield-halved text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Oxide Route</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2">
                  <div className="text-gray-600 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-green-600">10⁻³ S/cm</div>
                  <div className="text-gray-600 whitespace-nowrap">Theoretical Energy Density</div>
                  <div className="text-right font-bold text-green-600">300-400Wh/kg</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Advantages</div>
                  <div className="text-right font-bold text-green-600">Good stability, low cost</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Companies</div>
                  <div className="text-right font-bold text-green-600">WeLion, QingTao</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-layer-group text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Polymer Route</h3>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-y-2">
                  <div className="text-gray-600 whitespace-nowrap">Ionic Conductivity</div>
                  <div className="text-right font-bold text-purple-600">Low</div>
                  <div className="text-gray-600 whitespace-nowrap">Theoretical Energy Density</div>
                  <div className="text-right font-bold text-purple-600">200-300Wh/kg</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Advantages</div>
                  <div className="text-right font-bold text-purple-600">Good processability, low cost</div>
                  <div className="text-gray-600 whitespace-nowrap">Key Companies</div>
                  <div className="text-right font-bold text-purple-600">Bolloré Group</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Solid-State Battery Market Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="h-80">
                <Bar data={marketSizeData} options={marketSizeOptions} />
              </div>
              <div className="h-80">
                <Line data={penetrationData} options={penetrationOptions} />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Global Competitive Landscape</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-flag text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">China</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-900">CATL</h4>
                    <p className="text-gray-600 text-sm">Multi-route strategy; sulfide all-solid pilot line in operation; 450 Wh/kg energy density</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">BYD</h4>
                    <p className="text-gray-600 text-sm">Sulfide composite electrolyte; all-solid energy density up to 400 Wh/kg</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">WeLion</h4>
                    <p className="text-gray-600 text-sm">Oxide semi-solid applied in NIO ET7; 360 Wh/kg energy density</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-flag text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Japan</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-900">Toyota</h4>
                    <p className="text-gray-600 text-sm">Leader in sulfide route with 1300+ patents; mass production delayed to 2027–2028</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">Panasonic</h4>
                    <p className="text-gray-600 text-sm">Multi-route strategy; semi-solid energy density up to 380 Wh/kg</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">AGC</h4>
                    <p className="text-gray-600 text-sm">Focused on oxide electrolytes; leading thin-film fabrication</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-flag text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Europe & US</h3>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 ml-2 border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-900">QuantumScape</h4>
                    <p className="text-gray-600 text-sm">Oxide/polymer composite electrolyte; backed by Volkswagen</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">Solid Power</h4>
                    <p className="text-gray-600 text-sm">Dual-layer wound all-solid batteries; partners include BMW and Ford</p>
                  </div>
                  <div className="pl-4 ml-2 border-l-4 border-gray-200">
                    <h4 className="font-bold text-gray-900">Bolloré</h4>
                    <p className="text-gray-600 text-sm">Polymer solid-state pioneer; LMP systems commercially deployed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Semi-Solid Batteries: China’s Strategic Advantage</h2>
            <div className="space-y-4 relative z-10">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                  <i className="fa-solid fa-rocket text-purple-500 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Principle Innovation</h3>
                  <p className="text-gray-600">Solid electrolyte framework + small amount of liquid electrolyte for optimal performance–cost balance</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                  <i className="fa-solid fa-shield-virus text-purple-500 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Significantly Improved Safety</h3>
                  <p className="text-gray-600">Thermal runaway over 300℃; nail penetration test shows no fire/explosion, addressing root safety risks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                  <i className="fa-solid fa-charging-station text-purple-500 text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Excellent Fast-Charging</h3>
                  <p className="text-gray-600">Supports higher charging power (e.g., IM L6: 400 kW peak, 12 minutes for 400 km)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Semi-Solid Battery Applications</h2>
            <div className="space-y-4 relative z-10">
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">NIO ET7</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">High-End Model</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Equipped with WeLion 150 kWh semi-solid battery pack</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Energy Density: <span className="font-bold text-blue-600">360 Wh/kg</span></span>
                  <span className="text-gray-500">Tested Range: <span className="font-bold text-blue-600">1044 km</span></span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">IM L6</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Mainstream Premium</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Equipped with QingTao 133 kWh semi-solid battery pack</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Energy Density: <span className="font-bold text-green-600">368 Wh/kg</span></span>
                  <span className="text-gray-500">Charging Power: <span className="font-bold text-green-600">400 kW</span></span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">MG4</h3>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Economy</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">First economy model equipped with semi-solid batteries</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price: <span className="font-bold text-orange-600">RMB 99,800</span></span>
                  <span className="text-gray-500">Goal: <span className="font-bold text-orange-600">Mass adoption</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Supply Chain Investment Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-mountain-sun text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Upstream Materials</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Zirconia</h4>
                    <p className="text-gray-600 text-sm">CAGR 15% during 2025–2028; demand reaching 50,000 tons by 2028</p>
                    <p className="text-blue-600 font-bold text-sm">Dongfang Zirconium, CATL</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">High-Nickel Cathode</h4>
                    <p className="text-gray-600 text-sm">Market size over RMB 10 billion in 2025; high-nickel share over 60%</p>
                    <p className="text-blue-600 font-bold text-sm">RONBAY, Easpring</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Silicon-based Anode</h4>
                    <p className="text-gray-600 text-sm">Lithium metal anode market reaches RMB 3 billion in 2025, 5× 2023</p>
                    <p className="text-blue-600 font-bold text-sm">Ganfeng Lithium, BTR</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-cogs text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Midstream Equipment</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Dry Electrode Equipment</h4>
                    <p className="text-gray-600 text-sm">No solvent needed; reduces production cost by 30%; demand surge 2025–2027</p>
                    <p className="text-blue-600 font-bold text-sm">Lead Intelligent, Yinghe Tech</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Isostatic Press</h4>
                    <p className="text-gray-600 text-sm">Key equipment for all-solid battery manufacturing; compacts layers under high pressure</p>
                    <p className="text-blue-600 font-bold text-sm">Hefei Huitong, Yantai Taihai</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Vacuum Drying</h4>
                    <p className="text-gray-600 text-sm">Environment dew point must be below -80℃; extremely high equipment performance requirements</p>
                    <p className="text-blue-600 font-bold text-sm">Domestic equipment gradually replacing imports</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i className="fa-solid fa-car text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Downstream Applications</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Electric Vehicles</h4>
                    <p className="text-gray-600 text-sm">Penetration reaches 25% by 2030, annual demand over 100 GWh</p>
                    <p className="text-blue-600 font-bold text-sm">NIO, IM, BYD</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Energy Storage</h4>
                    <p className="text-gray-600 text-sm">High safety and long cycle life drive 10% penetration by 2030</p>
                    <p className="text-blue-600 font-bold text-sm">Grid-scale, C&I storage</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Aerospace</h4>
                    <p className="text-gray-600 text-sm">CATL’s condensed-state batteries applied in 4-ton electric aircraft</p>
                    <p className="text-blue-600 font-bold text-sm">Huge potential in eVTOL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 relative bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Future Trends & “Winners” Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Evolution Path</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-blue-500">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Semi-solid Dominance (2025–2027)</h4>
                      <p className="text-gray-600">Energy density rises to 450–500 Wh/kg; cycle life over 1500; over 500k vehicles by 2027</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-purple-500">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">All-solid Breakthrough (2027–2030)</h4>
                      <p className="text-gray-600">Small-batch production in 2027–2028; cost down to RMB 0.8–1.0/Wh by 2030; penetration 15–20%</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-green-500">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Convergence & Hybridization (Post-2030)</h4>
                      <p className="text-gray-600">Multiple routes coexist; composite electrolytes become mainstream; AI accelerates innovation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">“Winners” Forecast</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-bold text-gray-900 mb-2">Technology Route “Winners”</h4>
                    <p className="text-gray-600 text-sm mb-2">Short term: oxide semi-solid dominates; mid term: sulfide all-solid leads high-end; long term: multiple routes coexist</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-bold text-gray-900 mb-2">Corporate "Winners"</h4>
                    <p className="text-gray-600 text-sm mb-2">Chinese companies, with innovation, execution, and supply-chain advantages, will be primary winners, reaching over 35% global share by 2030</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-bold text-gray-900 mb-2">“Winner” Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tech Leadership</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Cost Advantage</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Industrialization Capability</span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Market Resources</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Ecosystem Building</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex justify-center mt-8">
            <a href="https://voltchina.gumroad.com/l/qa" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-volt hover:bg-volt-hover text-white font-semibold inline-flex items-center gap-2">
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

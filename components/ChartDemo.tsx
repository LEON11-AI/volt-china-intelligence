import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartDemo: React.FC = () => {
  const data = {
    labels: ['2023', '2024', '2025'],
    datasets: [
      {
        label: 'LFP $/kWh',
        data: [85, 72, 65],
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Battery Cost Trend' },
    },
    scales: {
      y: {
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(148,163,184,0.2)' },
      },
      x: {
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
    },
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartDemo;

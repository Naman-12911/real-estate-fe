import React from 'react';
import BarChart from '../../charts/BarChart01_Label';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04_Label({title}) {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Meetings',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[250],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Visits',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Messages',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[650],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Calls',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[800],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[850],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={400} height={300} />
    </div>
  );
}

export default DashboardCard04_Label;

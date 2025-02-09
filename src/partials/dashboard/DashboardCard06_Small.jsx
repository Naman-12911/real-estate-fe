import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06_Small({title,labels,data}) {

  const chartData = {
    labels,
    datasets: [
      {
        label:title,
        data,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[400],
          tailwindConfig().theme.colors.purple[400],
          tailwindConfig().theme.colors.teal[400],
          tailwindConfig().theme.colors.orange[400],
          tailwindConfig().theme.colors.pink[400],
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.red[400],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.cyan[400],
          tailwindConfig().theme.colors.lime[400],
          tailwindConfig().theme.colors.rose[400],
          tailwindConfig().theme.colors.fuchsia[400],
          tailwindConfig().theme.colors.emerald[400],
          tailwindConfig().theme.colors.sky[400],
          tailwindConfig().theme.colors.amber[400],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.purple[600],
          tailwindConfig().theme.colors.teal[600],
          tailwindConfig().theme.colors.orange[600],
          tailwindConfig().theme.colors.pink[600],
          tailwindConfig().theme.colors.green[600],
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.cyan[600],
          tailwindConfig().theme.colors.lime[600],
          tailwindConfig().theme.colors.rose[600],
          tailwindConfig().theme.colors.fuchsia[600],
          tailwindConfig().theme.colors.emerald[600],
          tailwindConfig().theme.colors.sky[600],
          tailwindConfig().theme.colors.amber[600],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={595} height={240} />
    </div>
  );
}

export default DashboardCard06_Small;

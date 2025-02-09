import React from "react";

export default function InfoTable({ title, data }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
      </header>
      <div className="overflow-x-auto px-5 py-4">
        <table className="table-auto w-full space-y-10">
          {data.map((item) => (
            <tr className="border-b dark:border-gray-700">
              <th className="py-2 text-left font-bold capitalize">{item.key}</th>
              <td className="py-2">{item.value}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

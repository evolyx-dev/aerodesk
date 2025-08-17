
import React from 'react';
import type { UsageData } from '../types';

interface UsageExampleTableProps {
  data: UsageData[];
}

const UsageExampleTable: React.FC<UsageExampleTableProps> = ({ data }) => {
  const totalDuration = data.reduce((acc, item) => acc + item.duration, 0);
  const totalCost = data.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-gray-700/50 text-xs text-gray-300 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Duration (seconds)
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Cost (NPR)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                {item.date}
              </td>
              <td className="px-6 py-4 text-right">
                {item.duration.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                {item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-white bg-gray-700/50">
            <td className="px-6 py-4 text-base">Total (3 days)</td>
            <td className="px-6 py-4 text-right text-base">
              {totalDuration.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-right text-base">
              {totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UsageExampleTable;

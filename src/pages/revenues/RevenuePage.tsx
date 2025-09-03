import React from 'react';

const RevenuePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Revenue</h1>

      {/* Revenue List */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">All Income from Invoices</h2>
        <table className="bg-white min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Invoice ID</th>
              <th className="px-4 py-2 border-b">Client</th>
              <th className="px-4 py-2 border-b">Date Paid</th>
              <th className="px-4 py-2 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Rows */}
            <tr>
              <td className="px-4 py-2 border-b">#INV001</td>
              <td className="px-4 py-2 border-b">Client A</td>
              <td className="px-4 py-2 border-b">2023-01-20</td>
              <td className="px-4 py-2 border-b">Ar150.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b">#INV002</td>
              <td className="px-4 py-2 border-b">Client B</td>
              <td className="px-4 py-2 border-b">2023-02-25</td>
              <td className="px-4 py-2 border-b">Ar230.00</td>
            </tr>
          </tbody>
        </table>
        <button className="bg-gray-600 hover:bg-gray-700 mt-4 px-4 py-2 rounded-lg text-white">Export to CSV/Excel</button>
      </div>

      {/* Profit Analysis */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Profit Analysis</h2>
        <p><strong>Total Revenue:</strong> Ar380.00</p>
        <p><strong>Total Expenses:</strong> Ar225.00</p>
        <p className="mt-2 font-bold text-lg">Net Profit: Ar155.00</p>
        <div className="flex justify-center items-center bg-gray-200 mt-4 rounded-lg h-48 text-gray-500">
          [Chart: Monthly/Yearly Comparison Placeholder]
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
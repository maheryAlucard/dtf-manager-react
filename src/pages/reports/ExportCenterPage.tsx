import React from 'react';

const ExportCenterPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Export Center</h1>

      {/* Export Options */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Export Data</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Data Type:</label>
            <select className="mt-1 px-3 py-2 border rounded-md w-full">
              <option>Orders</option>
              <option>Invoices</option>
              <option>Clients</option>
              <option>Stock</option>
              <option>Expenses</option>
              <option>Revenues</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Format:</label>
            <select className="mt-1 px-3 py-2 border rounded-md w-full">
              <option>CSV</option>
              <option>Excel</option>
              <option>PDF</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Date Range:</label>
            <input type="date" className="mt-1 mr-2 px-3 py-2 border rounded-md" />
            <input type="date" className="mt-1 px-3 py-2 border rounded-md" />
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 mt-6 px-4 py-2 rounded-lg text-white">Export Data</button>
      </div>
    </div>
  );
};

export default ExportCenterPage;
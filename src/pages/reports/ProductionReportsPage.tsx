import React from 'react';

const ProductionReportsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Production Reports</h1>

      {/* Number of Print Jobs Chart */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Number of Print Jobs</h2>
        <div className="flex justify-center items-center bg-gray-200 rounded-lg h-64 text-gray-500">
          [Chart: Monthly Print Jobs Placeholder]
        </div>
      </div>

      {/* Average Production Time */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Average Production Time</h2>
        <p className="font-bold text-lg">Average Time: 45 minutes per job</p>
      </div>

      {/* Cost per Order Breakdown */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Cost per Order Breakdown</h2>
        <div className="flex justify-center items-center bg-gray-200 rounded-lg h-64 text-gray-500">
          [Chart: Cost per Order Breakdown Placeholder]
        </div>
      </div>
    </div>
  );
};

export default ProductionReportsPage;
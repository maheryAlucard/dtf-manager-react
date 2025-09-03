import React from 'react';

const FinancialReportsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Financial Reports</h1>

      {/* Monthly Revenue vs Expenses Chart */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Monthly Revenue vs Expenses</h2>
        <div className="flex justify-center items-center bg-gray-200 rounded-lg h-64 text-gray-500">
          [Chart: Monthly Revenue vs Expenses Placeholder]
        </div>
      </div>

      {/* Yearly Profit Trends Chart */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Yearly Profit Trends</h2>
        <div className="flex justify-center items-center bg-gray-200 rounded-lg h-64 text-gray-500">
          [Chart: Yearly Profit Trends Placeholder]
        </div>
      </div>
    </div>
  );
};

export default FinancialReportsPage;
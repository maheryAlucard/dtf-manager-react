import React from 'react';

const ProfitAnalysisPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Profit Analysis</h1>

      {/* Overview */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Overview</h2>
        <p><strong>Total Revenue:</strong> Ar10,000.00</p>
        <p><strong>Total Expenses:</strong> Ar7,500.00</p>
        <p className="mt-2 font-bold text-lg">Net Profit: Ar2,500.00</p>
      </div>

      {/* Monthly/Yearly Comparison Chart */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Monthly/Yearly Comparison</h2>
        <div className="flex justify-center items-center bg-gray-200 rounded-lg h-64 text-gray-500">
          [Chart: Monthly/Yearly Profit Trends Placeholder]
        </div>
      </div>
    </div>
  );
};

export default ProfitAnalysisPage;
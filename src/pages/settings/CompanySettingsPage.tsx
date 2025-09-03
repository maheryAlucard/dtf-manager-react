import React from 'react';

const CompanySettingsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Company Settings</h1>

      {/* Business Information */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Business Information</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Business Name:</label>
            <input type="text" className="mt-1 px-3 py-2 border rounded-md w-full" value="DTF Manager Inc." />
          </div>
          <div>
            <label className="block text-gray-700">Logo (URL/Path):</label>
            <input type="text" className="mt-1 px-3 py-2 border rounded-md w-full" placeholder="e.g., /images/logo.png" />
          </div>
          <div>
            <label className="block text-gray-700">Currency:</label>
            <select className="mt-1 px-3 py-2 border rounded-md w-full">
              <option>USD</option>
              <option>EUR</option>
              <option>MGA</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Tax Rate (%):</label>
            <input type="number" className="mt-1 px-3 py-2 border rounded-md w-full" value="10" />
          </div>
          <div>
            <label className="block text-gray-700">Invoice Numbering Prefix:</label>
            <input type="text" className="mt-1 px-3 py-2 border rounded-md w-full" value="INV-" />
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 mt-6 px-4 py-2 rounded-lg text-white">Save Settings</button>
      </div>
    </div>
  );
};

export default CompanySettingsPage;
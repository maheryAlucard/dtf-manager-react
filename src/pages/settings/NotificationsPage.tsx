import React from 'react';

const NotificationsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Notifications</h1>

      {/* Notification Settings */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="stockAlerts" className="border-gray-300 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-600" defaultChecked />
            <label htmlFor="stockAlerts" className="block ml-2 text-gray-900">Enable Low Stock Alerts</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="invoiceReminders" className="border-gray-300 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-600" defaultChecked />
            <label htmlFor="invoiceReminders" className="block ml-2 text-gray-900">Enable Invoice Reminders</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="newOrder" className="border-gray-300 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-600" />
            <label htmlFor="newOrder" className="block ml-2 text-gray-900">Notify on New Order</label>
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 mt-6 px-4 py-2 rounded-lg text-white">Save Notification Settings</button>
      </div>
    </div>
  );
};

export default NotificationsPage;
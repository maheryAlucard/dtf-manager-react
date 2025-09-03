import React from 'react';

const ProfileSettingsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Profile Settings</h1>

      {/* Change Password */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Change Password</h2>
        <div className="gap-4 grid grid-cols-1 max-w-md">
          <div>
            <label className="block text-gray-700">Current Password:</label>
            <input type="password" className="mt-1 px-3 py-2 border rounded-md w-full" />
          </div>
          <div>
            <label className="block text-gray-700">New Password:</label>
            <input type="password" className="mt-1 px-3 py-2 border rounded-md w-full" />
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password:</label>
            <input type="password" className="mt-1 px-3 py-2 border rounded-md w-full" />
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 mt-6 px-4 py-2 rounded-lg text-white">Update Password</button>
      </div>

      {/* User Activity Log */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">User Activity Log</h2>
        <ul className="list-disc list-inside">
          <li>Logged in from IP 192.168.1.100 on 2023-08-23 10:00 AM</li>
          <li>Updated profile information on 2023-08-22 03:30 PM</li>
          <li>Created new order #005 on 2023-08-21 01:15 PM</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
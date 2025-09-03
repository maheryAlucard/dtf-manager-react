import React from 'react';

const UserManagementPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">User Management</h1>

      {/* Add New Employee Form */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Add New Employee</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input type="text" className="mt-1 px-3 py-2 border rounded-md w-full" placeholder="Employee Name" />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input type="email" className="mt-1 px-3 py-2 border rounded-md w-full" placeholder="Employee Email" />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input type="password" className="mt-1 px-3 py-2 border rounded-md w-full" placeholder="Password" />
          </div>
          <div>
            <label className="block text-gray-700">Role:</label>
            <select className="mt-1 px-3 py-2 border rounded-md w-full">
              <option>Admin</option>
              <option>Employee</option>
            </select>
          </div>
        </div>
        <button className="bg-magenta-600 hover:bg-magenta-700 mt-6 px-4 py-2 rounded-lg text-white">Add Employee</button>
      </div>

      {/* Employee List */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Existing Employees</h2>
        <table className="bg-white min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Rows */}
            <tr>
              <td className="px-4 py-2 border-b">John Doe</td>
              <td className="px-4 py-2 border-b">john.doe@example.com</td>
              <td className="px-4 py-2 border-b">Admin</td>
              <td className="px-4 py-2 border-b">
                <button className="mr-2 text-cyan-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b">Jane Smith</td>
              <td className="px-4 py-2 border-b">jane.smith@example.com</td>
              <td className="px-4 py-2 border-b">Employee</td>
              <td className="px-4 py-2 border-b">
                <button className="mr-2 text-cyan-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
import React from 'react';

const BackupRestorePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-gray-800 text-3xl">Backup & Restore</h1>

      {/* Export Database */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Export Database</h2>
        <p className="mb-4">Export your database to a JSON or SQLite dump file.</p>
        <div className="flex space-x-4">
          <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white">Export JSON</button>
          <button className="bg-magenta-600 hover:bg-magenta-700 px-4 py-2 rounded-lg text-white">Export SQLite Dump</button>
        </div>
      </div>

      {/* Import Backup */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Import Backup</h2>
        <p className="mb-4">Import a database backup file (JSON or SQLite).</p>
        <input type="file" className="block hover:file:bg-cyan-100 file:bg-cyan-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-full w-full file:font-semibold text-gray-500 file:text-cyan-700 text-sm file:text-sm" />
        <button className="bg-cyan-600 hover:bg-cyan-700 mt-6 px-4 py-2 rounded-lg text-white">Import Backup</button>
      </div>
    </div>
  );
};

export default BackupRestorePage;
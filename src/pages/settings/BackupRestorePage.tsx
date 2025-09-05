import React, { useRef } from 'react';

const BackupRestorePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportJson = () => {
    // TODO: wire to export JSON service
  };

  const handleExportSqlite = () => {
    // TODO: wire to export SQLite service
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      // TODO: handle import with files[0]
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4">
      {/* Exporter les Données */}
      <div className="bg-white shadow mb-6 p-6 rounded-xl">
        <h2 className="mb-1 font-semibold text-gray-800 text-xl">Exporter les Données</h2>
        <p className="mb-4 text-gray-600">Créez une sauvegarde de vos données pour la sécurité</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 px-5 py-2.5 rounded-lg font-medium text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 16a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 1 1 2 0v8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 12 16Z" />
              <path d="M5 18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3a1 1 0 1 1 2 0v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 1 1 2 0v3Z" />
            </svg>
            Exporter en JSON
          </button>
          <button
            onClick={handleExportSqlite}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-5 py-2.5 rounded-lg font-medium text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2a10 4 0 1 0 0 8 10 4 0 1 0 0-8Zm0 10c-3.204 0-6.042-.77-8-1.987V18c0 2.21 3.582 4 8 4s8-1.79 8-4V10.013C18.042 11.23 15.204 12 12 12Z" />
            </svg>
            Exporter SQLite
          </button>
        </div>
      </div>

      {/* Importer une Sauvegarde */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="mb-1 font-semibold text-gray-800 text-xl">Importer une Sauvegarde</h2>
        <p className="mb-4 text-gray-600">Restaurez vos données à partir d'un fichier de sauvegarde</p>

        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
          className="flex flex-col justify-center items-center p-10 border-2 border-gray-300 border-dashed rounded-xl text-gray-600 text-center"
        >
          <div className="mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M7 18a5 5 0 0 1 0-10c.264 0 .523.02.776.058A6.5 6.5 0 1 1 18.5 16H16a1 1 0 1 1 0-2h2.5a4.5 4.5 0 1 0-4.47-5.101A1 1 0 0 1 12.997 10H12a1 1 0 0 1-.832-1.555A6.01 6.01 0 0 0 7 6a3 3 0 0 0 0 6h1a1 1 0 1 1 0 2H7Z" />
              <path d="M12 14a1 1 0 0 1 1 1v4.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 19.586V15a1 1 0 0 1 1-1Z" />
            </svg>
          </div>
          <p className="font-medium text-gray-700">Glissez votre fichier ici</p>
          <p className="mt-1 text-sm">ou cliquez pour sélectionner un fichier</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBrowseClick}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-5 py-2.5 rounded-lg font-medium text-white"
            >
              Sélectionner un Fichier
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={() => { /* TODO: handle file selection */ }}
          />
        </div>
      </div>
    </div>
  );
};

export default BackupRestorePage;
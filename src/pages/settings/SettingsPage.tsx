import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CompanySettingsPage from './CompanySettingsPage';
import BackupRestorePage from './BackupRestorePage';
import NotificationsPage from './NotificationsPage';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('company');

  const renderSection = () => {
    switch (activeSection) {
      case 'company':
        return <CompanySettingsPage />;
      case 'backup':
        return <BackupRestorePage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <CompanySettingsPage />;
    }
  };

  return (
    <div className="flex h-full">
      <div className="bg-white shadow-md p-4 w-64">
        <h2 className="mb-4 font-semibold text-xl">Paramètres</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === 'company' ? 'bg-blue-100 text-blue-700' : ''
                }`}
                onClick={() => setActiveSection('company')}
              >
                <i className="mr-2 fas fa-building"></i> Paramètres Entreprise
              </Button>
            </li>
            <li className="mb-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === 'backup' ? 'bg-blue-100 text-blue-700' : ''
                }`}
                onClick={() => setActiveSection('backup')}
              >
                <i className="mr-2 fas fa-save"></i> Sauvegarde & Restauration
              </Button>
            </li>
            <li className="mb-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === 'notifications' ? 'bg-blue-100 text-blue-700' : ''
                }`}
                onClick={() => setActiveSection('notifications')}
              >
                <i className="mr-2 fas fa-bell"></i> Notifications
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h1 className="mb-6 font-bold text-2xl">Paramètres</h1>
        <p className="mb-6 text-gray-600">Configurez les paramètres de votre application DTF Manager</p>
        <Card className="p-6">{renderSection()}</Card>
      </div>
    </div>
  );
};

export default SettingsPage;
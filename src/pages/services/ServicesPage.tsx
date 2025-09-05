import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import type { Service } from '../../types/service';
import { useServices } from '../../hooks/useServices';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { services, isLoading, error, deleteService } = useServices();

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      await deleteService(id);
    }
  };

  const headers: { key: keyof Service | 'actions'; label: string }[] = [
    { key: 'name', label: 'Nom' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Prix (Ar)' },
    { key: 'actions', label: 'Actions' }, // 'actions' is not a key of Service, so we need to explicitly allow it
  ];

  const renderServiceRow = (service: Service) => (
    <tr key={service.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">{service.name}</td>
      <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{service.description}</td>
      <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{(service.price / 100).toFixed(2)} Ar</td>
      <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
        <div className="flex justify-end space-x-2">
          <button onClick={() => navigate(`/dashboard/services/edit/${service.id}`)} className="text-cyan-600 hover:text-cyan-900">Modifier</button>
          <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
        </div>
      </td>
    </tr>
  );

  if (isLoading) return <div className="p-4 text-text-secondary">Chargement des services...</div>;
  if (error) return <div className="p-4 text-error-red">Erreur lors du chargement des services.</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-text-primary text-2xl">Gestion des Services</h1>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-text-primary text-xl">Liste des Services</h2>
          <button onClick={() => navigate('/dashboard/services/new')} className="flex items-center bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Ajouter un Service
          </button>
        </div>
        {services && services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-200 min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        {header.label}
                        {header.key !== 'actions' && <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map(renderServiceRow)}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-text-secondary">Aucun service disponible. Créez-en un nouveau !</p>
        )}
      </Card>
    </div>
  );
};

export default ServicesPage;
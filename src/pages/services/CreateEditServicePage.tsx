import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, MinusCircle, ChevronDown } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import type { Service, ServiceElement } from '../../types/service';
import type { StockItem } from '../../types/stock'; // Changed from Stock to StockItem
import { useServices } from '../../hooks/useServices';
import useStock from '../../hooks/useStock'; // Changed to default import

const CreateEditServicePage: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services, createService, updateService } = useServices();
  const { stock: stockItems, loading: isLoadingStock, error: stockError } = useStock();

  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [selectedElements, setSelectedElements] = useState<ServiceElement[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    if (serviceId && services.length > 0) {
      const serviceToEdit = services.find(s => s.id === serviceId);
      if (serviceToEdit) {
        setEditingService(serviceToEdit);
        setServiceName(serviceToEdit.name);
        setServiceDescription(serviceToEdit.description || '');
        setServicePrice((serviceToEdit.price / 100).toString());
        setSelectedElements(serviceToEdit.elements || []);
      }
    } else {
      setEditingService(null);
      setServiceName('');
      setServiceDescription('');
      setServicePrice('');
      setSelectedElements([]);
    }
  }, [serviceId, services]);

  const handleAddElement = () => {
    setSelectedElements([...selectedElements, { stockItemId: '', quantity: 1 }]); // Changed stockId to stockItemId
  };

  const handleElementChange = (index: number, field: 'stockItemId' | 'quantity', value: string | number) => { // Changed stockId to stockItemId
    const newElements = [...selectedElements];
    if (field === 'quantity') {
      newElements[index].quantity = Number(value);
    } else {
      newElements[index].stockItemId = String(value); // Changed stockId to stockItemId
    }
    setSelectedElements(newElements);
  };

  const handleRemoveElement = (index: number) => {
    const newElements = selectedElements.filter((_, i) => i !== index);
    setSelectedElements(newElements);
  };

  const handleSaveService = async () => {
    if (!serviceName || !servicePrice) return;

    const priceInCents = parseInt((parseFloat(servicePrice) * 100).toFixed(0));

    const serviceData = {
      name: serviceName,
      description: serviceDescription,
      price: priceInCents,
      elements: selectedElements.filter(e => e.stockItemId !== '' && e.quantity > 0), // Changed stockId to stockItemId
    };

    if (editingService) {
      await updateService({
        ...editingService,
        ...serviceData,
      });
    } else {
      await createService(serviceData);
    }
    navigate('/dashboard/services');
  };

  if (isLoadingStock) return <div className="p-4 text-text-secondary">Chargement des stocks...</div>;
  if (stockError) return <div className="p-4 text-error-red">Erreur lors du chargement des stocks.</div>;

  const availableStockOptions = [
    { value: '', label: 'Sélectionner un article' }, // Added default option
    ...stockItems.map((item: StockItem) => ({ // Changed Stock to StockItem
      value: item.id,
      label: item.name,
    }))
  ];

  return (
    <div className="p-8">
      <h1 className="mb-2 font-bold text-gray-800 text-3xl">
        {editingService ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}
      </h1>
      <p className="mb-6 text-gray-600">
        {editingService ? 'Modifiez les détails de votre service existant.' : 'Créez un nouveau service et définissez ses composants.'}
      </p>

      <Card className="mb-6 p-6">
        <div className="space-y-4">
          <Input
            label="Nom du Service"
            value={serviceName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceName(e.target.value)}
            placeholder="Nom du service"
          />
          <Input
            label="Description"
            value={serviceDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceDescription(e.target.value)}
            placeholder="Description du service"
          />
          <Input
            label="Prix (Ar)"
            type="number"
            value={servicePrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServicePrice(e.target.value)}
            placeholder="0.00"
          />

          <h3 className="mt-6 mb-3 font-semibold text-text-primary text-xl">Éléments de Stock Utilisés</h3>
          <div className="bg-white shadow-lg p-4 rounded-xl">
            <table className="divide-y divide-gray-200 min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    <div className="flex items-center">
                      Article de Stock
                      <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    <div className="flex items-center">
                      Quantité
                      <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-right uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedElements.map((element, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">
                      <Select
                        label="Article de Stock"
                        options={availableStockOptions}
                        value={element.stockItemId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleElementChange(index, 'stockItemId', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                      <Input
                        type="number"
                        value={element.quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleElementChange(index, 'quantity', e.target.value)}
                        placeholder="1"
                        min="1"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                      <Button variant="danger" onClick={() => handleRemoveElement(index)} className="inline-flex items-center bg-red-600 hover:bg-red-700 shadow-sm px-3 py-1 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium text-white text-sm">
                        <MinusCircle className="mr-2 w-4 h-4" />
                        Retirer
                      </Button>
                    </td>
                  </tr>
                ))}
                {selectedElements.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-gray-500 text-sm text-center">
                      Aucun élément de stock ajouté.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <Button onClick={handleAddElement} variant="secondary" className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-white text-sm">
                <Plus className="mr-2 w-5 h-5" />
                Ajouter un élément
              </Button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveService} className="w-full md:w-auto">
              {editingService ? 'Sauvegarder les modifications' : 'Créer le Service'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateEditServicePage;
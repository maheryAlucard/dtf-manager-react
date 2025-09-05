import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { LuSearch, LuFilter, LuCalendar, LuDownload } from 'react-icons/lu';
import { stockService, type StockMovementItem } from '../../services/stockService';

const StockMovementsPage: React.FC = () => {
  const [movements, setMovements] = useState<StockMovementItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await stockService.getMovements();
        setMovements(data);
      } catch (e) {
        setError('Impossible de charger les mouvements');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'IN':
        return 'bg-lime-500';
      case 'OUT':
        return 'bg-red-500';
      case 'adjustment':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-3xl">Mouvements de Stock</h1>
          <p className="text-gray-600">Suivez et auditez toutes les modifications d'inventaire et les transactions de stock.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" className="hover:bg-gray-100 border-gray-300 text-gray-700">
            <LuFilter className="mr-2" /> Effacer les filtres
          </Button>
          <Button variant="primary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <LuDownload className="mr-2" /> Exporter les données
          </Button>
        </div>
      </div>

      <Card className="shadow-lg mb-6 p-6">
        <h2 className="mb-4 font-semibold text-gray-800 text-xl">Historique des Mouvements</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-6">
          <div className="relative col-span-full lg:col-span-1">
            <LuSearch className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
            <Input
              placeholder="Rechercher par produit, ID ou raison"
              className="pl-10"
            />
          </div>
          <Select
            options={[{ value: 'all', label: 'Tous les produits' }]}
            label="Produit"
            className="col-span-full lg:col-span-1"
          />
          <Select
            options={[
              { value: 'all', label: 'Tous les types' },
              { value: 'in', label: 'Entrée en stock' },
              { value: 'out', label: 'Sortie de stock' },
              { value: 'adjustment', label: 'Ajustement' },
            ]}
            label="Type de mouvement"
            className="col-span-full lg:col-span-1"
          />
          <div className="relative col-span-full lg:col-span-1">
            <LuCalendar className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
            <Input
              type="date"
              placeholder="Date de début"
              className="pl-10"
            />
          </div>
          <div className="relative col-span-full lg:col-span-1">
            <LuCalendar className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
            <Input
              type="date"
              placeholder="Date de fin"
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
        <Table
          headers={[
            { key: 'id', label: 'ID Mouvement' },
            { key: 'dateTime', label: 'Date & Heure' },
            { key: 'product', label: 'Produit' },
            { key: 'type', label: 'Type' },
            { key: 'quantity', label: 'Quantité' },
            { key: 'reason', label: 'Raison' },
            { key: 'operator', label: 'Opérateur' },
            { key: 'notes', label: 'Notes' },
          ]}
          data={movements}
          renderRow={(movement) => (
            <tr key={movement.id} className="hover:bg-gray-50 border-gray-200 border-b">
              <td className="px-4 py-3">
                <span className="font-medium text-cyan-700">{movement.id}</span>
              </td>
              <td className="px-4 py-3">
                <div className="text-gray-700 text-sm">
                  {new Date(movement.createdAt).toLocaleDateString()} <br /> {new Date(movement.createdAt).toLocaleTimeString()}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.productName}</span>
              </td>
              <td className="px-4 py-3">
                <Badge className={`${getBadgeColor(movement.type)} text-white px-2 py-1 rounded-full text-xs`}>
                  {movement.type === 'IN' ? 'Stock Entrant' : movement.type === 'OUT' ? 'Stock Sortant' : 'Ajustement'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.quantity}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.reason || ''}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.createdBy}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-600 text-sm"></span>
              </td>
            </tr>
          )}
        />)}
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          <span>Affichage de 1 à 8 sur 8 mouvements</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="small" className="hover:bg-gray-100 border-gray-300 text-gray-700">
              Précédent
            </Button>
            <Button size="small" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              1
            </Button>
            <Button variant="ghost" size="small" className="hover:bg-gray-100 border-gray-300 text-gray-700">
              Suivant
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockMovementsPage;
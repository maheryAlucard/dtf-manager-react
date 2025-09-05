import React from 'react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { LuSearch, LuFilter, LuCalendar, LuDownload } from 'react-icons/lu';

const StockMovementsPage: React.FC = () => {
  const mockMovements = [
    {
      id: 'SM-2024-001',
      date: '2024-01-15',
      time: '14:30',
      product: 'DTF Film Roll - 24inch',
      type: 'Stock In',
      quantity: '+50',
      unit: 'meters',
      from: '245',
      to: '295',
      reason: 'Purchase Order #PO-2024-003',
      operator: 'Admin',
      notes: 'Supplier: PrintTech Solutions',
    },
    {
      id: 'SM-2024-002',
      date: '2024-01-15',
      time: '16:45',
      product: 'Pigment Ink - Black',
      type: 'Stock Out',
      quantity: '2',
      unit: 'bottles',
      from: '12',
      to: '10',
      reason: 'Production Job #J-2024-089',
      operator: 'Operator1',
      notes: 'Used for cotton t-shirt order',
    },
    {
      id: 'SM-2024-003',
      date: '2024-01-14',
      time: '09:15',
      product: 'DTF Powder - White',
      type: 'Stock In',
      quantity: '+25',
      unit: 'kg',
      from: '15',
      to: '40',
      reason: 'Purchase Order #PO-2024-002',
      operator: 'Admin',
      notes: 'Bulk purchase for Q1',
    },
    {
      id: 'SM-2024-004',
      date: '2024-01-14',
      time: '11:20',
      product: 'DTF Film Roll - 24inch',
      type: 'Stock Out',
      quantity: '15',
      unit: 'meters',
      from: '295',
      to: '280',
      reason: 'Production Job #J-2024-087',
      operator: 'Operator2',
      notes: '',
    },
    {
      id: 'SM-2024-005',
      date: '2024-01-13',
      time: '13:45',
      product: 'Pigment Ink - Cyan',
      type: 'Adjustment',
      quantity: '-1',
      unit: 'bottles',
      from: '8',
      to: '7',
      reason: 'Inventory Adjustment - Damaged',
      operator: 'Admin',
      notes: 'Bottle damaged during transport',
    },
    {
      id: 'SM-2024-006',
      date: '2024-01-13',
      time: '15:30',
      product: 'DTF Powder - White',
      type: 'Stock Out',
      quantity: '5',
      unit: 'kg',
      from: '40',
      to: '35',
      reason: 'Production Job #J-2024-085',
      operator: 'Operator1',
      notes: 'High volume t-shirt production',
    },
    {
      id: 'SM-2024-007',
      date: '2024-01-12',
      time: '10:00',
      product: 'Pigment Ink - Magenta',
      type: 'Stock In',
      quantity: '+6',
      unit: 'bottles',
      from: '4',
      to: '10',
      reason: 'Purchase Order #PO-2024-001',
      operator: 'Admin',
      notes: 'Regular stock replenishment',
    },
    {
      id: 'SM-2024-008',
      date: '2024-01-12',
      time: '14:15',
      product: 'DTF Film Roll - 12inch',
      type: 'Stock Out',
      quantity: '8',
      unit: 'meters',
      from: '120',
      to: '112',
      reason: 'Production Job #J-2024-083',
      operator: 'Operator2',
      notes: 'Small format sticker production',
    },
  ];

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Stock In':
        return 'bg-lime-500';
      case 'Stock Out':
        return 'bg-red-500';
      case 'Adjustment':
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

        <Table
          headers={[
            { key: 'id', label: 'ID Mouvement' },
            { key: 'dateTime', label: 'Date & Heure' },
            { key: 'product', label: 'Produit' },
            { key: 'type', label: 'Type' },
            { key: 'quantity', label: 'Quantité' },
            { key: 'stockChange', label: 'Changement de Stock' },
            { key: 'reason', label: 'Raison' },
            { key: 'operator', label: 'Opérateur' },
            { key: 'notes', label: 'Notes' },
          ]}
          data={mockMovements}
          renderRow={(movement) => (
            <tr key={movement.id} className="hover:bg-gray-50 border-gray-200 border-b">
              <td className="px-4 py-3">
                <span className="font-medium text-cyan-700">{movement.id}</span>
              </td>
              <td className="px-4 py-3">
                <div className="text-gray-700 text-sm">
                  {movement.date} <br /> {movement.time}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.product}</span>
              </td>
              <td className="px-4 py-3">
                <Badge className={`${getBadgeColor(movement.type)} text-white px-2 py-1 rounded-full text-xs`}>
                  {movement.type === 'Stock In' ? 'Stock Entrant' : movement.type === 'Stock Out' ? 'Stock Sortant' : 'Ajustement'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.quantity} {movement.unit}</span>
              </td>
              <td className="px-4 py-3">
                <div className="text-gray-700 text-sm">
                  De: <span className="font-medium">{movement.from}</span> <br /> À: <span className="font-medium">{movement.to}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.reason}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-800">{movement.operator}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-600 text-sm">{movement.notes}</span>
              </td>
            </tr>
          )}
        />
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
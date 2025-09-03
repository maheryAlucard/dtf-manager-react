import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';

// Define the StockMovement interface
interface StockMovement {
  movementId: string;
  dateTime: string;
  product: string;
  type: React.ReactNode; // Can be a Badge component
  quantity: React.ReactNode; // Can include quantity and unit
  stockChange: React.ReactNode; // From: X To: Y
  reason: string;
  operator: string;
  notes: string;
}

const StockMovementsPage: React.FC = () => {
  // Dummy data for stock movements
  const dummyStockMovements: StockMovement[] = [
    {
      movementId: 'SM-2024-001',
      dateTime: '2024-01-15 14:30',
      product: 'DTF Film Roll - 24inch',
      type: <span className="inline-flex items-center bg-lime-50 px-2 py-1 rounded-md ring-1 ring-lime-600/20 ring-inset font-medium text-lime-700 text-xs">Entrée en stock</span>,
      quantity: <span className="text-lime-600">+50 mètres</span>,
      stockChange: <span>De: 245 À: 295</span>,
      reason: 'Commande d\'achat #PO-2024-003',
      operator: 'Admin',
      notes: 'Fournisseur: PrintTech Solutions',
    },
    {
      movementId: 'SM-2024-002',
      dateTime: '2024-01-15 16:45',
      product: 'Pigment Ink - Black',
      type: <span className="inline-flex items-center bg-red-50 px-2 py-1 rounded-md ring-1 ring-red-600/20 ring-inset font-medium text-red-700 text-xs">Sortie de stock</span>,
      quantity: <span className="text-red-600">-2 bouteilles</span>,
      stockChange: <span>De: 12 À: 10</span>,
      reason: 'Travail de production #J-2024-089',
      operator: 'Operator1',
      notes: 'Utilisé pour la commande de t-shirts en coton',
    },
    {
      movementId: 'SM-2024-003',
      dateTime: '2024-01-14 09:15',
      product: 'DTF Powder - White',
      type: <span className="inline-flex items-center bg-lime-50 px-2 py-1 rounded-md ring-1 ring-lime-600/20 ring-inset font-medium text-lime-700 text-xs">Entrée en stock</span>,
      quantity: <span className="text-lime-600">+25 kg</span>,
      stockChange: <span>De: 15 À: 40</span>,
      reason: 'Commande d\'achat #PO-2024-002',
      operator: 'Admin',
      notes: 'Achat en gros pour le T1',
    },
    {
      movementId: 'SM-2024-004',
      dateTime: '2024-01-14 11:20',
      product: 'DTF Film Roll - 24inch',
      type: <span className="inline-flex items-center bg-red-50 px-2 py-1 rounded-md ring-1 ring-red-600/20 ring-inset font-medium text-red-700 text-xs">Sortie de stock</span>,
      quantity: <span className="text-red-600">-15 mètres</span>,
      stockChange: <span>De: 295 À: 280</span>,
      reason: 'Travail de production #J-2024-087',
      operator: 'Operator2',
      notes: 'Commande d\'affiches grand format',
    },
    {
      movementId: 'SM-2024-005',
      dateTime: '2024-01-13 10:00',
      product: 'Pigment Ink - Cyan',
      type: <span className="inline-flex items-center bg-yellow-50 px-2 py-1 rounded-md ring-1 ring-yellow-600/20 ring-inset font-medium text-yellow-700 text-xs">Ajustement</span>,
      quantity: <span className="text-yellow-600">-1 bouteille</span>,
      stockChange: <span>De: 8 À: 7</span>,
      reason: 'Ajustement d\'inventaire - Endommagé',
      operator: 'Admin',
      notes: 'Bouteille endommagée pendant le transport',
    },
    {
      movementId: 'SM-2024-006',
      dateTime: '2024-01-13 10:00',
      product: 'Pigment Ink - Magenta',
      type: <span className="inline-flex items-center bg-red-50 px-2 py-1 rounded-md ring-1 ring-red-600/20 ring-inset font-medium text-red-700 text-xs">Sortie de stock</span>,
      quantity: <span className="text-red-600">-5 kg</span>,
      stockChange: <span>De: 40 À: 35</span>,
      reason: 'Travail de production #J-2024-090',
      operator: 'Operator1',
      notes: 'Commande de t-shirts à grand volume',
    },
    {
      movementId: 'SM-2024-007',
      dateTime: '2024-01-12 15:00',
      product: 'DTF Film Roll - 12inch',
      type: <span className="inline-flex items-center bg-lime-50 px-2 py-1 rounded-md ring-1 ring-lime-600/20 ring-inset font-medium text-lime-700 text-xs">Entrée en stock</span>,
      quantity: <span className="text-lime-600">+100 mètres</span>,
      stockChange: <span>De: 150 À: 250</span>,
      reason: 'Commande d\'achat #PO-2024-004',
      operator: 'Admin',
      notes: 'Nouvelle livraison de stock',
    },
    {
      movementId: 'SM-2024-008',
      dateTime: '2024-01-12 09:00',
      product: 'Pigment Ink - Yellow',
      type: <span className="inline-flex items-center bg-yellow-50 px-2 py-1 rounded-md ring-1 ring-yellow-600/20 ring-inset font-medium text-yellow-700 text-xs">Ajustement</span>,
      quantity: <span className="text-yellow-600">+3 bouteilles</span>,
      stockChange: <span>De: 5 À: 8</span>,
      reason: 'Ajustement d\'inventaire - Trouvé',
      operator: 'Operator2',
      notes: 'Trouvé dans l\'entrepôt arrière',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this value

  const totalPages = Math.ceil(dummyStockMovements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentMovements = dummyStockMovements.slice(startIndex, endIndex);


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-3xl">Mouvements de Stock</h1>
          <p className="text-gray-600">Suivre et auditer tous les changements d'inventaire et les transactions de stock</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="secondary">Effacer les filtres</Button>
          <Button variant="primary">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            </span>
            Exporter les données
          </Button>
        </div>
      </div>

      <Card className="mb-6 p-6">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Historique des mouvements</h2>
        {/* Filters Section */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-5 mb-6">
          <div className="relative col-span-2">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <Input
              type="text"
              placeholder="Rechercher par produit, ID ou raison"
              className="pl-10"
            />
          </div>
          {/* Product Dropdown */}
          <div className="relative">
            <select className="bg-white px-3 py-2 pr-8 border rounded-md w-full appearance-none">
              <option>Tous les produits</option>
              {/* Add product options here */}
            </select>
            <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          {/* Movement Type Dropdown */}
          <div className="relative">
            <select className="bg-white px-3 py-2 pr-8 border rounded-md w-full appearance-none">
              <option>Tous les types</option>
              {/* Add movement type options here */}
            </select>
            <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <Input type="date" placeholder="Date de début" />
          <Input type="date" placeholder="Date de fin" />
        </div>

        {/* Table Section */}
        <Table
          headers={[
            { key: 'movementId', label: 'ID MOUVEMENT' },
            { key: 'dateTime', label: 'DATE & HEURE' },
            { key: 'product', label: 'PRODUIT' },
            { key: 'type', label: 'TYPE' },
            { key: 'quantity', label: 'QUANTITÉ' },
            { key: 'stockChange', label: 'CHANGEMENT DE STOCK' },
            { key: 'reason', label: 'RAISON' },
            { key: 'operator', label: 'OPÉRATEUR' },
            { key: 'notes', label: 'NOTES' },
          ]}
          data={currentMovements}
          renderRow={(movement) => (
            <tr key={movement.movementId} className="hover:bg-gray-50 border-gray-200 border-b">
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.movementId}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.dateTime}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.product}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.type}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.quantity}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.stockChange}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.reason}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.operator}</td>
              <td className="px-4 py-2 text-gray-800 text-sm">{movement.notes}</td>
            </tr>
          )}
        />
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          <span>Affichage de {startIndex + 1} à {Math.min(endIndex, dummyStockMovements.length)} sur {dummyStockMovements.length} mouvements</span>
          <div className="flex space-x-2">
            <Button variant="secondary" size="small" onClick={handlePreviousPage} disabled={currentPage === 1}>Précédent</Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="secondary" size="small" onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StockMovementsPage;
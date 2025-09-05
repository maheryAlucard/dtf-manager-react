import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, PlusCircle, Trash2 } from 'lucide-react';
import useStock from '../../hooks/useStock';
import useClients from '../../hooks/useClients';
import type { StockItem } from '../../types/stock';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Autocomplete, { type AutocompleteOption } from '../../components/ui/Autocomplete';
import Button from '../../components/ui/Button';

interface OrderItem {
  stockItem: StockItem | null;
  quantity: number;
  unitPrice: number;
  total: number;
}

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { stock, loading, error } = useStock();
  const { clients } = useClients();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { stockItem: null, quantity: 0, unitPrice: 0, total: 0 },
  ]);

  // Client fields (controlled), allow either selecting existing client or entering a new one
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');

  // Default dates: today
  const today = new Date().toISOString().slice(0, 10);

  const handleClientSelect = (value: string) => {
    // value can be client name or empty
    const matched = clients.find(c => c.name === value || c.id === value);
    if (matched) {
      setClientName(matched.name);
      setClientEmail(matched.contact || '');
      // Keep phone/address empty as mock data doesn't include them
    } else {
      // New client path
      setClientName(value);
    }
  };

  const computeUnitPriceFromStockItem = (selectedStockItem: StockItem | null): number => {
    if (!selectedStockItem) return 0;
    const hasTotalValue = typeof selectedStockItem.totalValue === 'number' && !isNaN(selectedStockItem.totalValue as number);
    const hasQuantity = typeof selectedStockItem.quantity === 'number' && selectedStockItem.quantity > 0;
    if (hasTotalValue && hasQuantity) {
      return Number(((selectedStockItem.totalValue as number) / selectedStockItem.quantity).toFixed(2));
    }
    // Fallback: derive a nominal price per type or return 0 if unknown
    switch (selectedStockItem.type) {
      case 'Film':
        return 1000;
      case 'Produit':
      case 'Accessoire':
      case 'Autre':
        return 500;
      default:
        return 0;
    }
  };

  const handleAddItem = () => {
    setOrderItems([...orderItems, { stockItem: null, quantity: 0, unitPrice: 0, total: 0 }]);
  };

  const handleAddItemAfter = (index: number) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index + 1, 0, { stockItem: null, quantity: 0, unitPrice: 0, total: 0 });
    setOrderItems(newOrderItems);
  };

  const handleRemoveItem = (index: number) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: any
  ) => {
    const newOrderItems = [...orderItems];
    if (field === 'stockItem') {
      const selectedStockItem = stock.find(item => item.id === value);
      newOrderItems[index].stockItem = selectedStockItem || null;
      newOrderItems[index].unitPrice = computeUnitPriceFromStockItem(selectedStockItem || null);
    } else {
      (newOrderItems[index] as any)[field] = value;
    }

    // Calculate total
    const quantity = newOrderItems[index].quantity;
    const unitPrice = newOrderItems[index].unitPrice;
    newOrderItems[index].total = quantity * unitPrice;

    setOrderItems(newOrderItems);
  };

  const handleBackClick = () => {
    navigate('/dashboard/orders');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New order created with items:', orderItems);
    navigate('/dashboard/orders'); // Redirect to orders list after creation
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBackClick} className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour aux commandes</span>
        </button>
      </div>

      <h1 className="mb-8 font-extrabold text-gray-900 text-4xl">Créer une nouvelle commande</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-xl p-6 rounded-xl">
        {/* Client Information */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Informations client</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Autocomplete
                label="Client existant (auto-complétion)"
                placeholder="Rechercher ou saisir un nouveau client"
                value={clientName}
                options={clients.map(c => ({ id: c.id, label: c.name, data: c }) as AutocompleteOption)}
                onChange={(v) => handleClientSelect(v)}
                onSelect={(opt) => handleClientSelect(opt.label)}
              />
            </div>
            <div>
              <label htmlFor="clientName" className="block font-medium text-gray-700 text-sm">Nom du client</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="Nom du client"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="clientEmail" className="block font-medium text-gray-700 text-sm">Email</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="client@example.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientPhone" className="block font-medium text-gray-700 text-sm">Téléphone</label>
              <input
                type="text"
                id="clientPhone"
                name="clientPhone"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="+1 (123) 456-7890"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientAddress" className="block font-medium text-gray-700 text-sm">Adresse</label>
              <input
                type="text"
                id="clientAddress"
                name="clientAddress"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="123 Business Ave, City, State, ZIP"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Détails de la commande</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label htmlFor="orderDate" className="block font-medium text-gray-700 text-sm">Date de commande</label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue={today}
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block font-medium text-gray-700 text-sm">Date d'échéance</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue={today}
                required
              />
            </div>
            <div>
              <label htmlFor="orderStatus" className="block font-medium text-gray-700 text-sm">Statut de la commande</label>
              <select
                id="orderStatus"
                name="orderStatus"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue="En attente"
              >
                <option>En attente</option>
                <option>En cours</option>
                <option>Terminé</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentStatus" className="block font-medium text-gray-700 text-sm">Statut du paiement</label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue="Impayé"
              >
                <option>Payé</option>
                <option>Impayé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 text-2xl">Articles de la commande</h2>
            <Button type="button" variant="secondary" onClick={handleAddItem} className="flex items-center space-x-2">
              <PlusCircle size={20} />
              <span>Ajouter un article</span>
            </Button>
          </div>
          {loading && <p>Chargement du stock...</p>}
          {error && <p className="text-red-500">Erreur: {error}</p>}

          {orderItems.map((item, index) => (
            <div key={index} className="bg-gray-50 shadow-sm mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  onClick={() => handleAddItemAfter(index)}
                >
                  <PlusCircle size={18} className="text-green-600" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  onClick={() => handleRemoveItem(index)}
                  disabled={orderItems?.length <= 1}
                >
                  <Trash2 size={18} className={orderItems?.length <= 1 ? "text-gray-500" : "text-red-500"} />
                </Button>
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
                <Select
                  label="Article"
                  options={stock.map((sItem) => ({ value: sItem.id, label: `${sItem.name} (${sItem.quantity} en stock)` }))}
                  value={item.stockItem?.id || ''}
                  onChange={(e) => handleItemChange(index, 'stockItem', e.target.value)}
                />
                <Input
                  label="Quantité"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  placeholder="0"
                  min="0"
                />
                <div>
                  <label className="block font-medium text-gray-700 text-sm">Prix unitaire (Ar)</label>
                  {(item.unitPrice === 0 || item.unitPrice === undefined || item.unitPrice === null) ? (
                    <Input
                      label=""
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                      placeholder="0.00"
                      step="0.01"
                    />
                  ) : (
                    <div className="block bg-gray-100 shadow-sm mt-1 px-3 py-2 border border-gray-300 rounded-md w-full sm:text-sm cursor-not-allowed select-none">
                      {item.unitPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-medium text-gray-700 text-sm">Total (Ar)</label>
                  <div className="block bg-gray-100 shadow-sm mt-1 px-3 py-2 border border-gray-300 rounded-md w-full sm:text-sm cursor-not-allowed select-none">
                    {item.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Button type="button" variant="secondary" onClick={handleAddItem} className="flex items-center space-x-2">
              <PlusCircle size={20} />
              <span>Ajouter un article</span>
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 shadow-md px-5 py-2 rounded-lg text-white transition-colors duration-200"
          >
            <Save size={20} />
            <span>Créer la commande</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderPage;
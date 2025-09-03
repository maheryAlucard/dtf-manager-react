import { useState, useEffect } from 'react';

interface StockItem {
  id: string;
  name: string;
  type: 'Film' | 'Ink' | 'T-Shirt' | 'Accessory';
  quantity: number;
  lowStockThreshold: number;
}

const mockStock: StockItem[] = [
  { id: 'S001', name: 'Film Type X', type: 'Film', quantity: 150, lowStockThreshold: 10 },
  { id: 'S002', name: 'Ink Color Y', type: 'Ink', quantity: 75, lowStockThreshold: 5 },
  { id: 'S003', name: 'T-Shirt White M', type: 'T-Shirt', quantity: 500, lowStockThreshold: 50 },
  { id: 'S004', name: 'Film Type Z', type: 'Film', quantity: 5, lowStockThreshold: 10 },
  { id: 'S005', name: 'Ink Color Black', type: 'Ink', quantity: 2, lowStockThreshold: 5 },
];

const useStock = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setStock(mockStock);
      } catch (err) {
        setError('Failed to fetch stock');
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  const getLowStockItems = () => {
    return stock.filter(item => item.quantity <= item.lowStockThreshold);
  };

  return { stock, loading, error, getLowStockItems };
};

export default useStock;
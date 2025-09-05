import { useState, useEffect } from 'react';
import { stockService } from '../services/stockService';
import type { StockItem } from '../types/stock';

const useStock = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const items = await stockService.getStockItems();
        setStock(items);
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
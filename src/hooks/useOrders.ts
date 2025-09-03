import { useState, useEffect } from 'react';

interface Order {
  id: string;
  clientName: string;
  date: string;
  status: 'pending' | 'in progress' | 'completed';
  total: number;
}

const mockOrders: Order[] = [
  { id: '001', clientName: 'Client A', date: '2023-01-15', status: 'pending', total: 150.00 },
  { id: '002', clientName: 'Client B', date: '2023-01-10', status: 'completed', total: 230.00 },
  { id: '003', clientName: 'Client C', date: '2023-02-01', status: 'in progress', total: 500.00 },
];

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setOrders(mockOrders);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
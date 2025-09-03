export interface Order {
  id: string;
  clientName: string;
  date: string;
  status: 'pending' | 'in progress' | 'completed';
  total: number;
}
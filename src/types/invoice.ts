export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  dueDate: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}
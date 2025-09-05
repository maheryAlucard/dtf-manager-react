import { type Order } from "../types/order";

// For now, we'll use mock data
const mockOrders: Order[] = [
  { id: '001', clientName: 'Client A', date: '2023-01-15', status: 'pending', total: 150.00 },
  { id: '002', clientName: 'Client B', date: '2023-01-10', status: 'completed', total: 230.00 },
  { id: '003', clientName: 'Client C', date: '2023-02-01', status: 'in progress', total: 500.00 },
];

export const ordersService = {
  async getOrders(): Promise<Order[]> {
    // Simulate IPC call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders.find(order => order.id === id);
  },

  async createOrder(newOrder: Omit<Order, 'id' | 'status'>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const order: Order = { ...newOrder, id: `00${mockOrders.length + 1}`, status: 'pending' };
    mockOrders.push(order);
    return order;
  },

  async updateOrderStatus(id: string, status: 'pending' | 'in progress' | 'completed'): Promise<Order | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const orderIndex = mockOrders.findIndex(order => order.id === id);
    if (orderIndex > -1) {
      mockOrders[orderIndex].status = status;
      return mockOrders[orderIndex];
    }
    return undefined;
  },
};
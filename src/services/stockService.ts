import axios from 'axios';
import { type StockItem } from "../types/stock";

const API_URL = `${import.meta.env.VITE_BASE_APP_API_URL}/stock`;

const authHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface StockSummaryItem {
  id: string;
  name: string;
  totalItems: number;
  totalValue: number;
}

export interface StockMovementItem {
  id: string;
  productName: string;
  category: string;
  type: 'IN' | 'OUT' | 'adjustment';
  quantity: number;
  unitCost: number | null;
  reason: string | null;
  orderId: string | null;
  createdBy: string;
  createdAt: string;
}

export const stockService = {
  async getStockItems(): Promise<StockItem[]> {
    const response = await axios.get<StockItem[]>(`${API_URL}`, { headers: authHeaders() });
    return response.data;
  },

  async getLowStock(): Promise<Array<{ id: string; name: string; category: string; quantity: number; unit: string; minQuantity: number }>> {
    const response = await axios.get(`${API_URL}/low-stock`, { headers: authHeaders() });
    return response.data;
  },

  async getSummary(): Promise<StockSummaryItem[]> {
    const response = await axios.get<StockSummaryItem[]>(`${API_URL}/summary`, { headers: authHeaders() });
    return response.data;
  },

  async getMovements(): Promise<StockMovementItem[]> {
    const response = await axios.get<StockMovementItem[]>(`${API_URL}/movements`, { headers: authHeaders() });
    return response.data;
  },

  async addOrUpdateStock(params: { productId: string; productName?: string; quantity: number; type: 'IN' | 'OUT' | 'adjustment'; reason?: string; unitCostCents?: number; createdBy: string; }): Promise<{ message: string }>
  {
    const response = await axios.post(`${API_URL}/add-update`, params, { headers: { 'Content-Type': 'application/json', ...authHeaders() } });
    return response.data;
  },

  async updateThreshold(productId: string, minQuantity: number): Promise<{ message: string }>
  {
    const response = await axios.put(`${API_URL}/threshold/${productId}`, { minQuantity }, { headers: { 'Content-Type': 'application/json', ...authHeaders() } });
    return response.data;
  },
};
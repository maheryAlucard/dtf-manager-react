import axios from 'axios';
import type { Service } from "../types/service";

const API_URL = `${import.meta.env.VITE_BASE_APP_API_URL}/services`;

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get<Service[]>(API_URL);
  return response.data;
};

export const getServiceById = async (id: string): Promise<Service> => {
  const response = await axios.get<Service>(`${API_URL}/${id}`);
  return response.data;
};

export const createService = async (newService: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Service> => {
  const response = await axios.post<Service>(API_URL, newService);
  return response.data;
};

export const updateService = async (updatedService: Service): Promise<Service> => {
  const response = await axios.put<Service>(`${API_URL}/${updatedService.id}`, updatedService);
  return response.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
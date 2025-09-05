import { create } from 'zustand';
import type { Service } from '../types/service';
import { getServices, createService as apiCreateService, updateService as apiUpdateService, deleteService as apiDeleteService } from '../services/servicesService';

interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  createService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const fetchedServices = await getServices();
      set({ services: fetchedServices, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch services.', isLoading: false });
      console.error('Failed to fetch services:', err);
    }
  },

  createService: async (service) => {
    set({ isLoading: true, error: null });
    try {
      await apiCreateService(service);
      await get().fetchServices();
    } catch (err) {
      set({ error: 'Failed to create service.', isLoading: false });
      console.error('Failed to create service:', err);
    }
  },

  updateService: async (service) => {
    set({ isLoading: true, error: null });
    try {
      await apiUpdateService(service);
      await get().fetchServices(); // Re-fetch services to update the list
    } catch (err) {
      set({ error: 'Failed to update service.', isLoading: false });
      console.error('Failed to update service:', err);
    }
  },

  deleteService: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiDeleteService(id);
      await get().fetchServices(); // Re-fetch services to update the list
    } catch (err) {
      set({ error: 'Failed to delete service.', isLoading: false });
      console.error('Failed to delete service:', err);
    }
  },
}));
import { useEffect } from 'react';
import { useServicesStore } from '../context/servicesStore';

export const useServices = () => {
  const { services, isLoading, error, fetchServices, createService, updateService, deleteService } = useServicesStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices, // Expose fetchServices as refetch for compatibility with the old API
    createService,
    updateService,
    deleteService,
  };
};
import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

interface NotificationsState {
  notifications: Notification[];
  addNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const newNotification: Notification = {
      id: Date.now().toString(), // Simple unique ID
      message,
      type,
      read: false,
    };
    set((state) => {
      const updatedNotifications = [...state.notifications, newNotification];
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(notif => !notif.read).length,
      };
    });
  },

  markAsRead: (id: string) => {
    set((state) => {
      const updatedNotifications = state.notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(notif => !notif.read).length,
      };
    });
  },
}));
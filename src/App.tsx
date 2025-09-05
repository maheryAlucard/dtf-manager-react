/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthStore } from './context/authStore';
import { useThemeStore } from './context/themeStore';

// Import pages
import LoginPage from './pages/auth/LoginPage';
import RegisterSetupPage from './pages/auth/RegisterSetupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import OrdersListPage from './pages/orders/OrdersListPage';
import OrderDetailsPage from './pages/orders/OrderDetailsPage';
import InvoiceGeneratorPage from './pages/invoices/InvoiceGeneratorPage';
import ClientsListPage from './pages/clients/ClientsListPage';
import ClientProfilePage from './pages/clients/ClientProfilePage';
import StockDashboardPage from './pages/stock/StockDashboardPage';
import StockMovementsPage from './pages/stock/StockMovementsPage';
import AddUpdateStockPage from './pages/stock/AddUpdateStockPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import ExportCenterPage from './pages/reports/ExportCenterPage';
import ReportsDashboardPage from './pages/reports/ReportsDashboardPage';
import ProfitAnalysisPage from './pages/revenues/ProfitAnalysisPage';
import RevenuePage from './pages/revenues/RevenuePage';
import BackupRestorePage from './pages/settings/BackupRestorePage';
import CompanySettingsPage from './pages/settings/CompanySettingsPage';
import NotificationsPage from './pages/settings/NotificationsPage';
import ProfileSettingsPage from './pages/users/ProfileSettingsPage';
import UserManagementPage from './pages/users/UserManagementPage';
import MainLayout from './components/layout/MainLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Chargement...</div>; // TODO: Replace with a proper loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  return (<>
    <Router>
      <div className={`flex ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        {isAuthenticated ? (
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <DashboardPage />
                }
              />

              <Route
                path="/dashboard/orders"
                element={
                  <OrdersListPage />
                }
              />
              <Route
                path="/dashboard/orders/:id"
                element={
                  <OrderDetailsPage />
                }
              />
              <Route
                path="/dashboard/invoices"
                element={
                  <InvoiceGeneratorPage />
                }
              />
              <Route
                path="/dashboard/clients"
                element={
                  <ClientsListPage />
                }
              />
              <Route
                path="/dashboard/clients/:id"
                element={
                  <ClientProfilePage />
                }
              />
              <Route
                path="/dashboard/stock"
                element={
                  <StockDashboardPage />
                }
              />
              <Route
                path="/dashboard/stock/movements"
                element={
                  <StockMovementsPage />
                }
              />
              <Route
                path="/dashboard/stock/add-update"
                element={
                  <AddUpdateStockPage />
                }
              />
              <Route
                path="/dashboard/expenses"
                element={
                  <ExpensesPage />
                }
              />
              <Route
                path="/dashboard/reports/export"
                element={
                  <ExportCenterPage />
                }
              />
              <Route
                path="/dashboard/reports"
                element={
                  <ReportsDashboardPage />
                }
              />
              <Route
                path="/dashboard/revenues/profit-analysis"
                element={
                  <ProfitAnalysisPage />
                }
              />
              <Route
                path="/dashboard/revenues"
                element={
                  <ProtectedRoute>
                    <RevenuePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings/backup-restore"
                element={
                  <ProtectedRoute>
                    <BackupRestorePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings/company"
                element={
                  <ProtectedRoute>
                    <CompanySettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/users/profile"
                element={
                  <ProtectedRoute>
                    <ProfileSettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/users/manage"
                element={
                  <ProtectedRoute>
                    <UserManagementPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Default redirect for authenticated users */}
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        ) : (
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register-setup" element={<RegisterSetupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Default redirect for unauthenticated users */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  </>
  );
};

export default App;
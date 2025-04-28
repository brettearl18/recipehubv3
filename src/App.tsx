import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './contexts/AuthContext';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Coach = React.lazy(() => import('./pages/Coach'));
const Client = React.lazy(() => import('./pages/Client'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Recipes = React.lazy(() => import('./pages/Recipes'));
const MealPlan = React.lazy(() => import('./pages/MealPlan'));
const ShoppingList = React.lazy(() => import('./pages/ShoppingList'));

// Create a client
const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public landing and access points */}
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/client" element={<Client />} />

              {/* Public routes for auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected user portal */}
              <Route
                path="/user/*"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="recipes" element={<Recipes />} />
                        <Route path="meal-plan" element={<MealPlan />} />
                        <Route path="shopping-list" element={<ShoppingList />} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 
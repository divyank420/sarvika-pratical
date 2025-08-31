import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Header from './components/Header';

export default function App() {
  const user = useAuthStore((state) => state.user);
  const { theme } = useThemeStore();
  return (
    <div className={theme === "dark" ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      <Header />
      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
        </Routes>
      </main>
    </div>
  );
}
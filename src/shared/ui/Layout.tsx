import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/button';
import { useAuth } from '../auth/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4">
            <Link to="/authors" className="text-blue-600 hover:text-blue-800">
              Autores
            </Link>
            {isAuthenticated && (
              <Link to="/favorites" className="text-blue-600 hover:text-blue-800">
                Favoritos
              </Link>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <Button onClick={handleLogout} size="sm">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
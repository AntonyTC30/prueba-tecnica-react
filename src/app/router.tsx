import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/auth/ui/Login';
import Authors from '../features/authors/ui/Authors';
import Works from '../features/works/ui/Works';
import Favorites from '../features/favorites/ui/Favorites';
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import Layout from '../shared/ui/Layout';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/authors" element={<Layout><Authors /></Layout>} />
      <Route path="/works/:author" element={<Layout><Works /></Layout>} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Layout><Favorites /></Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
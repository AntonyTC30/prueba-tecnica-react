import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAuth } from '../../../shared/auth/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, enterGuestMode } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/authors');
    } else {
      setError('Credenciales invalidas');
    }
  };

  const handleGuestMode = () => {
    enterGuestMode();
    navigate('/authors');
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" role="main" aria-labelledby="login-title">
        <header>
          <h2 id="login-title" className="text-2xl font-bold text-center mb-6">Login</h2>
        </header>
        <form onSubmit={handleLogin} aria-describedby={error ? "error-message" : undefined}>
          <fieldset className="mb-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </fieldset>
          <fieldset className="mb-4">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </fieldset>
          {error && <p id="error-message" className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
          <Button type="submit" className="w-full mb-4">
            Login
          </Button>
        </form>
        <nav>
          <Button onClick={handleGuestMode} variant="ghost" className="w-full">
            Ingresar como invitado
          </Button>
        </nav>
        <footer className="text-sm text-gray-600 mt-4 text-center">
          <p>Credenciales por defecto: admin@example.com / admin</p>
        </footer>
      </section>
    </main>
  );
};

export default Login;
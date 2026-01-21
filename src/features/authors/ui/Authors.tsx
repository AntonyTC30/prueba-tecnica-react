import React, { useEffect, useState } from 'react';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { useAuth } from '../../../shared/auth/AuthContext';
import { fetchAuthors } from '../application/authorsService';
import { favoritesStorage } from '../../../shared/storage/storageService';
import AuthorCard from '../../../shared/ui/AuthorCard';

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await fetchAuthors();
        // console.log('Datos de los autores:', data);
        const authorsList = Array.isArray(data) ? data : (data as any).authors || [];
        setAuthors(authorsList);
      } catch (err) {
        // console.error('Error al cargar autores:', err);
        setError('No se han podido cargar los autores.');
      } finally {
        setLoading(false);
      }
    };
    loadAuthors();
  }, []);

  const toggleFavorite = (author: string) => {
    if (favoritesStorage.isAuthorFavorite(author)) {
      favoritesStorage.removeAuthor(author);
    } else {
      favoritesStorage.addAuthor(author);
    }
    setAuthors([...authors]);
  };

  if (loading) return (
    <main className="flex justify-center items-center min-h-[400px]">
      <Spinner size="lg" aria-label="Cargando autores" />
    </main>
  );
  if (error) return (
    <main className="flex justify-center items-center min-h-[400px]">
      <div role="alert" className="text-red-500 text-center">
        <p className="text-lg font-semibold">Error al cargar autores</p>
        <p>{error}</p>
      </div>
    </main>
  );

  const availableAuthors = authors.filter(author =>
    !favoritesStorage.isAuthorFavorite(author) &&
    author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Autores de poesía</h1>
        <p className="text-gray-600">Descubre y explora las obras de famosos poetas.</p>
      </header>
      <section aria-labelledby="authors-heading" className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Input
            type="text"
            placeholder="Buscar autores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
            aria-label="Buscar autores"
          />
        </div>
        {availableAuthors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se han encontrado autores que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Lista de autores disponibles">
            {availableAuthors.map((author) => (
              <div key={author} role="listitem">
                <AuthorCard
                  author={author}
                  isAuthenticated={isAuthenticated}
                  isFavorite={favoritesStorage.isAuthorFavorite(author)}
                  onToggleFavorite={() => toggleFavorite(author)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Authors;
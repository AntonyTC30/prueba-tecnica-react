import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { useAuth } from '../../../shared/auth/AuthContext';
import { fetchWorksByAuthor } from '../application/worksService';
import { favoritesStorage } from '../../../shared/storage/storageService';
import { Poem } from '../../../shared/types/poetry';
import WorkCard from '../../../shared/ui/WorkCard';

const Works: React.FC = () => {
  const { author } = useParams<{ author: string }>();
  const [works, setWorks] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!author) return;
    const loadWorks = async () => {
      try {
        const data = await fetchWorksByAuthor(author);
        setWorks(data);
      } catch (err) {
        setError('No se han podido cargar las obras.');
      } finally {
        setLoading(false);
      }
    };
    loadWorks();
  }, [author]);

  const toggleFavorite = (work: Poem) => {
    const workObj = { title: work.title, author: work.author };
    if (favoritesStorage.isWorkFavorite(workObj)) {
      favoritesStorage.removeWork(workObj);
    } else {
      favoritesStorage.addWork(workObj);
    }
    setWorks([...works]);
  };

  if (loading) return (
    <main className="flex justify-center items-center min-h-[400px]">
      <Spinner size="lg" aria-label="Cargando obras" />
    </main>
  );
  if (error) return (
    <main className="flex justify-center items-center min-h-[400px]">
      <div role="alert" className="text-red-500 text-center">
        <p className="text-lg font-semibold">Error al cargar los trabajos</p>
        <p>{error}</p>
      </div>
    </main>
  );

  const availableWorks = works.filter(work =>
    !favoritesStorage.isWorkFavorite({ title: work.title, author: work.author }) &&
    work.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Obras de {author}</h1>
        <p className="text-gray-600">Explora la colección de poesía</p>
      </header>
      <section aria-labelledby="works-heading" className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Input
            type="text"
            placeholder="Buscar Obras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
            aria-label="Buscar Obras"
          />
        </div>
        {availableWorks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se han encontrado obras que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label={`Obras de ${author}`}>
            {availableWorks.map((work) => (
              <div key={work.title} role="listitem">
                <WorkCard
                  work={work}
                  isAuthenticated={isAuthenticated}
                  isFavorite={favoritesStorage.isWorkFavorite(work)}
                  onToggleFavorite={() => toggleFavorite(work)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Works;
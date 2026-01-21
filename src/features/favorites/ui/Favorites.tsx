import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { favoritesStorage } from '../../../shared/storage/storageService';
import { Work, Poem } from '../../../shared/types/poetry';
import AuthorCard from '../../../shared/ui/AuthorCard';
import WorkCard from '../../../shared/ui/WorkCard';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState(favoritesStorage.get());
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [authorWorks, setAuthorWorks] = useState<Poem[]>([]);
  const [searchAuthors, setSearchAuthors] = useState('');
  const [searchWorks, setSearchWorks] = useState('');

  const counts = favoritesStorage.getFavoritesCount();

  const refreshFavorites = () => {
    setFavorites(favoritesStorage.get());
  };

  const removeAuthor = (author: string) => {
    favoritesStorage.removeAuthor(author);
    refreshFavorites();
    if (selectedAuthor === author) {
      setSelectedAuthor(null);
      setAuthorWorks([]);
    }
  };

  const removeWork = (work: Work) => {
    favoritesStorage.removeWork(work);
    refreshFavorites();
  };

  const toggleWorkFavorite = (work: Poem) => {
    const workObj = { title: work.title, author: work.author };
    if (favoritesStorage.isWorkFavorite(workObj)) {
      favoritesStorage.removeWork(workObj);
    } else {
      favoritesStorage.addWork(workObj);
    }
    refreshFavorites();
  };

  const filteredAuthors = favorites.authors.filter(author =>
    author.toLowerCase().includes(searchAuthors.toLowerCase())
  );

  const filteredWorks = favorites.works.filter(work =>
    work.title.toLowerCase().includes(searchWorks.toLowerCase()) ||
    work.author.toLowerCase().includes(searchWorks.toLowerCase())
  );

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis favoritos</h1>
        <p className="text-gray-600">Total de favoritos: {counts.total} (Autores: {counts.authors}, Obras: {counts.works})</p>
      </header>
      <section className="mb-8" aria-labelledby="favorite-authors-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="favorite-authors-heading" className="text-2xl font-semibold">Autores Favoritos ({filteredAuthors.length})</h2>
        </div>
        <div className="mb-4 flex justify-center">
          <Input
            type="text"
            placeholder="Buscar autores favoritos..."
            value={searchAuthors}
            onChange={(e) => setSearchAuthors(e.target.value)}
            className="max-w-md"
            aria-label="Buscar autores favoritos"
          />
        </div>
        {filteredAuthors.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {favorites.authors.length === 0 ? 'Aún no tienes autores favoritos. Empieza a explorar!' : 'No hay autores que coincidan con tu búsqueda.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de autores favoritos">
            {filteredAuthors.map((author) => (
              <div key={author} role="listitem">
                <AuthorCard
                  author={author}
                  isAuthenticated={true}
                  isFavorite={true}
                  onToggleFavorite={() => removeAuthor(author)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mb-8" aria-labelledby="favorite-works-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="favorite-works-heading" className="text-2xl font-semibold">Obras Favoritas({filteredWorks.length})</h2>
        </div>
        <div className="mb-4 flex justify-center">
          <Input
            type="text"
            placeholder="Buscar obras favoritas..."
            value={searchWorks}
            onChange={(e) => setSearchWorks(e.target.value)}
            className="max-w-md"
            aria-label="Buscar obras favoritas"
          />
        </div>
        {filteredWorks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {favorites.works.length === 0 ? 'Aún no hay obras favoritas. Empieza a leer!' : 'No hay obras que coincidan con tu búsqueda.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de obras favoritas">
            {filteredWorks.map((work) => (
              <div key={`${work.author}-${work.title}`} role="listitem">
                <WorkCard
                  work={{ title: work.title, author: work.author, lines: [], linecount: 0 }} 
                  isAuthenticated={true}
                  isFavorite={true}
                  onToggleFavorite={() => removeWork(work)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      {selectedAuthor && (
        <section className="mt-8" aria-labelledby="author-works-heading">
          <h2 id="author-works-heading" className="text-2xl font-semibold mb-4">Obra de  {selectedAuthor}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorWorks.map((work) => (
              <WorkCard
                key={work.title}
                work={work}
                isAuthenticated={true}
                isFavorite={favoritesStorage.isWorkFavorite({ title: work.title, author: work.author })}
                onToggleFavorite={() => toggleWorkFavorite(work)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Favorites;
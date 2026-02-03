import React from "react";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useAuth } from "../../../shared/auth/AuthContext";
import { useAuthors } from "../application/useAuthors";
import AuthorCard from "../../../shared/ui/AuthorCard";
import { favoritesStorage } from "@/shared/storage/favoritesStorage";

const Authors: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    loading,
    error,
    search,
    setSearch,
    availableAuthors,
    toggleFavorite,
  } = useAuthors();

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" aria-label="Cargando autores" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <div role="alert" className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error al cargar autores</p>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Autores de poesía
        </h1>
        <p className="text-gray-600">
          Descubre y explora las obras de famosos poetas.
        </p>
      </header>

      <section className="max-w-7xl mx-auto">
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
            <p className="text-gray-500 text-lg">
              No se han encontrado autores.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="list"
          >
            {availableAuthors.map((author) => (
              <AuthorCard
                key={author}
                author={author}
                isAuthenticated={isAuthenticated}
                isFavorite={favoritesStorage.isAuthorFavorite(author)}
                onToggleFavorite={() => toggleFavorite(author)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Authors;

import React from "react";
import { useParams } from "react-router-dom";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useAuth } from "../../../shared/auth/AuthContext";
import { favoritesStorage } from "@/shared/storage/favoritesStorage";
import { worksApiRepository } from "../infrastructure/worksApiRepository";
import { useWorks } from "../application/useWorks";
import WorkCard from "../../../shared/ui/WorkCard";

const Works: React.FC = () => {
  const { author } = useParams<{ author: string }>();
  const { isAuthenticated } = useAuth();

  const {
    loading,
    error,
    search,
    setSearch,
    works,
    fullPoems,
    loadPoem,
    toggleFavorite,
    isFavorite,
  } = useWorks(author, worksApiRepository, {
    isFavorite: favoritesStorage.isWorkFavorite,
    toggle: (work) =>
      favoritesStorage.isWorkFavorite(work)
        ? favoritesStorage.removeWork(work)
        : favoritesStorage.addWork(work),
  });

  if (loading)
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </main>
    );

  if (error)
    return (
      <main className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </main>
    );

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Obras de {author}</h1>
      </header>

      <section className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar obras..."
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard
              key={work.title}
              work={fullPoems[work.title] ?? work}
              isAuthenticated={isAuthenticated}
              isFavorite={isFavorite(work)}
              onToggleFavorite={() => toggleFavorite(work)}
              onLoadPoem={() => loadPoem(work.title)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Works;

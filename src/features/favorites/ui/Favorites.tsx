import React from "react";
import { Input } from "@heroui/input";
import { useFavorites } from "../application/useFavorites";
import AuthorCard from "../../../shared/ui/AuthorCard";
import WorkCard from "../../../shared/ui/WorkCard";

const Favorites: React.FC = () => {
  const {
    counts,
    filteredAuthors,
    filteredWorks,
    searchAuthors,
    searchWorks,
    setSearchAuthors,
    setSearchWorks,
    removeAuthor,
    removeWork,
  } = useFavorites();

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Mis favoritos</h1>
        <p className="text-gray-600">
          Total: {counts.total} (Autores: {counts.authors}, Obras:{" "}
          {counts.works})
        </p>
      </header>

      {/* AUTORES */}
      <section className="mb-8">
        <Input
          value={searchAuthors}
          onChange={(e) => setSearchAuthors(e.target.value)}
          placeholder="Buscar autores..."
          className="max-w-md mx-auto mb-4"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => (
            <AuthorCard
              key={author}
              author={author}
              isAuthenticated
              isFavorite
              onToggleFavorite={() => removeAuthor(author)}
            />
          ))}
        </div>
      </section>

      {/* OBRAS */}
      <section>
        <Input
          value={searchWorks}
          onChange={(e) => setSearchWorks(e.target.value)}
          placeholder="Buscar obras..."
          className="max-w-md mx-auto mb-4"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <WorkCard
              key={`${work.author}-${work.title}`}
              work={{ ...work, lines: [], linecount: 0 }}
              isAuthenticated
              isFavorite
              onToggleFavorite={() => removeWork(work)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Favorites;

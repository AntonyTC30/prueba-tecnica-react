import { useEffect, useState } from "react";
import { Work } from "../domain/work";
import { WorksRepository } from "../domain/worksRepository";

interface FavoritesPort {
  isFavorite(work: { title: string; author: string }): boolean;
  toggle(work: { title: string; author: string }): void;
}

export const useWorks = (
  author: string | undefined,
  repository: WorksRepository,
  favorites: FavoritesPort
) => {
  const [works, setWorks] = useState<Work[]>([]);
  const [fullPoems, setFullPoems] = useState<Record<string, Work>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!author) return;

    repository
      .getByAuthor(author)
      .then(setWorks)
      .catch(() => setError("No se han podido cargar las obras."))
      .finally(() => setLoading(false));
  }, [author, repository]);

  const loadPoem = async (title: string) => {
    if (fullPoems[title]) return;

    const poems = await repository.getByTitle(title);
    if (poems.length > 0) {
      setFullPoems((prev) => ({ ...prev, [title]: poems[0] }));
    }
  };

  const toggleFavorite = (work: Work) => {
    favorites.toggle({ title: work.title, author: work.author });
    setWorks([...works]);
  };

  const filteredWorks = works.filter((work) =>
    work.title.toLowerCase().includes(search.toLowerCase())
  );

  return {
    loading,
    error,
    search,
    setSearch,
    works: filteredWorks,
    fullPoems,
    isFavorite: favorites.isFavorite,
    toggleFavorite,
    loadPoem,
  };
};

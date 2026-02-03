import { useEffect, useState } from "react";
import { authorsApiRepository } from "../infrastructure/authorsApiRepository";
import { favoritesStorage } from "../../../shared/storage/favoritesStorage";

export const useAuthors = () => {
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await authorsApiRepository();
        setAuthors(data);
      } catch (e) {
        console.error(e);
        setError("No se han podido cargar los autores.");
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
    // fuerza rerender
    setAuthors([...authors]);
  };

  const availableAuthors = authors.filter(
    (author) =>
      !favoritesStorage.isAuthorFavorite(author) &&
      author.toLowerCase().includes(search.toLowerCase())
  );

  return {
    loading,
    error,
    search,
    setSearch,
    availableAuthors,
    toggleFavorite,
  };
};

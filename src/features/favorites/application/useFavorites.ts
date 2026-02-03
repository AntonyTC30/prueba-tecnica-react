import { useState } from "react";
import { favoritesRepository } from "../infrastructure/favoritesStorageRepository";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(favoritesRepository.get());
  const [searchAuthors, setSearchAuthors] = useState("");
  const [searchWorks, setSearchWorks] = useState("");

  const refresh = () => {
    setFavorites(favoritesRepository.get());
  };

  const removeAuthor = (author: string) => {
    favoritesRepository.removeAuthor(author);
    refresh();
  };

  const removeWork = (work: { title: string; author: string }) => {
    favoritesRepository.removeWork(work);
    refresh();
  };

  const filteredAuthors = favorites.authors.filter((author) =>
    author.toLowerCase().includes(searchAuthors.toLowerCase())
  );

  const filteredWorks = favorites.works.filter(
    (work) =>
      work.title.toLowerCase().includes(searchWorks.toLowerCase()) ||
      work.author.toLowerCase().includes(searchWorks.toLowerCase())
  );

  return {
    favorites,
    counts: favoritesRepository.getCounts(),
    filteredAuthors,
    filteredWorks,
    searchAuthors,
    searchWorks,
    setSearchAuthors,
    setSearchWorks,
    removeAuthor,
    removeWork,
  };
};

import { favoritesStorage } from "@/shared/storage/favoritesStorage";
import { Favorites } from "../domain/favorites";

export const favoritesRepository = {
  get(): Favorites {
    return favoritesStorage.get();
  },

  removeAuthor(author: string) {
    favoritesStorage.removeAuthor(author);
  },

  removeWork(work: { title: string; author: string }) {
    favoritesStorage.removeWork(work);
  },

  toggleWork(work: { title: string; author: string }) {
    if (favoritesStorage.isWorkFavorite(work)) {
      favoritesStorage.removeWork(work);
    } else {
      favoritesStorage.addWork(work);
    }
  },

  getCounts() {
    return favoritesStorage.getFavoritesCount();
  },
};

import { Work } from '../types/poetry';

interface Favorites {
  authors: string[];
  works: Work[];
}

const FAVORITES_KEY = 'poetry_favorites';

const getFavorites = (): Favorites => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { authors: [], works: [] };
};

const saveFavorites = (favorites: Favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const favoritesStorage = {
  get: getFavorites,
  save: saveFavorites,
  addAuthor: (author: string) => {
    const fav = getFavorites();
    if (!fav.authors.includes(author)) {
      fav.authors.push(author);
      saveFavorites(fav);
    }
  },
  removeAuthor: (author: string) => {
    const fav = getFavorites();
    fav.authors = fav.authors.filter(a => a !== author);
    saveFavorites(fav);
  },
  addWork: (work: Work) => {
    const fav = getFavorites();
    if (!fav.works.some(w => w.title === work.title && w.author === work.author)) {
      fav.works.push(work);
      saveFavorites(fav);
    }
  },
  removeWork: (work: Work) => {
    const fav = getFavorites();
    fav.works = fav.works.filter(w => !(w.title === work.title && w.author === work.author));
    saveFavorites(fav);
  },
  isAuthorFavorite: (author: string) => {
    const fav = getFavorites();
    return fav.authors.includes(author);
  },
  isWorkFavorite: (work: Work) => {
    const fav = getFavorites();
    return fav.works.some(w => w.title === work.title && w.author === work.author);
  },
  getTotalFavorites: () => {
    const fav = getFavorites();
    return fav.authors.length + fav.works.length;
  },
  getFavoritesCount: () => {
    const fav = getFavorites();
    return {
      total: fav.authors.length + fav.works.length,
      authors: fav.authors.length,
      works: fav.works.length,
    };
  },
};
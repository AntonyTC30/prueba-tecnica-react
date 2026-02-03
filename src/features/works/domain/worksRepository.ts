import { Work } from "./work";

export interface WorksRepository {
  getByAuthor(author: string): Promise<Work[]>;
  getByTitle(title: string): Promise<Work[]>;
}

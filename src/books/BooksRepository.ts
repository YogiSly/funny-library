import { injectable } from "inversify";
import type { Book } from "../types/book";

@injectable()
export class BooksRepository {

  getBooks() {}
  getBook(id: string) {}
  deleteBook(id: string) {}
  updateBook(id: string, params: Book) {}
  createBook(params: Book) {}
}

import { Container, decorate, injectable } from "inversify";
import { BooksRepository } from "module";
import { Book } from './models/books'

class Book {
  toSelf(){
    
  }
}

class BooksRepository {
  repository: Book;
  constructor(repository: Book) {
    this.repository = repository;
  }
}

const classMap = {
  User: new User(),
  
};

// const user = classMap.User;

export const container = new Container();

decorate(injectable(),BooksRepository)
container.bind(BooksRepository).toSelf()

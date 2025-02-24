const { Book, User } = require('../db/models');

class BookService {
  static async getAll() {
    return await Book.findAll({ include: { model: User } });
  }

  static async getById(id) {
    return await Book.findByPk(id);
  }

  static async create(BookData) {
    return await Book.create(BookData);
  }

  static async update(id, updatedData) {
    const Book = await Book.findByPk(id);
    if (!Book) return null;
    const updatedBook = await Book.update(updatedData, {
      where: { id },
      returning: true
    });
    console.log(updatedBook)
    return updatedBook
  }

  static async delete(id) {
    const Book = await Book.findByPk(id);
    if (!Book) return null;
    await Book.destroy();
    return Book;
  }
}

module.exports = BookService;

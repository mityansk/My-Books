const BookService = require('../services/Book.service');
const isValidId = require('../utils/isValidId');
const BookValidator = require('../utils/Book.validator');
const formatResponse = require('../utils/formatResponse');
const reformatId = require('../utils/reformatId');

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await BookService.getAll();

      //! Проверка на длину списка задач (обработка негативного кейса)
      if (books.length === 0) {
        return res.status(204).json(formatResponse(204, 'No Books found', []));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', books));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getBookById(req, res) {
    const { id } = req.params;

    //! Проверка на валидность ID (обработка негативного кейса) (можно делать и не внутри try/catch)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Book ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const data = await BookService.getById(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!data) {
        return res
          .status(404)
          .json(formatResponse(404, `Book with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', data));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createBook(req, res) {
    const { title, body, ownerId } = req.body;

    //! Проверка наличия необходимых данных - Используем BookValidator (обработка негативного кейса)
    const { isValid, error } = BookValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      //? За запросы в БД отвечает сервис
      const newBook = await BookService.create({ title, body, authorId });

      //! Проверка на существование новой задачи (обработка негативного кейса)
      if (!newBook) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new Book`));
      }

      //* Успешный кейс
      res.status(201).json(formatResponse(201, 'success', newBook));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updateBook(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;
    const user = res.locals.user;

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Book ID'));
    }

    const Book = await BookService.getById(reformatId(id));
    if (+user.id !== Book.authorId) {
      return res
        .status(400)
        .json(formatResponse(400, 'Недостаточно прав, похоже, ты IDOR!'));
    }

    //! Проверка наличия необходимых данных - Используем BookValidator (обработка негативного кейса)
    const { isValid, error } = BookValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }
    
    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number без утилиты)
      const updatedBook = await BookService.update(+id, { title, body });

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!updatedBook) {
        return res
          .status(404)
          .json(formatResponse(404, `Book with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', updatedBook));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    const user = res.locals.user;

    const Book = await BookService.getById(reformatId(id));
    if (+user.id !== Book.authorId) {
      return res
        .status(400)
        .json(formatResponse(400, 'Недостаточно прав, похоже, ты IDOR!'));
    }
    //? получить задачу по id (Book)
    //? проверить, что Book.author_id === user.id
    //* удалить и ответить - 200
    //! отказать, если не совпали id - 400

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Book ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const deletedBook = await BookService.delete(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!deletedBook) {
        return res
          .status(404)
          .json(formatResponse(404, `Book with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Book with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = BookController;

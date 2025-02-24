class PostValidator {
  /**
   * Метод для валидации данных задачи.
   * @param {object} data - Объект данных задачи, который необходимо проверить.
   * @param {string} data.title - Заголовок задачи (обязательное поле).
   * @param {string} data.body - Основное содержание задачи (обязательное поле).
   * @returns {object} - Объект, содержащий результат валидации.
   * @returns {boolean} isValid - Флаг, указывающий на валидность данных.
   * @returns {string|null} error - Сообщение об ошибке валидации, если имеется, иначе null.
   */
  
  static validate(data) {
    const { title, body } = data; // Деструктуризация объекта данных для получения полей title и body.

    //! Проверка валидности поля title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      // Если title отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Title is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }

    //! Проверка валидности поля body
    if (!body || typeof body !== 'string' || body.trim() === '') {
      // Если body отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Body is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }

    //* Если все проверки пройдены, возвращаем валидный результат.
    return {
      isValid: true, // Данные валидные
      error: null, // Нет ошибок
    };
  }
}

module.exports = PostValidator;

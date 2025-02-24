'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'ownerId' });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      year: DataTypes.INTEGER,
      description: DataTypes.STRING,
      comment: DataTypes.TEXT,
      picture: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};

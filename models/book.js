'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment, User, UserBook}) {
      Book.hasMany(Comment, {
        foreignKey: "bookId",
        as: "comments"
      })
      Book.belongsToMany(User, {
        foreignKey: "bookId",
        as: "users",
        through: UserBook
      })

    }
  }
  Book.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authors: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bookId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false
  });
  return Book;
};
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
    static associate({Comment, User, Favorite}) {
      Book.hasMany(Comment, {
        foreignKey: "bookId",
        as: "comments"
      })
      Book.belongsToMany(User, {
        foreignKey: "bookId",
        as: "users",
        through: Favorite
      })

    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
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
    tableName: 'book',
    timestamps: false
  });
  return Book;
};
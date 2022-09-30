'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book, User}) {
      Comment.belongsTo(Book, {
        foreignKey: "bookId",
        as: "book"
      })
      Comment.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
      })
    }
  }
  Comment.init({
    commentId:{ 
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userId: {
      type:DataTypes.SMALLINT,
      allowNull:false
    },
    bookId: {
      type:DataTypes.SMALLINT,
      allowNull:false
    },
    content: {
      type:DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  });
  return Comment;
};
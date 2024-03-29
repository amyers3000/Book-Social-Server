'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, Book, UserBook, UserFollower }) {
      User.hasMany(Comment, {
        foreignKey: "userId",
        as: "comments"
      })
      User.belongsToMany(Book, {
        foreignKey: "userId",
        as: "books",
        through: UserBook
      })
      User.belongsToMany(User, {
        through: UserFollower,
        as: 'Followers',
        foreignKey: 'userId'
      });
      User.belongsToMany(User, {
        through: UserFollower,
        as: 'Following',
        foreignKey: 'followingId'
      });

    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args:true,
        message: "Username already in use"
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
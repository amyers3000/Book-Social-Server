'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      
    }
  }
  UserFollower.init({
    followerId: {
      type: DataTypes.SMALLINT,
      allowNull: true
      
    },
    followingId:  {
      type: DataTypes.SMALLINT,
      allowNull: true
      
    }
  }, {
    sequelize,
    modelName: 'UserFollower',
    tableName:'user_followers'
  });
  return UserFollower;
};
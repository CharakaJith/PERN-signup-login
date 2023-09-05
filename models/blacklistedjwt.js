'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blacklistedJwt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blacklistedJwt.init(
    {
      userId: DataTypes.INTEGER,
      jwt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'blacklistedJwt',
    }
  );
  return blacklistedJwt;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pwd: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Member',
      freezeTableName: true
    }
  );

  return Member;
};
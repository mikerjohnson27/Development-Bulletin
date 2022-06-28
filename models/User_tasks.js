const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User_task extends Model {}

User_task.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'task',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_task',
  }
);

module.exports = User_task;
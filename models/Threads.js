const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Threads extends Model {}

Threads.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('Houses', 'Warehouses', 'Historic', 'Haunted', 'Factories', 'Hospitals', 'Misc'), // Define the preselected options here
      allowNull: false,
      defaultValue: 'Misc',
    },
    description: {
      type: DataTypes.STRING(500),
    },
   // image:{
     // type: DataTypes.STRING,
   // },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'threads',
  }
);

module.exports = Threads;

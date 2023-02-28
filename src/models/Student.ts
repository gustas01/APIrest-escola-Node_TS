import { DataTypes, Model, Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);

export default class Student extends Model {
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare age: number;
  declare weight: number;
  declare height: number;
}

Student.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  age: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
  height: DataTypes.FLOAT,

}, { sequelize: connection, modelName: 'student' });

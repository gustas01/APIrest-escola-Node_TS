import { DataTypes, Model, Sequelize } from 'sequelize';
import User from './User';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);

export default class Photo extends Model {
  declare originalname: string;
  declare filename: string;
  declare student_id: string;
}

Photo.init({
  originalname: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      notEmpty: {
        msg: 'Campo obrigatório',
      },
    },
  },
  filename: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      notEmpty: {
        msg: 'Campo obrigatório',
      },
    },
  },
  url: {
    type: DataTypes.VIRTUAL,
    get(){
      return `http://localhost:3001/images/${this.getDataValue('filename')}`;
    }
  }
}, { sequelize: connection, modelName: 'photo' });

Photo.belongsTo(User, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

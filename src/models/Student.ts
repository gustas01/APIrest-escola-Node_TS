import { DataTypes, Model, Sequelize } from 'sequelize';
import Photo from './Photo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);

export default class Student extends Model {
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare age: number;
  declare weight: number;
  declare height: number;
}

Student.init({
  first_name: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      len: {
        args: [3, 255],
        msg: 'Nome precisa ter entre 3 e 255 caracteres',
      },
    },
  },
  last_name: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      len: {
        args: [3, 255],
        msg: 'Sobrenome precisa ter entre 3 e 255 caracteres',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
    unique: {
      msg: 'E-mail já existe',
      name: '',
    },
    validate: {
      isEmail: {
        msg: 'E-mail inválido',
      },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: '',
    validate: {
      isInt: {
        msg: 'Idade precisa ser um número inteiro',
      },
    },
  },
  weight: {
    type: DataTypes.FLOAT,
    defaultValue: '',
    validate: {
      isFloat: {
        msg: 'Peso precisa ser um número',
      },
    },
  },
  height: {
    type: DataTypes.FLOAT,
    defaultValue: '',
    validate: {
      isFloat: {
        msg: 'Altura precisa ser um número',
      },
    },
  },

}, { sequelize: connection, modelName: 'student' });


Student.hasMany(Photo, {foreignKey: 'student_id'});

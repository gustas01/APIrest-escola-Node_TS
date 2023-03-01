import bcrypt from 'bcryptjs';
import { DataTypes, Model, Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);

export default class User extends Model {
  declare name: string;
  declare email: string;
  declare password_hash: string;
}

User.init({
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      len: {
        msg: 'O campo NOME deve ter entre 3 e 255 caracteres',
        args: [3, 255]
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
    unique: {
      msg: 'Email já cadastrado',
      name: ''
    },
    validate: {
      isEmail: {
        msg: 'Email inválido',
      }
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  password: {
    type: DataTypes.VIRTUAL,
    defaultValue: '',
    validate: {
      len: {
        msg: 'A senha precisa ter entre 6 e 50 caracteres',
        args: [6, 50]
      }
    }
  },

}, { sequelize: connection, modelName: 'user' });


User.addHook('beforeSave', async (user) => {
  if(user.dataValues.password){
    user.dataValues.password_hash = await bcrypt.hash(user.dataValues.password, 8);
  }
});

import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req: Request, res: Response) {
    const  { email = '', password = '' } = req.body;

    if(!email || !password){
      return res.status(401).json({
        errors: ['Credenciais inválidas']
      });
    }

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({
        errors: ['Usuário não encontrado']
      });
    }
    console.log(user.dataValues);


    if(!(await bcryptjs.compare(password, user.dataValues.password_hash))){
      return res.status(401).json({
        errors: ['Senha inválida']
      });
    }

    const { id } = user.dataValues;
    const token = jwt.sign( { email, id }, process.env.TOKEN_SECRET || '2h', {
      expiresIn: process.env.TOKEN_EXPIRATION
    });
    res.json({token, user: { id, first_name: user.dataValues.first_name, email }});
  }
}


export default new TokenController();

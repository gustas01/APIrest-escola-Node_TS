import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async(req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization)
    return res.status(401).json({
      errors: ['Login required']
    });

  const [, token] = authorization.split(' ');

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET || '') as {email: string, id: number};
    console.log(dados);

    const user = await User.findOne({where: {email: dados.email}});

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido']
      });
    }

    req.body.payloadToken = dados;
    return next();
  }catch(e){
    console.log(e);

    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    });
  }
};

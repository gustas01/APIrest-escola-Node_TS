/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { IErrorDB } from '../interfaces/IErrorDB';
import { IUser } from '../interfaces/IUser';
import User from '../models/User';

class UserController {
  async index(req: Request, res: Response){
    try{
      const users = await User.findAll({attributes: ['id', 'name', 'email']});

      return res.json(users);
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }


  async create(req: Request, res: Response){
    try{
      const { password } = req.body;

      if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))))
        return res.status(400).json({errors: ['A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula']});


      const newUser = await User.create(req.body) as unknown as IUser;

      const {id, name, email} = newUser;
      res.json({id, name, email});
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }


  async read(req: Request, res: Response){
    try{
      const user = await User.findByPk(req.body.payloadToken.id) as unknown as IUser;

      if(!user) return res.status(400).json({errors: ['Usuário não encontrado']});

      const {id, name, email} = user;

      res.json({id, name, email});
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }


  async update(req: Request, res: Response){
    try{

      const { password } = req.body;

      if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))))
        return res.status(400).json({errors: ['A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula']});

      const user = await User.findByPk(req.body.payloadToken.id);

      if(!user) return res.status(400).json({errors: ['Usuário não encontrado']});

      const updatedUser = await user.update(req.body) as unknown as IUser;

      const { id, name, email } = updatedUser;

      return res.json({ id, name, email });

    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }


  async delete(req: Request, res: Response){
    try{
      const user = await User.findByPk(req.body.payloadToken.id);

      if(!user) return res.status(400).json({errors: ['Usuário não encontrado']});

      await user.destroy();
      console.log(user);

      const { id, name, email } = user.dataValues;

      return res.json({ id, name, email });
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }
}


export default new UserController();
